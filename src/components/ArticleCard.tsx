import Link from "next/link";
import Post from "../interfaces/post";

const ArticleCard = ({ post }: { post: Post }) => {
  return (
    <div className="container w-full md:max-w-5xl mx-auto pt-5">
      <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">
        <div className="font-sans">
          <h1 className="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">
            Welcome to Minimal Blog
          </h1>
          <p className="text-sm md:text-base font-normal text-gray-600">Published 19 February 2019</p>

          <div className="text-base md:text-sm text-gray-500 py-2">
            Tags:{" "}
            <a href="#" className="text-base md:text-sm text-green-500 no-underline hover:underline">
              Link
            </a>{" "}
            .{" "}
            <a href="#" className="text-base md:text-sm text-green-500 no-underline hover:underline">
              Link
            </a>
          </div>
          <p>
            The basic blog page layout is available and all using the default Tailwind CSS classes (although there are a
            few hardcoded style tags). If you are going to use this in your project, you will want to convert the
            classes into components.
          </p>
        </div>
      </div>
    </div>
  );
};

export { ArticleCard };
