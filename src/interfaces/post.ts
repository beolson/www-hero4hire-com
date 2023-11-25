import type Author from "./author";

type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: Array<string>;
};

export type { Post };
