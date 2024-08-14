import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppShell, NavLink, ScrollArea } from '@mantine/core';

import { getBoards } from '@api/boardApi';
import { getMemberInfo } from '@api/member';
import { getPost, getTagsInPost, getComments } from '@api/posts';
import { getPostReactionList, getCommentReactionList } from '@api/reaction';
import { BoardResponse, CommentResponse, PostResponse, PostTagResponse, ReactionResponse } from '@/responseTypes';

import { PageFrame } from '@/components/Common/PageFrame/PageFrame';
import { PostDetail } from '@/components/Post/PostDetail/PostDetail';

export function PostDetailPage() {
  const { channelId, boardId, postId } = (
    useParams() as unknown
  ) as { channelId: bigint, boardId: bigint, postId: bigint };
  const [boards, setBoards] = useState<BoardResponse[]>([]);
  const [post, setPost] = useState<PostResponse | null>(null);
  const [comments, setComments] = useState<Array<CommentResponse & { isUpvoting: boolean }>>([]);
  const [tags, setTags] = useState<Array<PostTagResponse>>([]);
  const [postReactionList, setPostReactionList] = useState<Array<ReactionResponse>>([]);
  const [commentReactionList, setCommentReactionList] = useState<Array<ReactionResponse>>([]);
  const accessToken = localStorage.getItem('accessToken');

  const getMemberId = async () => {
    if (accessToken !== null) {
      const data = await getMemberInfo(accessToken);
      localStorage.setItem('4gamer_member_id', data.id);
    }
  };

  const fetchBoards = async (cId: bigint) => {
    const data = await getBoards(cId);
    setBoards(data);
  };

  const fetchTags = async (cId: bigint, bId: bigint, pId: bigint) => {
    const data = await getTagsInPost(cId, bId, pId);
    setTags(data);
  };

  const fetchPostReactionList = async () => {
    const data = await getPostReactionList();

    getMemberId();
    setPostReactionList(data);
  };

  const fetchPost = async (cId: bigint, bId: bigint, pId: bigint) => {
    const data = await getPost(cId, bId, pId);
    setPost(data);
  };

  const fetchCommentReactionList = async () => {
    const data = await getCommentReactionList();

    getMemberId();
    setCommentReactionList(data);
  };

  useEffect(() => {
    fetchBoards(channelId);
    fetchPost(channelId, boardId, postId);
    fetchTags(channelId, boardId, postId);
    // fetchComments(channelId, boardId, postId);
    fetchPostReactionList();
    fetchCommentReactionList();
  }, [postId]);

  const postDetailBody = (
    // <PostDetail post={post!} comments={comments} tags={tags} />
    <PostDetail channelId={channelId} boardId={boardId} postId={postId} />
  );

  const postDetailNavbar = (
    <>
      <AppShell.Section>게시판 목록</AppShell.Section>
      <AppShell.Section grow my="md" component={ScrollArea}>
        {
          boards.map((each, index) => (
            <NavLink component={Link} to={`../../../${each.id}/posts`} relative="path" key={index} label={each.title} />
          ))
        }
      </AppShell.Section>
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
