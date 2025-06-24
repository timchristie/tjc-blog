import { Response } from 'express';
import { postMapper } from './post';
import { isAdmin } from '../../middleware/is-admin';
import { RequestContext } from '../../util/request-context.type';
import { Post } from '@baseline/types/post';
import { getErrorMessage } from '../../util/error-message';
import createApp from '../../util/express-app';
import createAuthenticatedHandler from '../../util/create-authenticated-handler';
import { postService } from './post.service';

const app = createApp();
// app.use(isAdmin); // All private endpoints require the user to be an admin
export const handler = createAuthenticatedHandler(app);

app.post('/post', [
  isAdmin,
  async (req: RequestContext, res: Response) => {
    try {
      const { author, comments, likes, content, title } = req.body as Post;
      const postData: Partial<Post> = {
        author, comments, likes, content, title
      };
      const post = await postService.create(postData);
      res.json(postMapper(post));
    } catch (error) {
      const message = getErrorMessage(error);
      console.error(`Failed to create post ${message}`);
      res.status(400).json({ error: 'Failed to create post' });
    }
  },
]);

app.patch('/post', [
  isAdmin,
  async (req: RequestContext, res: Response) => {
    try {
      const { postId, author, comments, likes, content } = req.body as Post;
      const postData: Partial<Post> = {
        postId, author, comments, likes, content
      };
      const post = await postService.update(postData);
      res.json(postMapper(post));
    } catch (error) {
      const message = getErrorMessage(error);
      console.error(`Failed to update post: ${message}`);
      res.status(400).json({
        error: 'Failed to update post',
      });
    }
  },
]);

app.delete('/post/:postId', [
  isAdmin,
  async (req: RequestContext, res: Response) => {
    try {
      const postId = req.params.postId;
      await postService.delete(postId);
      res.status(200);
      res.send();
    } catch (error) {
      const message = getErrorMessage(error);
      console.error(`Failed to delete post: ${message}`);
      res.status(400).json({
        error: 'Failed to delete post',
      });
    }
  },
]);


app.get('/post/list', [
  async (req: RequestContext, res: Response) => {
    try {
      const posts = await postService.getAll();
      const formattedPosts = posts.map(postMapper);
      res.json(formattedPosts);
    } catch (error) {
      const message = getErrorMessage(error);
      console.error(`Failed to get posts: ${message}`);
      res.status(400).json({
        error: 'Failed to get posts',
      });
    }
  },
]);

app.get('/post/:postId', [
  async (req: RequestContext, res: Response) => {
    try {
      const post = await postService.get(req.params.postId);
      res.json(postMapper(post));
    } catch (error) {
      const message = getErrorMessage(error);
      console.error(`Failed to get post: ${message}`);
      res.status(400).json({
        error: 'Failed to get post',
      });
    }
  },
]);
