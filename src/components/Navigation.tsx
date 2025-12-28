import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            Cyber Blog
          </Link>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-blue-400 transition-colors">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

