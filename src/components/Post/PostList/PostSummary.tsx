import { Link } from 'react-router-dom';
import { ActionIcon, Avatar, Badge, Group, Paper, Stack, Text, Title, UnstyledButton } from '@mantine/core';
import { IconThumbUp, IconThumbDown, IconEye, IconMessage } from '@tabler/icons-react';

const mockData = {
  id: 1,
  title: 'Awesome Title because the line is so long that the whole content will not be shown IDK why it all being shown',
  view: 10000000,
  upvotes: 10000000,
  downvotes: 10000000,
  author: 'Strafeinheit',
  createdAt: '2022-05-05T05:00:00Z',
  comments: 10000000,
  tags: ['#Tag1', '#Tag2', '#Tag3'],
};

export function PostSummary({ post }) {
  function simplifiedNumber(n) {
    const degrees = ['', 'K', 'M', 'B', 'T'];
    let degreeCount = 0;

    let nSimplified = n;
    for (; nSimplified >= 1000; nSimplified /= 1000) degreeCount += 1;

    return `${nSimplified}${degrees[degreeCount]}`;
  }
  function prettyTime(timestamp) {
    const time = new Date(timestamp);
    console.log(time);
    return time.toString();
  }

  return (
      <Paper shadow="xs" withBorder p="xl">
        <Stack>
          <Group justify="space-between">
            <Group>
              <Avatar radius="xl" />
              <Text>{post.author}</Text>
              <Text>{prettyTime(post.createdAt)}</Text>
            </Group>
            <Group>
              {
                post.tags.map((tag, index) =>
                  <Badge key={index} color="blue">
                    {tag}
                  </Badge>
                )
              }
            </Group>
          </Group>

          <Group justify="space-between">
            <UnstyledButton component={Link} to={`/post/${post.id}`} w="70%">
              <Title order={3} lineClamp={1}>{post.title}</Title>
            </UnstyledButton>
            <Group justify="space-between" w="360">
              <Group>
                <IconEye stroke={1.5} />
                <Text>{simplifiedNumber(post.view)}</Text>
              </Group>
              <Group>
                <ActionIcon variant="transparent" color="gray">
                  <IconMessage stroke={1.5} />
                </ActionIcon>
                <Text>{simplifiedNumber(post.comments)}</Text>
              </Group>
              <Group>
                <ActionIcon variant="transparent" color="gray">
                  <IconThumbUp stroke={1.5} />
                </ActionIcon>
                <Text>{simplifiedNumber(post.upvotes)}</Text>
              </Group>
              <Group>
                <ActionIcon variant="transparent" color="gray">
                  <IconThumbDown stroke={1.5} />
                </ActionIcon>
                <Text>{simplifiedNumber(post.downvotes)}</Text>
              </Group>
            </Group>
          </Group>
        </Stack>
      </Paper>
  );
}