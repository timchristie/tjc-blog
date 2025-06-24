import React from 'react';
import { Post } from '@baseline/types/post';
import PostList from '../components/post-list/PostList';
import { useLoaderData } from 'react-router-dom';
import { getAllPosts } from '@baseline/client-api/post';
import { getRequestHandler } from '@baseline/client-api/request-handler';
import PageContent from '../../../components/page-content/PageContent';

export async function postListLoader() {
  const posts = await getAllPosts(getRequestHandler());
  return {
    posts: posts,
  };
}

const Posts = (): JSX.Element => {
  const { posts } = useLoaderData() as { posts: Post[] };

  return (
    <PageContent>
      <PostList posts={posts} />
    </PageContent>
  );
};

export default Posts;
