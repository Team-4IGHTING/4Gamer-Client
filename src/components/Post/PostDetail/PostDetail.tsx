import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { ActionIcon, Badge, Group, Paper, Space, Stack, TextInput, Text, Title, TypographyStylesProvider, UnstyledButton } from '@mantine/core';
import { IconArrowLeft, IconSend, IconThumbUp, IconThumbDown } from '@tabler/icons-react';

import { generateHTML } from '@tiptap/core';
import { Link } from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';

import Image from '@tiptap/extension-image';

import { metricNumber } from '@/util/numberUtil';
import { PostResponse, PostTagResponse, CommentResponse } from '@/responseTypes';
import { Comment } from './Comment';

export function PostDetail({ post, comments, tags }:
  { post: PostResponse,
    comments: Array<CommentResponse> | null,
    tags: Array<PostTagResponse> | null
  }
) {
  const [newCommentContent, setNewCommentContent] = useState('');
  const [bodyContent, setBodyContent] = useState<string>('');

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

  useEffect(() => {
    setBodyContent(
      generateHTML(
        JSON.parse(post.body),
        editorExtensions
      )
    );
  }, [post]);

  return (
    <Stack gap="xl">
      <UnstyledButton component={RouterLink} to="../" relative="path">
        <Group>
          <ActionIcon variant="transparent" color="gray">
            <IconArrowLeft stroke={1.5} />
          </ActionIcon>
          <Text>게시판으로 돌아가기</Text>
        </Group>
      </UnstyledButton>
      <Stack>
        <Paper withBorder p="xl">
          <Group justify="space-between">
            <Title order={1} lineClamp={1}>{post.title}</Title>
          </Group>
          <Text c="dimmed">{`By ${post.author} @ ${post.createdAt} (마지막 수정: ${post.updatedAt})`}</Text>
          <Space h="xl" />
          <Group justify="space-between">
            <Group>
            {
              tags?.map((value, index) =>
                <Badge key={index} color="blue">
                  #{value.name}
                </Badge>
              )
            }
            </Group>
            <Group>
              <ActionIcon variant="transparent" color="gray">
                <IconThumbUp stroke={1.5} />
              </ActionIcon>
              <Text>{metricNumber(post.upvotes)}</Text>
              <ActionIcon variant="transparent" color="gray">
                <IconThumbDown stroke={1.5} />
              </ActionIcon>
              <Text>{metricNumber(post.downvotes)}</Text>
            </Group>
          </Group>
        </Paper>
        {/* <Divider my="xl" /> */}
        <Paper withBorder p="xl">
          <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
          </TypographyStylesProvider>
        </Paper>
      </Stack>
      <Paper withBorder p="xl">
        <Stack gap="md">
          <Title order={2}>댓글 ({comments ? comments.length : 0}개)</Title>
          {
            comments?.map((eachComment: CommentResponse, index: number) =>
              <Comment key={index} comment={eachComment} />
            )
          }
        </Stack>
        <Space h="xl" />
        <TextInput
          placeholder="댓글 입력..."
          value={newCommentContent}
          onChange={(event) => setNewCommentContent(event.currentTarget.value)}
          rightSection={
            <>
              <ActionIcon>
                <IconSend />
              </ActionIcon>
            </>
          }
        >
        </TextInput>
      </Paper>
    </Stack>
  );
}
