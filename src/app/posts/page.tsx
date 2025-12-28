'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { posts as initialPosts } from '@/data/posts'

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  author: string
  readTime: string
}

export default function PostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)

  useEffect(() => {
    // Load saved posts from localStorage
    const savedPosts = localStorage.getItem('cyber-blog-posts')
    if (savedPosts) {
      try {
        const parsed = JSON.parse(savedPosts)
        setPosts([...parsed, ...initialPosts])
      } catch (e) {
        console.error('Error loading saved posts:', e)
      }
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-900">All Posts</h1>
        <Link
          href="/new-post"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
        >
          + Add New Post
        </Link>
      </div>

      <div className="space-y-8">
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
    </div>
  )
}

