import { useRef } from 'react';
import { AppShell, ScrollArea, NavLink, TextInput, Text, Button, Fieldset, Stack, TagsInput, Title } from '@mantine/core';
import { Editor } from '@tiptap/react';
import cheerio from 'cheerio';

import { TextEditor } from '@components/TextEditor/TextEditor';
import { PageFrame } from '@components//Common/PageFrame/PageFrame';

// import parse from 'html-react-parser';

export function PostEditPage() {
  const editorContentRef = useRef<Editor & HTMLDivElement>(null);

  const getContent = () => {
    if (editorContentRef) {
      console.log(`Content:\n ${editorContentRef.current!.getHTML()}`);
      const $ = cheerio.load(editorContentRef.current!.getHTML());
      // for (let each of $('.uploaded-image')) {
      Array.from($('.uploaded-image')).forEach((each, index) => {
        console.log(`Image #${index}: ${each.attribs.src}`);
        // URL.revokeObjectURL(each.attribs.src);
      });
    }
  };

  const postEditBody = (
    <>
      <Stack>
        <Title order={1}>게시글 작성</Title>
        <Title order={2}>게시판</Title>
        <Fieldset legend="게시글 정보">
          <Stack>
            <TextInput label="제목" placeholder="게시글 제목을 입력하세요" />
            <Text>본문</Text>
            <TextEditor ref={editorContentRef} />
            <TagsInput label="게시글 태그" />
            <Button
              variant="filled"
              fullWidth
              onClick={getContent}
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
