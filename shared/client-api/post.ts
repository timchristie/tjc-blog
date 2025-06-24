import { Post } from '@baseline/types/post';
import { RequestHandler } from './request-handler';

export const getPost = async (requestHandler: RequestHandler, postId: string): Promise<Post> => {
  const response = await requestHandler.request<Post>({
    method: 'GET',
    url: `post/${postId}`,
    hasAuthentication: true,
  });
  if ('data' in response) {
    return response.data;
  }
  throw response;
};

export const getAllPosts = async (requestHandler: RequestHandler): Promise<Post[]> => {
  const response = await requestHandler.request<Post[]>({
    method: 'GET',
    url: `post/list`,
    hasAuthentication: true,
  });
  if ('data' in response) {
    return response.data;
  }
  throw response;
};

export const deletePost = async (requestHandler: RequestHandler, postId: string): Promise<boolean> => {
  const response = await requestHandler.request<boolean>({
    method: 'DELETE',
    url: `post/${postId}`,
    hasAuthentication: true,
  });
  if ('data' in response) {
    return response.data;
  }
  throw response;
};

export const createPost = async (
  requestHandler: RequestHandler,
  post: Partial<Post>,
): Promise<Post> => {
  const response = await requestHandler.request<Post>({
    method: 'POST',
    url: `post`,
    hasAuthentication: true,
    data: post,
  });
  if ('data' in response) {
    return response.data;
  }
  throw response;
};

export const updatePost = async (
  requestHandler: RequestHandler,
  post: Partial<Post>,
): Promise<Post> => {
  const response = await requestHandler.request<Post>({
    method: 'PATCH',
    url: `post`,
    hasAuthentication: true,
    data: post,
  });
  if ('data' in response) {
    return response.data;
  }
  throw response;
};
