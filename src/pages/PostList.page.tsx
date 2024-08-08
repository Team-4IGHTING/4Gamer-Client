import { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { AppShell, ScrollArea, NavLink, Stack, Title } from '@mantine/core';

import { getPosts } from '@api/posts';
import { getBoards } from '@api/boardApi';

import { PageFrame } from '@components/Common/PageFrame/PageFrame';
import { PostSummary } from '@components/Post/PostList/PostSummary';

import { BoardResponse } from '@/responseTypes';

const channelTitle = '게임 채널';
const boardTitle = '게시판';

export function PostListPage() {
  const { channelId, boardId } = (useParams() as unknown) as { channelId: bigint, boardId: bigint };
  const [posts, setPosts] = useState([]);
  const [boards, setBoards] = useState<Array<BoardResponse>>([]);

  const fetchBoards = async (cId: bigint) => {
    const data = await getBoards(cId);
    setBoards(data);
  };
  const fetchPosts = async (cId: bigint, bId: bigint) => {
    const data = await getPosts(cId, bId);
    setPosts(data.content);
  };

  useEffect(() => {
    fetchBoards(channelId);
    fetchPosts(channelId, boardId);
  }, [channelId, boardId]);

  const postListBody = (
    <>
      <Stack gap="xl">
        {posts
          .map((each, index) => (
            <Fragment key={index}>
              <PostSummary post={each} />
              {/* <CommentHtml /> */}
            </Fragment>
          ))
        }
      </Stack>
    </>
  );

  const postListNavbar = (
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

  const postListHeader = (
    <Title order={3}>{channelTitle} / {boardTitle}</Title>
  );

  return (
    <>
      <PageFrame
        bodyContent={postListBody}
        navbarContent={postListNavbar}
        headerContent={postListHeader}
        asideContent={undefined}
        footerContent={undefined}
      />
    </>
  );
}
