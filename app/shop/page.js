'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/Loader';

const categories = [
  { value: '', label: 'All Products' },
  { value: 'crystals', label: 'Crystals' },
  { value: 'bracelets', label: 'Bracelets' },
  { value: 'ritual-kits', label: 'Ritual Kits' },
  { value: 'energy-tools', label: 'Energy Tools' },
  { value: 'decor', label: 'Decor' },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const category = searchParams.get('category') || '';
    setSelectedCategory(category);
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/products?`;
        const params = new URLSearchParams();
        if (selectedCategory) params.append('category', selectedCategory);
        if (searchQuery) params.append('search', searchQuery);
        url += params.toString();

        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchProducts, 300);
    return () => clearTimeout(debounce);
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <div className="bg-emerald text-ivory py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-2">Shop</h1>
          <p className="text-ivory/80">Discover our collection of crystals and spiritual tools</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex flex-wrap gap-2 md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-emerald text-white'
                    : 'bg-white text-emerald hover:bg-emerald/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex-1 md:max-w-xs">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="font-playfair text-xl font-semibold text-emerald mb-2">No Products Found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSelectedCategory('');
                setSearchQuery('');
              }}
              className="text-emerald font-medium hover:text-gold transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8"><ProductCardSkeleton /></div>}>
      <ShopContent />
    </Suspense>
  );
}