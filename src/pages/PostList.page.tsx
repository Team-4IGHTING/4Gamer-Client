import { useEffect, useState, Fragment } from 'react';
import { AppShell, ScrollArea, NavLink, Stack, Title } from '@mantine/core';

import { getPosts } from '../api/posts';

import { PageFrame } from '../components/Common/PageFrame/PageFrame.tsx';
import { PostSummary } from '../components/Post/PostList/PostSummary';

const channelTitle = '게임 채널';
const boardTitle = '게시판';

export function PostListPage() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const data = await getPosts();
    setPosts(data.content);
  };

  useEffect(() => { fetchPosts(); }, []);

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
        // asideContent = ""
        // footerContent = ""
      />
    </>
  );
}
