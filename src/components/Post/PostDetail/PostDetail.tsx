import { useState } from 'react';

import { ActionIcon, Badge, Group, Paper, Space, Stack, TextInput, Text, Title, TypographyStylesProvider } from '@mantine/core';
import { IconArrowLeft, IconSend, IconThumbUp, IconThumbDown } from '@tabler/icons-react';

import { Comment } from './Comment';

export function PostDetail({ post, comments }) {
  const [newComment, setNewComment] = useState('');

  function simplifiedNumber(n) {
    const degrees = ['', 'K', 'M', 'B', 'T'];
    let degreeCount = 0;

    let nSimplified = n;
    for (; nSimplified >= 1000; nSimplified /= 1000) degreeCount += 1;

    return `${nSimplified}${degrees[degreeCount]}`;
  }

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
          <Text c="dimmed">By {post.author} @ {post.createdAt} (마지막 수정: {post.updatedAt})</Text>
          <Space h="xl" />
          <Group justify="space-between">
            <Group>
            {
              post.tags.map((value, index) =>
                <Badge key={index} color="blue">
                  #{value}
                </Badge>
              )
            }
            </Group>
            <Group>
              <ActionIcon variant="transparent" color="gray">
                <IconThumbUp stroke={1.5} />
              </ActionIcon>
              <Text>{simplifiedNumber(post.upvotes)}</Text>
              <ActionIcon variant="transparent" color="gray">
                <IconThumbDown stroke={1.5} />
              </ActionIcon>
              <Text>{simplifiedNumber(post.downvotes)}</Text>
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
          <Title order={2}>댓글 ({comments.length}개)</Title>
          {
            comments.map((eachComment, index) =>
              <Comment key={index} comment={eachComment} />
            )
          }
        </Stack>
        <Space h="xl" />
        <TextInput
          placeholder="댓글 입력..."
          value={newComment}
          onChange={(event) => setNewComment(event.currentTarget.value)}
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
