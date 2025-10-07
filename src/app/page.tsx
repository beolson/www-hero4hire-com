"use client";
import { allPosts } from "content-collections";
export default function Home() {
  return (
    <main className="mb-auto">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-3xl md:leading-14 dark:text-gray-100">
            Posts
          </h1>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {allPosts.map((post) => (
            <li key={`posts/${post.slug}`} className="py-12">
              <article>
                <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                      <time>
                        {post.datePosted.toLocaleDateString("en-EN", {
                          year: "numeric",
                          month: "long",
                          day: "2-digit",
                        })}{" "}
                      </time>
                      <div>{JSON.stringify(post.authors)}</div>
                    </dd>
                  </dl>
                  <div className="space-y-5 xl:col-span-3">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl leading-8 font-bold tracking-tight">
                          <a
                            className="text-gray-900 dark:text-gray-100"
                            href={`posts/${post.slug}`}
                          >
                            {post.title}
                          </a>
                        </h2>
                      </div>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {post.summary}
                      </div>
                    </div>
                    <div className="text-base leading-6 font-medium">
                      <a
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label="Read more: "
                        href={`posts/${post.slug}`}
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
    </main>
  );
}
