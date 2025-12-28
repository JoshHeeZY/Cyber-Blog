import Link from 'next/link'
import { posts } from '@/data/posts'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Cyber Security Blog
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Exploring cybersecurity, ethical hacking, penetration testing, and security research
        </p>
      </section>

      {/* Blog Posts Grid */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{post.date}</span>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {post.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

