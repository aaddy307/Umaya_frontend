'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import Loader from '@/components/Loader';

async function getProduct(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getRelatedProducts(category, currentId) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?category=${category}`,
      { cache: 'no-store' }
    );
    if (!res.ok) return [];
    const products = await res.json();
    return products.filter((p) => p._id !== currentId).slice(0, 4);
  } catch {
    return [];
  }
}

const benefitIcons = {
  default: (
    <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
};

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const productData = await getProduct(params.id);
      setProduct(productData);

      if (productData) {
        const related = await getRelatedProducts(productData.category, params.id);
        setRelatedProducts(related);
      }
      setLoading(false);
    };

    loadProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Loader />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="font-playfair text-2xl font-bold text-emerald mb-4">Product Not Found</h1>
        <Link href="/shop" className="btn-primary inline-block">
          Back to Shop
        </Link>
      </div>
    );
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in ${product.name} (₹${product.price})`
  );
  const images = product.images && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1621329109234-d7657d2f3846?w=500'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
        <Link href="/" className="hover:text-emerald">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-emerald">Shop</Link>
        <span>/</span>
        <span className="text-emerald">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src={images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {!product.stock && (
              <span className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                Out of Stock
              </span>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                    selectedImage === index ? 'border-emerald' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <span className="inline-block text-gold text-sm font-medium uppercase tracking-wider mb-2">
            {product.category.replace('-', ' ')}
          </span>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-emerald mb-4">
            {product.name}
          </h1>
          <p className="text-3xl font-bold text-gold mb-6">
            ₹{product.price.toLocaleString('en-IN')}
          </p>

          <div className="mb-6">
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
              product.stock
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              <span className={`w-2 h-2 rounded-full ${product.stock ? 'bg-green-500' : 'bg-red-500'}`} />
              {product.stock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          {product.benefits && product.benefits.length > 0 && (
            <div className="mb-8">
              <h3 className="font-playfair text-xl font-semibold text-emerald mb-4">
                Benefits
              </h3>
              <ul className="space-y-3">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    {benefitIcons.default}
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-4 rounded-full font-medium hover:bg-green-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Enquire via WhatsApp
            </a>
            <Link
              href="/shop"
              className="flex-1 text-center bg-emerald text-white px-6 py-4 rounded-full font-medium hover:bg-opacity-90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section>
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-emerald mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}