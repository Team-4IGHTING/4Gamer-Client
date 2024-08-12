import { client } from './client';

export const getPresignedUrl = async (filename: string) => {
  // const response = await client.get(`/api/v1/s3/presigned?file=${filename}`);
  const response = await client.get(`/api/v1/presigned?file=${filename}`);
  return response.data;
};
