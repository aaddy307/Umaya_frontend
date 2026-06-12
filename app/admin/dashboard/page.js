'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ totalProducts: 0, totalMessages: 0, featuredProducts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, messages] = await Promise.all([
          api.get('/api/products'),
          api.get('/api/contact'),
        ]);

        setStats({
          totalProducts: products.length,
          totalMessages: messages.length,
          featuredProducts: products.filter((p) => p.featured).length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Products',
      value: stats.totalProducts,
      href: '/admin/products',
      color: 'bg-blue-500',
    },
    {
      label: 'Total Messages',
      value: stats.totalMessages,
      href: '/admin/messages',
      color: 'bg-green-500',
    },
    {
      label: 'Featured Products',
      value: stats.featuredProducts,
      href: '/admin/products?filter=featured',
      color: 'bg-gold',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center`}>
                <span className="text-white text-xl font-bold">{stat.value}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/products"
            className="px-4 py-2 bg-emerald text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Manage Products
          </Link>
          <Link
            href="/admin/messages"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            View Messages
          </Link>
          <Link
            href="/"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            View Store
          </Link>
        </div>
      </div>
    </div>
  );
}