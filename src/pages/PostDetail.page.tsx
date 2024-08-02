import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppShell, NavLink, ScrollArea } from '@mantine/core';

import { getPost, getComments } from '@/api/posts';

import { PageFrame } from '@/components/Common/PageFrame/PageFrame';
import { PostDetail } from '@/components/Post/PostDetail/PostDetail';

// const mockComment = {
//   id: 1,
//   content: 'Bruh',
//   author: 'Strafeinheit',
//   upvotes: 10,
//   downvotes: 2,
//   createdAt: '2024-08-01T12:00:00Z',
//   updatedAt: '2024-08-01T15:00:00Z',
// };
// const mockCommentsList = [mockComment, mockComment, mockComment, mockComment, mockComment];

// const pageContent = '<h2 style="text-align: center">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a target="_blank" rel="noopener noreferrer" href="https://tiptap.dev/">Tiptap.dev</a> and supports all of its features:</p><ul><li><p>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s></p></li><li><p>Headings (h1-h6)</p></li><li><p>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</p></li><li><p>Ordered and bullet lists</p></li><li><p>Text align&nbsp;</p></li><li><p>And all <a target="_blank" rel="noopener noreferrer" href="https://tiptap.dev/extensions">other extensions</a></p></li></ul>';
// const mockPost = {
//   id: 1,
//   title: 'Awesome Title because the line is so long that the whole content will not be shown',
//   body: pageContent,
//   views: 10,
//   upvotes: 10,
//   downvotes: 1,
//   createdAt: '2024-07-31T15:00:00Z',
//   updatedAt: '2024-07-31T21:00:00Z',
//   author: 'Hans',
//   board: {
//     id: 1,
//     title: '자유게시판',
//     createdAt: '2024-07-28T12:00:00Z',
//     updatedAt: '2024-07-28T12:00:00Z',
//   },
//   attachment: null,
//   tags: [
//     'AAA',
//     '2S38',
//     '2-OP',
//   ],
// };

export function PostDetailPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);

  const fetchPost = async (id) => {
    const data = await getPost(id);
    setPost(data);
  };

  const fetchComments = async (id) => {
    const data = await getComments(id);
    setComments(data.content);
  };

  useEffect(() => {
    fetchPost(postId);
    fetchComments(postId);
  }, []);

  const postDetailBody = (
    <PostDetail post={post} comments={comments} />
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
        />
      </>
    );
  }
}
