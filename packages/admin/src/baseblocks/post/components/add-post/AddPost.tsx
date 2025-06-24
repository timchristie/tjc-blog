import React, { useState } from 'react';
import {
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { getRequestHandler } from '@baseline/client-api/request-handler';
import styles from './AddPost.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { Post } from '@baseline/types/post';
import { createPost } from '@baseline/client-api/post';

interface Props {
  setAllPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const generatePostUUID = (): string => {
  return uuidv4();
};

const AddPost = (props: Props) => {
  const { setAllPosts } = props;
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggle = () => {
    setNewTitle('');
    setNewContent('');
    setNewAuthor('');
    setIsModalOpen((open) => !open);
  };

  const addPost = async (): Promise<void> => {
    const newPost = await createPost(getRequestHandler(), {
      postId: generatePostUUID(),
      title: newTitle,
      content: newContent,
      author: newAuthor,
    });
    setAllPosts((posts) => [...posts, newPost]);
    toggle();
  };

  return (
    <div className={styles.addUser}>
      <button className={styles.addUserButton} onClick={toggle}>
        Add New Post
      </button>
      <Modal
        className={styles.addUserModal}
        isOpen={isModalOpen}
        toggle={toggle}
        centered
      >
        <ModalHeader toggle={toggle}>Add Post</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Title</Label>
            <Input
              onChange={(e) => setNewTitle(e.target.value)}
              value={newTitle}
            />
          </FormGroup>
          <FormGroup>
            <Label>Content</Label>
            <Input
              onChange={(e) => setNewContent(e.target.value)}
              value={newContent}
            />
          </FormGroup>
          <FormGroup>
            <Label>Author</Label>
            <Input
              onChange={(e) => setNewAuthor(e.target.value)}
              value={newAuthor}
            />
          </FormGroup>
          </ModalBody>
        <ModalFooter>
          <button
            disabled={!newTitle || !newContent || !newAuthor}
            className={styles.addUserButton}
            onClick={() => {
              void addPost();
            }}
          >
            Add
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddPost;
