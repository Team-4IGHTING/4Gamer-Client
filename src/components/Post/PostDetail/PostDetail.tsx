import { useState } from 'react';

import { ActionIcon, Badge, Group, Paper, Space, Stack, TextInput, Text, Title, TypographyStylesProvider } from '@mantine/core';
import { IconArrowLeft, IconSend, IconThumbUp, IconThumbDown } from '@tabler/icons-react';

import { metricNumber } from '@/util/numberUtil';
import { PostResponse, CommentResponse } from '@/responseTypes';
import { Comment } from './Comment';

export function PostDetail({ post, comments }:
  { post: PostResponse, comments: Array<CommentResponse> | null }
) {
  const [newCommentContent, setNewCommentContent] = useState('');

  return (
    <Stack gap="xl">
      <Group>
        <ActionIcon variant="transparent" color="gray">
          <IconArrowLeft stroke={1.5} />
        </ActionIcon>
        <Text>게시판으로 돌아가기</Text>
      </Group>
      <Stack>
        <Paper withBorder p="xl">
          <Group justify="space-between">
            <Title order={1} lineClamp={1}>{post.title}</Title>
          </Group>
          <Text c="dimmed">{`By ${post.author} @ ${post.createdAt} (마지막 수정: ${post.updatedAt})`}</Text>
          <Space h="xl" />
          <Group justify="space-between">
            {/* <Group>
            {
              post.tags.map((value, index) =>
                <Badge key={index} color="blue">
                  #{value}
                </Badge>
              )
            }
            </Group> */}
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
            <div dangerouslySetInnerHTML={{ __html: post.body }} />
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
