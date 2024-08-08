export type CommentResponse = {
  id: bigint,
  content: string,
  author: string,
  upvotes: bigint,
  downvotes: bigint,
  createdAt: string,
  updatedAt: string
};
export type PostResponse = {
  id: bigint,
  title: string,
  body: string,
  views: bigint,
  upvotes: bigint,
  downvotes: bigint,
  createdAt: string,
  updatedAt: string,
  author: string,
  board: BoardResponse,
  attachment: string | undefined
};

export type BoardResponse = {
  id: bigint,
  title: string,
  createdAt: string,
  updatedAt: string
};
