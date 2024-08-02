import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { PostEditPage } from './pages/PostEdit.page';
import { PostListPage } from './pages/PostList.page';
import { PostDetailPage } from './pages/PostDetail.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/edit',
    element: <PostEditPage />,
  },
  {
    path: '/posts',
    element: <PostListPage />,
  },
  // {
  //   path: '/postdetail',
  //   element: <PostDetailPage />,
  // },
  {
    path: '/post/:postId',
    element: <PostDetailPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
