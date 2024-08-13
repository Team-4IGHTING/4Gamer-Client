import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppShell, NavLink, ScrollArea } from '@mantine/core';

import { getPost, getTagsInPost, getComments } from '@api/posts';
import { PostResponse, PostTagResponse, CommentResponse } from '@/responseTypes';

import { PageFrame } from '@/components/Common/PageFrame/PageFrame';
import { PostDetail } from '@/components/Post/PostDetail/PostDetail';

export function PostDetailPage() {
  const { channelId, boardId, postId } = (
    useParams() as unknown
  ) as { channelId: bigint, boardId: bigint, postId: bigint };
  const [post, setPost] = useState<PostResponse | null>(null);
  const [comments, setComments] = useState<Array<CommentResponse>>([]);
  const [tags, setTags] = useState<Array<PostTagResponse>>([]);

  const fetchPost = async (cId: bigint, bId: bigint, pId: bigint) => {
    const data = await getPost(cId, bId, pId);
    setPost(data);
  };

  const fetchComments = async (cId: bigint, bId: bigint, pId: bigint) => {
    const data = await getComments(cId, bId, pId);
    setComments(data.content);
  };

  const fetchTags = async (cId: bigint, bId: bigint, pId: bigint) => {
    const data = await getTagsInPost(cId, bId, pId);
    setTags(data);
  };

  useEffect(() => {
    fetchPost(channelId, boardId, postId);
    fetchTags(channelId, boardId, postId);
    fetchComments(channelId, boardId, postId);
  }, [postId]);

  const postDetailBody = (
    <PostDetail post={post!} comments={comments} tags={tags} />
  );

  const postDetailNavbar = (
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

  // rendering component pattern - old school
  // 위임 component pattern
  if (post && comments) {
    return (
      <>
        <PageFrame
          bodyContent={postDetailBody}
          navbarContent={postDetailNavbar}
          asideContent={undefined}
          headerContent={undefined}
          footerContent={undefined}
        />
      </>
    );
  }
}
