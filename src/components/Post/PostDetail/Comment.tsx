import { ActionIcon, Text, Avatar, Group, Menu, Paper, Space } from '@mantine/core';

import { IconDots, IconFlag, IconThumbUp, IconThumbDown } from '@tabler/icons-react';

import classes from './Comment.module.css';

export function Comment({ comment }) {
  function simplifiedNumber(n) {
    const degrees = ['', 'K', 'M', 'B', 'T'];
    let degreeCount = 0;

    let nSimplified = n;
    for (; nSimplified >= 1000; nSimplified /= 1000) degreeCount += 1;

    return `${nSimplified}${degrees[degreeCount]}`;
  }

  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Group justify="space-between">
        <Group>
          <Avatar
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
            alt="Jacob Warnhalter"
            radius="xl"
          />
          <div>
            <Text fz="sm">{comment.author}</Text>
            <Text fz="xs" c="dimmed">{comment.createdAt}</Text>
          </div>
        </Group>

        <Group>
          <ActionIcon variant="transparent" color="gray">
            <IconThumbUp stroke={1.5} />
          </ActionIcon>
          <Text>{simplifiedNumber(comment.upvotes)}</Text>
          <ActionIcon variant="transparent" color="gray">
            <IconThumbDown stroke={1.5} />
          </ActionIcon>
          <Text>{simplifiedNumber(comment.downvotes)}</Text>

          <Menu>
            <Menu.Target>
              <ActionIcon variant="transparent" color="gray">
                <IconDots stroke={1.5} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<IconFlag stroke={1.5} />}>
                신고하기
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
      <Space h="md" />
      <Text>{comment.content}</Text>
    </Paper>
  );
}
