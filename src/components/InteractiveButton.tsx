'use client'

import { useState } from 'react'

interface InteractiveButtonProps {
  label: string
  content: string
  variant?: 'primary' | 'danger' | 'success' | 'warning'
  icon?: string
}

export default function InteractiveButton({
  label,
  content,
  variant = 'primary',
  icon,
}: InteractiveButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    warning: 'bg-yellow-600 hover:bg-yellow-700 text-white',
  }

  return (
    <div className="my-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          ${variantStyles[variant]}
          px-6 py-3 rounded-lg font-semibold
          transition-all duration-200
          flex items-center gap-2
          shadow-md hover:shadow-lg
        `}
      >
        {icon && <span>{icon}</span>}
        {label}
        <span className="ml-2">{isExpanded ? '▼' : '▶'}</span>
      </button>
      
      {isExpanded && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-300 animate-fadeIn">
          <div className="prose max-w-none">
            {content.split('\n').map((line, index) => (
              <p key={index} className="text-gray-800 mb-2">
                {line}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

