'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const router = useRouter()

    useEffect(() => {
        // Check our simple localStorage auth
        const authStatus = localStorage.getItem('isAdminLoggedIn')
        if (authStatus !== 'true') {
            router.push('/admin/login')
        } else {
            setIsAuthenticated(true)
        }
    }, [router])

    const handleLogout = () => {
        localStorage.removeItem('isAdminLoggedIn')
        router.push('/admin/login')
    }

    // Prevent flash of content before redirecting
    if (!isAuthenticated) return null

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center bg-gray-50">
                    <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="text-sm bg-white text-gray-700 px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    >
                        Logout
                    </button>
                </div>

                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Welcome, Joshua!</h2>
                    <p className="text-gray-600 mb-6">
                        This is your admin dashboard. Here you can manage your blog posts, view statistics, and update settings.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-blue-50 text-blue-800 p-6 rounded-lg border border-blue-100">
                            <h3 className="text-lg font-semibold mb-2">Total Posts</h3>
                            <p className="text-3xl font-bold">12</p>
                        </div>
                        <div className="bg-green-50 text-green-800 p-6 rounded-lg border border-green-100">
                            <h3 className="text-lg font-semibold mb-2">Total Views</h3>
                            <p className="text-3xl font-bold">4.2k</p>
                        </div>
                        <div className="bg-purple-50 text-purple-800 p-6 rounded-lg border border-purple-100">
                            <h3 className="text-lg font-semibold mb-2">Subscribers</h3>
                            <p className="text-3xl font-bold">145</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
