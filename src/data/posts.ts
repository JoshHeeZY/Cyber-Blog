export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  author: string
  readTime: string
}

export const posts: BlogPost[] = [
  {
    slug: 'deauth-attack-tutorial',
    title: 'Understanding Deauthentication Attacks',
    excerpt: 'Learn how deauthentication attacks work and how to protect your network from them.',
    date: '2024-01-15',
    category: 'Wireless Security',
    author: 'Cyber Researcher',
    readTime: '5 min read',
  },
  {
    slug: 'network-scanning-basics',
    title: 'Network Scanning Fundamentals',
    excerpt: 'A comprehensive guide to network scanning techniques and tools for security professionals.',
    date: '2024-01-10',
    category: 'Network Security',
    author: 'Cyber Researcher',
    readTime: '8 min read',
  },
  {
    slug: 'password-security-best-practices',
    title: 'Password Security Best Practices',
    excerpt: 'Essential tips for creating and managing secure passwords in 2024.',
    date: '2024-01-05',
    category: 'Security Basics',
    author: 'Cyber Researcher',
    readTime: '6 min read',
  },
]

