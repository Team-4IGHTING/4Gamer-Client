import axios from 'axios';
import { MouseEvent, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v7 as uuid } from 'uuid';

import { AppShell, ScrollArea, NavLink, TextInput, Text, Button, Fieldset, Stack, TagsInput, Title } from '@mantine/core';
import { useValidatedState } from '@mantine/hooks';
import { Editor } from '@tiptap/react';
import { Link } from '@mantine/tiptap';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';

import { createPost } from '@api/posts';
import { getPresignedUrl } from '@api/fileUpload';

import { TextEditor } from '@components/TextEditor/TextEditor';
import { PageFrame } from '@components/Common/PageFrame/PageFrame';

async function uploadToS3(url: string, file: File, contentType: string) {
  return axios.put(
    url,
    file,
    {
      headers: {
        'Content-Type': contentType,
      },
    }
  )
    .then(response => response.data)
    .catch(error => Promise.reject(error));
}

function findAllImageTags(json: any) {
  const imageTags = Array<object>();
  function searchRecursively(innerJson: any) {
    if (Object.prototype.hasOwnProperty.call(innerJson, 'content')) {
      innerJson.content.forEach((each: any) => searchRecursively(each));
    } else if (innerJson.type === 'image') {
      imageTags.push(innerJson);
    }
  }

  searchRecursively(json);
  return imageTags;
}

type RouterParams = {
  channelId: string;
  boardId: string;
};

export function NewPostPage() {
  const { channelId, boardId } = useParams() as RouterParams;
  const navigate = useNavigate();
  const [tags, setTags] = useState<string[]>([]);
  const [{
    value: postTitle,
    // lastValidValue: _,
    valid: isPostTitleValid,
  }, setPostTitle] = useValidatedState<string>(
    '',
    (title) => (title.length >= 1 && title.length <= 128),
    false
  );

  const editorExtensions = [
    StarterKit,
    Underline,
    Link,
    Superscript,
    SubScript,
    Highlight,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    Image.configure({ inline: true, allowBase64: false, HTMLAttributes: { class: 'uploaded-image' } }),
  ];
  const editorRef = useRef<Editor>(null);

  async function uploadImagesFrom(images: Array<any>, attachmentPrefix: string) {
    const bucketName = import.meta.env.VITE_AMAZON_S3_BUCKET_NAME;
    const bucketRegion = import.meta.env.VITE_AMAZON_S3_BUCKET_REGION;
    const oldBlobUrls = Array<string>();
    for (const [index, image] of images.entries()) {
      if (image.attrs.src.startsWith('blob')) {
        const imageFetchResponse = await fetch(image.attrs.src);
        const blobFile = await imageFetchResponse.blob();
        const contentType = blobFile.type;
        const extension = contentType.split('/')[1];
        const filename = `${attachmentPrefix}/${index}.${extension}`;

        const file = new File([blobFile], filename, { type: blobFile.type });
        const url = await getPresignedUrl(file.name);
        await uploadToS3(url, file, contentType);
        oldBlobUrls.push(url);
        image.attrs.src = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${filename}`;
        console.log(image.attrs.src);
      }
    }
    oldBlobUrls.forEach((url) => URL.revokeObjectURL(url));
  }

  const uploadPost = async (event: MouseEvent) => {
    if (editorRef) {
      if (!isPostTitleValid) {
        alert('제목은 1자 이상 128자 이하로 정해 주세요.');
        return;
      }
      event.preventDefault();

      const json = editorRef.current!.getJSON();
      const images = findAllImageTags(json);
      const attachmentUuid = uuid();
      await uploadImagesFrom(images, attachmentUuid);

      const response = await createPost(BigInt(channelId), BigInt(boardId), {
        title: postTitle,
        body: JSON.stringify(json),
        tags,
        attachment: attachmentUuid,
      });
      console.log(response);
      navigate(`../${response.id}`, { relative: 'path' });
    }
  };

  const postEditBody = (
    <>
      <Stack>
        <Title order={1}>게시글 작성</Title>
        <Title order={2}>게시판</Title>
        <Fieldset legend="게시글 정보">
          <Stack>
            <TextInput
              label="제목"
              placeholder="게시글 제목을 입력하세요"
              value={postTitle}
              onChange={(event) => setPostTitle(event.currentTarget.value)}
              error={!isPostTitleValid ? '제목은 1자 이상 128자 이하로 작성해주세요' : ''}
            />
            <Text>본문</Text>
            <TextEditor ref={editorRef} extensions={editorExtensions} content="" />
            <TagsInput
              label="게시글 태그"
              value={tags}
              onChange={setTags}
            />
            <Button
              variant="filled"
              fullWidth
              onClick={(e) => uploadPost(e)}
            >
              등록
            </Button>
          </Stack>
        </Fieldset>
      </Stack>
    </>
  );

  const postEditNavbar = (
    <>
      <AppShell.Section>Navbar header</AppShell.Section>
      <AppShell.Section grow my="md" component={ScrollArea}>
      60 links in a scrollable section
      {Array(60)
        .fill(0)
        .map((_, index) => (
          // <Skeleton key={index} h={28} mt="sm" animate={false} />
          <NavLink key={index} href="#required-for-focus" label={index} />
        ))
      }
      </AppShell.Section>
      <AppShell.Section>Navbar footer – always at the bottom</AppShell.Section>
    </>
  );

  return (
    <>
      <PageFrame
        bodyContent={postEditBody}
        navbarContent={postEditNavbar}
        asideContent={undefined}
        headerContent={undefined}
        footerContent={undefined}
      />
    </>
  );
}
