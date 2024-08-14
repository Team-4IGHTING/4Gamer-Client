import { useEffect, useState, Fragment } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppShell, ScrollArea, NavLink, Stack, Title } from '@mantine/core';

import { getBoards } from '@api/boardApi';
import { getBlacklist } from '@api/channelApi';
import { getPosts } from '@api/posts';
import { getPostReactionList } from '@api/reaction';

import { PageFrame } from '@components/Common/PageFrame/PageFrame';
import { PostSummary } from '@components/Post/PostList/PostSummary';

import { ChannelBlacklistResponse, PostSimplifiedResponse, ReactionResponse, BoardResponse } from '@/responseTypes';

type PostSimplifiedResponseWithReaction = PostSimplifiedResponse & { isUpvoting: number};

export function PostListPage() {
  const NULL = 0;
  const FALSE = 1;
  const TRUE = 2;

  const navigate = useNavigate();
  const { channelId, boardId } = (useParams() as unknown) as { channelId: bigint, boardId: bigint };
  const memberId = localStorage.getItem('4gamer_member_id');
  const [posts, setPosts] = useState<Array<PostSimplifiedResponse & { isUpvoting: number }>>([]);
  const [boards, setBoards] = useState<Array<BoardResponse>>([]);
  const { ref, inView } = useInView();
  const [postsPage, setPostsPage] = useState<bigint>(0n);
  const postsSize = 10n;
  const [isPostsAllLoaded, setIsPostsAllLoaded] = useState<boolean>(false);

  const fetchBoards = async () => {
    const data = await getBoards(channelId);
    setBoards(data);
  };
  const fetchPosts = async () => {
    if (inView && !isPostsAllLoaded) {
      const postReactions = await getPostReactionList();
      const data = await getPosts(channelId, boardId, postsPage, postsSize);
      if (!data.last) {
        setIsPostsAllLoaded(false);
        setPostsPage(postsPage + 1n);
      } else {
        setIsPostsAllLoaded(true);
      }
      await setPosts(data.content.map((each: PostSimplifiedResponse) => (
        {
          ...each,
          isUpvoting: (
            postReactions.some((reaction: ReactionResponse) => (reaction.id === each.id))
            ? (postReactions.find((reaction: ReactionResponse) => (
                  reaction.id === each.id
                )).isUpvoting ? TRUE : FALSE
              )
            : NULL
          ),
        }
      )).concat(posts));
    }
  };
  const checkBlacklists = async () => {
    const data = await getBlacklist(`${channelId}`);
    if (data.some((each: ChannelBlacklistResponse) => each.memberId === memberId)) {
      alert('해당 채널로의 접근이 차단되었습니다. 관리자에게 문의하세요.');
      navigate('/');
    }
  };

  useEffect(() => {
    checkBlacklists();
    fetchBoards();
    fetchPosts();
  }, [channelId, boardId]);

  useEffect(() => {
    fetchPosts();
  }, [inView]);

  const postListBody = (
    <>
      <Stack gap="xl">
        {posts
          .map((each, index) => (
            <Fragment key={index}>
              <PostSummary channelId={channelId} boardId={boardId} postId={each.id} post={each} />
            </Fragment>
          ))
        }
        <div ref={ref} />
      </Stack>
    </>
  );

  const postListNavbar = (
    <>
      <AppShell.Section>게시판 목록</AppShell.Section>
      <AppShell.Section grow my="md" component={ScrollArea}>
        {
          boards.map((each, index) => (
            <NavLink component={Link} to={`../../${each.id}/posts`} relative="path" key={index} label={each.title} />
          ))
        }
      </AppShell.Section>
    </>
  );

  const postListHeader = (
    // <Title order={3}>{channelTitle} / {boardTitle}</Title>
    <Title order={3}>Bruh</Title>
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
