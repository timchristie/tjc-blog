import React from 'react';
import PageWrapper from '../components/page-wrapper/PageWrapper';
import WebPostList from '../baseblocks/post/webPostList';
import { Post } from '@baseline/types/post';
import { useLoaderData } from 'react-router-dom';
import { getRequestHandler } from '@baseline/client-api/request-handler';
import { getAllPosts } from '@baseline/client-api/post';
import { v4 as uuidv4 } from 'uuid'; 
  
export async function homeLoader() {
  if (localStorage.getItem('anonId') === null) {
    localStorage.setItem('anonId', uuidv4());
  }
  
  const posts = await getAllPosts(getRequestHandler());
  return {
    posts: posts,
  };
}

const Home = (): JSX.Element => {
  const { posts } = useLoaderData() as { posts: Post[] };

  return (
  <PageWrapper title="Home">
    <WebPostList posts={posts} />
  </PageWrapper>
  );
};

export default Home;
