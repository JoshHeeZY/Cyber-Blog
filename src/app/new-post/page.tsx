'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function NewPost() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    author: 'Cyber Researcher',
  })
  const [screenshots, setScreenshots] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // For now, just log the data
    // In a real app, you'd save this to a database or file system
    console.log('New post:', formData)
    alert('Post created! (This is a demo - in production, this would save to your database)')
    router.push('/')
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setScreenshots((prev) => [...prev, reader.result as string])
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const removeScreenshot = (index: number) => {
    setScreenshots((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Medium-style Header */}
      <div className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back
            </button>
            <h2 className="text-lg font-semibold text-gray-900">New Story</h2>
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
            >
              Publish
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Medium Style */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title Input - Medium Style */}
          <div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full text-5xl font-bold text-gray-900 placeholder-gray-400 border-none outline-none focus:outline-none"
              required
            />
          </div>

          {/* Excerpt/Subtitle */}
          <div>
            <input
              type="text"
              name="excerpt"
              placeholder="Subtitle (optional)"
              value={formData.excerpt}
              onChange={handleChange}
              className="w-full text-2xl text-gray-600 placeholder-gray-400 border-none outline-none focus:outline-none"
            />
          </div>

          {/* Category and Author */}
          <div className="flex gap-4 items-center">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select Category</option>
              <option value="Wireless Security">Wireless Security</option>
              <option value="Network Security">Network Security</option>
              <option value="Security Basics">Security Basics</option>
              <option value="Penetration Testing">Penetration Testing</option>
              <option value="Ethical Hacking">Ethical Hacking</option>
            </select>
            <span className="text-gray-500">by {formData.author}</span>
          </div>

          {/* Screenshot Upload Section */}
          <div className="mt-8">
            <label className="block mb-4">
              <span className="text-lg font-semibold text-gray-900 mb-2 block">
                Add Screenshots
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleScreenshotUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
              />
            </label>

            {/* Display Uploaded Screenshots */}
            {screenshots.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {screenshots.map((screenshot, index) => (
                  <div key={index} className="relative group">
                    <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
                      <Image
                        src={screenshot}
                        alt={`Screenshot ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeScreenshot(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Content Editor */}
          <div className="mt-12">
            <textarea
              name="content"
              placeholder="Write your content here..."
              value={formData.content}
              onChange={handleChange}
              rows={20}
              className="w-full text-lg text-gray-700 placeholder-gray-400 border-none outline-none focus:outline-none resize-none leading-relaxed"
              required
            />
          </div>

          {/* Helper Text */}
          <div className="text-sm text-gray-500 pt-8 border-t border-gray-200">
            <p>💡 Tip: Use markdown-like formatting for better readability</p>
          </div>
        </form>
      </div>
    </div>
  )
}

