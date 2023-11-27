import { Post } from "@/interfaces/post";
import Link from "next/link";


const ArticleCard = ({ post }: { post: Post }) => {
  return (
    <div className="container w-full md:max-w-5xl mx-auto pt-5">
      <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">
        <div className="font-sans">
          <h1 className="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">
            <Link href={`posts/${post.slug}`}>{post.title}</Link>
          </h1>
          <p className="text-sm md:text-base font-normal text-gray-600">
            Published{" "}
            {new Date(post.date).toLocaleDateString("en-us", {
              // weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="text-base md:text-sm text-gray-500 py-2">
            Tags:{" "}
            {post.tags.map((tag, index) =>
              <>
                {!!index && <span className="px-1">/</span>}
                <a href="#" className="text-base md:text-sm text-green-500 no-underline hover:underline">
                  {tag}
                </a>
              </>
            )}
          </div>
          <p>{post.excerpt}</p>
        </div>
      </div>
    </div>
  );
};

export { ArticleCard };
