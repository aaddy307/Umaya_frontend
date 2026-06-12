'use client';

import { useEffect, useState } from 'react';
import { api, formatDate } from '@/lib/api';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const data = await api.get('/api/contact');
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Messages</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {messages.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No messages yet.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {messages.map((message) => (
              <div key={message._id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{message.name}</h3>
                    <p className="text-sm text-gray-500">{message.email}</p>
                  </div>
                  <span className="text-sm text-gray-400">
                    {formatDate(message.createdAt)}
                  </span>
                </div>
                <p className="text-gray-700 mt-2">{message.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}