import { apiClient } from './client';

export const getPosts = async () => {
    const response = await apiClient.get('/channels/1/boards/1/posts');
    console.log(response.data);
    return response.data;
};

export const getPost = async (postId) => {
    const response = await apiClient.get(`/channels/1/boards/1/posts/${postId}`);
    console.log(response.data);
    return response.data;
}

export const getComments = async (postId) => {
    const response = await apiClient.get(`/channels/1/boards/1/posts/${postId}/comments`);
    console.log(response.data);
    return response.data;
}