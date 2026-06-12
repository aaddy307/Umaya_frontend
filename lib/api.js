const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function fetchAPI(endpoint, options = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (res.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin/login';
      }
      throw new Error('Unauthorized');
    }

    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export const api = {
  get: (endpoint) => fetchAPI(endpoint, { method: 'GET' }),
  post: (endpoint, data) => fetchAPI(endpoint, { method: 'POST', body: JSON.stringify(data) }),
  put: (endpoint, data) => fetchAPI(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (endpoint) => fetchAPI(endpoint, { method: 'DELETE' }),
};

export const getImageUrl = (path) => {
  if (!path) return 'https://images.unsplash.com/photo-1621329109234-d7657d2f3846?w=500';
  if (path.startsWith('http')) return path;
  return `${API_URL}${path}`;
};

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatINR(amount) {
  return `₹${Number(amount).toLocaleString('en-IN')}`;
}