export interface Post {
  postId: string;
  author: string;
  title: string;
  comments?: string[];
  likes?: string[];
  content: string;
}
