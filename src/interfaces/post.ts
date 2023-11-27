type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: Array<string>;
};

interface GetPostsArgs {
  tag?: string;
  page?: number;
}

interface GetPostsResponse {
  pages: number;
  currentPage: number;
  posts: Array<Post>;
}

export type { Post, GetPostsArgs, GetPostsResponse };
