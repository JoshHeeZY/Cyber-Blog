'use client'

import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { posts as initialPosts } from '@/data/posts'
import Image from 'next/image'
import CodeBlock from '@/components/CodeBlock'
import InteractiveButton from '@/components/InteractiveButton'
import ImageGallery from '@/components/ImageGallery'

interface PageProps {
  params: {
    slug: string
  }
}

// This would normally fetch from a CMS or markdown files
// For now, we'll use a simple mapping
const postContent: Record<string, any> = {
  'deauth-attack-tutorial': {
    title: 'Understanding Deauthentication Attacks',
    date: '2024-01-15',
    category: 'Wireless Security',
    author: 'Cyber Researcher',
    readTime: '5 min read',
    content: (
      <>
        <h2 className="text-3xl font-bold mt-8 mb-4">What is a Deauthentication Attack?</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          A deauthentication attack is a type of denial-of-service attack that targets wireless networks.
          It exploits a vulnerability in the 802.11 Wi-Fi protocol to disconnect devices from their access points.
        </p>

        <h2 className="text-3xl font-bold mt-8 mb-4">How It Works</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          The attack sends deauthentication frames to both the access point and the client device,
          causing them to disconnect. This is possible because the 802.11 standard doesn't require
          authentication for deauthentication frames.
        </p>

        <h3 className="text-2xl font-semibold mt-6 mb-3">Example Command</h3>
        <CodeBlock
          code={`# Using aireplay-ng to perform deauthentication attack
aireplay-ng --deauth 10 -a [AP MAC] -c [Client MAC] wlan0`}
          language="bash"
          filename="deauth.sh"
        />

        <h2 className="text-3xl font-bold mt-8 mb-4">Protection Methods</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          There are several ways to protect against deauthentication attacks:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Use WPA3 encryption (most secure)</li>
          <li>Enable Protected Management Frames (PMF)</li>
          <li>Monitor for deauthentication frame floods</li>
          <li>Use enterprise-grade access points</li>
        </ul>
      </>
    ),
  },
  'network-scanning-basics': {
    title: 'Network Scanning Fundamentals',
    date: '2024-01-10',
    category: 'Network Security',
    author: 'Cyber Researcher',
    readTime: '8 min read',
    content: (
      <>
        <h2 className="text-3xl font-bold mt-8 mb-4">Introduction to Network Scanning</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Network scanning is a fundamental skill in cybersecurity. It involves discovering
          hosts, services, and vulnerabilities on a network.
        </p>
      </>
    ),
  },
  'password-security-best-practices': {
    title: 'Password Security Best Practices',
    date: '2024-01-05',
    category: 'Security Basics',
    author: 'Cyber Researcher',
    readTime: '6 min read',
    content: (
      <>
        <h2 className="text-3xl font-bold mt-8 mb-4">Creating Strong Passwords</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Strong passwords are essential for protecting your accounts and data.
        </p>
      </>
    ),
  },
}

export default function BlogPost({ params }: PageProps) {
  const [allPosts, setAllPosts] = useState(initialPosts)
  const [savedPost, setSavedPost] = useState<any>(null)
  const slug = params.slug

  useEffect(() => {
    // Load saved posts from localStorage
    const savedPosts = localStorage.getItem('cyber-blog-posts')
    if (savedPosts) {
      try {
        const parsed = JSON.parse(savedPosts)
        setAllPosts([...parsed, ...initialPosts])
        
        // Check if current post is a saved post
        const found = parsed.find((p: any) => p.slug === slug)
        if (found) {
          setSavedPost(found)
        }
      } catch (e) {
        console.error('Error loading saved posts:', e)
      }
    }
  }, [slug])

  const post = allPosts.find((p) => p.slug === slug)
  const content = postContent[slug]

  // If it's a saved post, use that data
  if (savedPost) {
    return (
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="mb-8">
          <div className="mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              {savedPost.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {savedPost.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-600 text-sm">
            <span>{savedPost.author}</span>
            <span>•</span>
            <time dateTime={savedPost.date}>
              {new Date(savedPost.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>•</span>
            <span>{savedPost.readTime}</span>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
            {savedPost.screenshots && savedPost.screenshots.length > 0 && (
              <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedPost.screenshots.map((screenshot: string, index: number) => (
                  <div key={index} className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={screenshot}
                      alt={`Screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {savedPost.content}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/posts"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            ← Back to all posts
          </Link>
        </div>
      </article>
    )
  }

  if (!post || !content) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <header className="mb-8">
        <div className="mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
            {post.category}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {content.title}
        </h1>
        <div className="flex items-center gap-4 text-gray-600 text-sm">
          <span>{post.author}</span>
          <span>•</span>
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</time>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
          {content.content}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          ← Back to all posts
        </Link>
      </div>
    </article>
  )
}

