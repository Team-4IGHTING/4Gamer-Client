import { ActionIcon, Text, Avatar, Group, Menu, Paper, Space } from '@mantine/core';
import { IconDots, IconFlag, IconThumbUp, IconThumbDown } from '@tabler/icons-react';

import classes from './Comment.module.css';
import { metricNumber } from '@/util/numberUtil';
import { CommentResponse } from '@/responseTypes';

export function Comment({ comment }: { comment: CommentResponse }) {
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
          <Text>{metricNumber(comment.upvotes)}</Text>
          <ActionIcon variant="transparent" color="gray">
            <IconThumbDown stroke={1.5} />
          </ActionIcon>
          <Text>{metricNumber(comment.downvotes)}</Text>

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
