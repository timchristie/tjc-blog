import React, {useState, useMemo} from 'react';
import styles from './webPostList.module.scss';
import { Post } from '@baseline/types/post';

interface Props {
  posts: Post[];
}

const WebPostList = (props: Props, anonId: string): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const posts = props.posts;

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.content.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [posts, searchTerm]);

  return (
    <div className={styles.postList}>
      <div className={styles.list}>
        <div className={styles.header}>
          <div className={styles.userCount}>Welcome to the blog! There {posts.length === 1 ? 'is' : 'are'} {posts.length} post{posts.length === 1 ? '' : 's'} here. You've filtered down to {filteredPosts.length} post{filteredPosts.length === 1 ? '' : 's'}.</div>
          <input type="text" placeholder="Search posts" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      {filteredPosts.map((post) => (
        <div key={post.postId} className={styles.post}>
          <div className={styles.info}>
            <div className={styles.details}>
              <div className={styles.name}>{post.title}</div>
              <div className={styles.author}>Written by: {post.author}</div>
              <div className={styles.details}>{post.content}</div>
              <div className={styles.likes}>{post.likes ? post.likes.length : 0} likes, {post.comments ? post.comments.length : 0} comments</div>
              <div className={styles.pill}>Like</div>
              <div className={styles.pill}>Comment</div>
            </div>
            </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default WebPostList;