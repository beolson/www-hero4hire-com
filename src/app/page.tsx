import Image from "next/image";
import { posts, Post } from "../../.velite";

export default async function Home() {
  // console.log('here')
  return (
    <main className="mb-auto">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            A blog created with Next.js and Tailwind.css
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">

         {posts.map(post => (
                   <li key={post.slug} className="py-12">
            <article>
              <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                <dl>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                    <time>{post.date.toString()}</time>
                  </dd>
                </dl>
                <div className="space-y-5 xl:col-span-3">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl leading-8 font-bold tracking-tight">
                        <a
                          className="text-gray-900 dark:text-gray-100"
                          href="/blog/release-of-tailwind-nextjs-starter-blog-v2.0"
                        >
                          {post.title }
                        </a>
                      </h2>
                      <div className="flex flex-wrap">
                        <a
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                          href="/tags/next-js"
                        >
                          next-js
                        </a>
                        <a
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                          href="/tags/tailwind"
                        >
                          tailwind
                        </a>
                        <a
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                          href="/tags/guide"
                        >
                          guide
                        </a>
                        <a
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
                          href="/tags/feature"
                        >
                          feature
                        </a>
                      </div>
                    </div>
                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                      Release of Tailwind Nextjs Starter Blog template v2.0,
                      refactored with Nextjs App directory and React Server
                      Components setup.Discover the new features and how to
                      migrate from V1.
                    </div>
                  </div>
                  <div className="text-base leading-6 font-medium">
                    <a
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      aria-label="Read more: &quot;Release of Tailwind Nextjs Starter Blog v2.0&quot;"
                      href="/blog/release-of-tailwind-nextjs-starter-blog-v2.0"
                    >
                      Read more →
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </li>
         ))}
        </ul>
      </div>
      <div className="flex justify-end text-base leading-6 font-medium">
        <a
          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
          aria-label="All posts"
          href="/blog"
        >
          All Posts →
        </a>
      </div>
      <div className="flex items-center justify-center pt-4">
        <div>
          <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
            Subscribe to the newsletter
          </div>
          <form className="flex flex-col sm:flex-row">
            <div>
              <label>
                <span className="sr-only">Email address</span>
                <div data-lastpass-icon-root="">
                  <template>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      data-lastpass-icon="true"
                    >
                      <rect
                        x="0.680176"
                        y="0.763062"
                        width="22.6392"
                        height="22.4737"
                        rx="4"
                        fill="currentColor"
                      ></rect>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M19.7935 7.9516C19.7935 7.64414 20.0427 7.3949 20.3502 7.3949C20.6576 7.3949 20.9069 7.64414 20.9069 7.9516V16.0487C20.9069 16.3562 20.6576 16.6054 20.3502 16.6054C20.0427 16.6054 19.7935 16.3562 19.7935 16.0487V7.9516Z"
                        fill="white"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.76288 13.6577C5.68525 13.6577 6.43298 12.9154 6.43298 11.9998C6.43298 11.0842 5.68525 10.3419 4.76288 10.3419C3.8405 10.3419 3.09277 11.0842 3.09277 11.9998C3.09277 12.9154 3.8405 13.6577 4.76288 13.6577Z"
                        fill="white"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.3298 13.6577C11.2521 13.6577 11.9999 12.9154 11.9999 11.9998C11.9999 11.0842 11.2521 10.3419 10.3298 10.3419C9.4074 10.3419 8.65967 11.0842 8.65967 11.9998C8.65967 12.9154 9.4074 13.6577 10.3298 13.6577Z"
                        fill="white"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.8964 13.6577C16.8188 13.6577 17.5665 12.9154 17.5665 11.9998C17.5665 11.0842 16.8188 10.3419 15.8964 10.3419C14.974 10.3419 14.2263 11.0842 14.2263 11.9998C14.2263 12.9154 14.974 13.6577 15.8964 13.6577Z"
                        fill="white"
                      ></path>
                    </svg>
                  </template>
                </div>
              </label>
            </div>
            <div className="mt-2 flex w-full rounded-md shadow-sm sm:mt-0 sm:ml-3">
              <button
                className="bg-primary-500 w-full rounded-md py-2 px-4 font-medium text-white sm:py-0 hover:bg-primary-700 dark:hover:bg-primary-400 focus:ring-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black"
                type="submit"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );

  // console.log(posts)
  // return (
  //   <div>
  //     Hello
  //     {posts.map(post => (
  //       <div key={post.slug}>
  //         <h2>{post.title}</h2>
  //         <p>{post.excerpt}</p>
  //       </div>
  //     ))}
  //   </div>
  // );
}

// export async function generateStaticParams() {
//   console.log("posts", posts);

//   return posts;
// }
