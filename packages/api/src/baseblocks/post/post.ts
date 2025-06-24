import { Post } from '@baseline/types/post';

export const postMapper = (data: Post): Post => {
  const post: Post = {
    postId: data?.postId,
    author: data?.author,
    title: data?.title,
    comments: data?.comments,
    likes: data?.likes,
    content: data?.content,
  };
  return post;
};
