import { client } from './client';

export const createPost = async (channelId: bigint, boardId: bigint, post: any) => {
    const response = await client.post(`/api/v1/channels/${channelId}/boards/${boardId}/posts`, post);
    return response.data;
};

export const getPosts = async (channelId: bigint, boardId: bigint) => {
    const response = await client.get(`/api/v1/channels/${channelId}/boards/${boardId}/posts`);
    return response.data;
};

export const getPost = async (channelId: bigint, boardId: bigint, postId: bigint) => {
    const response = await client.get(`/api/v1/channels/${channelId}/boards/${boardId}/posts/${postId}`);
    return response.data;
};

export const getComments = async (channelId: bigint, boardId: bigint, postId: bigint) => {
    const response = await client.get(`/api/v1/channels/${channelId}/boards/${boardId}/posts/${postId}/comments`);
    return response.data;
};

export const postPost = async (channelId: bigint, boardId: bigint, post: any) => {
    const response = await client.post(`/api/v1/channels/${channelId}/boards/${boardId}/posts`, post);
    console.log(`API call responding: >> ${response.data}`);
    return response.data;
};

export const addComment = async (channelId: bigint,
    boardId: bigint,
    postId: bigint,
    comment: any
) => {
    const response = await client.post(`/api/v1/channels/${channelId}/boards/${boardId}/posts/${postId}/comments`, comment);
    console.log(`API call responding: >> ${response.data}`);
    return response.data;
};

export const addPostReaction = async (
    channelId: bigint,
    boardId: bigint,
    postId: bigint,
    isUpvoting: boolean
) => {
    const response = await client.put(`/api/v1/channels/${channelId}/boards/${boardId}/posts/${postId}/reaction?is-upvoting=${isUpvoting}`);
    console.log(`API call responding: >> ${response.data}`);
    return response.data;
};

export const deletePostReaction = async (
    channelId: bigint,
    boardId: bigint,
    postId: bigint
) => {
    const response = await client.delete(`/api/v1/channels/${channelId}/boards/${boardId}/posts/${postId}/reaction`);
    console.log(`API call responding: >> ${response.data}`);
    return response.data;
};

export const addCommentReaction = async (
    channelId: bigint,
    boardId: bigint,
    postId: bigint,
    commentId: bigint,
    isUpvoting: boolean
) => {
    const response = await client.put(`/api/v1/channels/${channelId}/boards/${boardId}/posts/${postId}/comments/${commentId}/reaction?is-upvoting=${isUpvoting}`);
    console.log(`API call responding: >> ${response.data}`);
    return response.data;
};

export const deleteCommentReaction = async (
    channelId: bigint,
    boardId: bigint,
    postId: bigint,
    commentId: bigint
) => {
    const response = await client.delete(`/api/v1/channels/${channelId}/boards/${boardId}/posts/${postId}/comments/${commentId}/reaction`);
    console.log(`API call responding: >> ${response.data}`);
    return response.data;
};
