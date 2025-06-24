import React, { useState } from 'react';
import ConfirmDelete from '../../../../components/confirm-delete/ConfirmDelete';
import AddPost from '../add-post/AddPost';
import styles from './PostList.module.scss';
import { getRequestHandler } from '@baseline/client-api/request-handler';
import { Post } from '@baseline/types/post';
import { deletePost } from '@baseline/client-api/post';

interface Props {
  posts: Post[];
}

const PostList = (props: Props): JSX.Element => {
  const [allPosts, setAllPosts] = useState<Post[]>(props?.posts || []);

  const handleDelete = async (postId: string): Promise<void> => {
    await deletePost(getRequestHandler(), postId);
    setAllPosts((posts) =>
      posts.filter((post) => post.postId !== postId.toString()),
    );
  };

  return (
    <div className={styles.userList}>
      <div className={styles.list}>
        <div className={styles.header}>
          <div className={styles.userCount}>
            There are {allPosts.length} blog posts currently published. 
          </div>
          <AddPost setAllPosts={setAllPosts} />
        </div>
        {allPosts.map((post) => (
          <div key={post.postId} className={styles.admin}>
            <div className={styles.info}>
              <div className={styles.details}>
                <div className={styles.name}>{post.title}</div>
                <div className={styles.data}>{post.content.length > 100 ? post.content.slice(0, 100) + '...' : post.content}</div>
              </div>
              <div className={styles.pill}>Author: {post.author}</div>
            </div>
            <div className={styles.buttons}>
              <ConfirmDelete
                itemName={post.title}
                deleteFunction={async () => {
                  await handleDelete(post.postId);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
