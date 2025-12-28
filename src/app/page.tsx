import Link from 'next/link'
import { posts } from '@/data/posts'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Hero Section - Medium Style */}
      <section className="text-center mb-16 pt-8">
        <h1 className="text-6xl font-bold text-gray-900 mb-6 tracking-tight">
          Cyber Security Blog
        </h1>
        <p className="text-2xl text-gray-600 max-w-2xl mx-auto font-light">
          Exploring cybersecurity, ethical hacking, penetration testing, and security research
        </p>
      </section>

      {/* Blog Posts - Medium Style */}
      <section>
        <div className="space-y-12">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="block group"
            >
              <article className="py-6 border-b border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-start gap-4 mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    {post.author}
                  </span>
                  <span className="text-gray-400">·</span>
                  <time className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-xl text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

