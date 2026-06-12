import Link from 'next/link';
import Image from 'next/image';

const categoryImages = {
  crystals: 'https://images.unsplash.com/photo-1562162135-9f64f33e623b?w=500',
  bracelets: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500',
  'ritual-kits': 'https://images.unsplash.com/photo-1597717503010-ee19fef2db91?w=500',
  'energy-tools': 'https://images.unsplash.com/photo-1772911421293-362c64541490?w=500',
  decor: 'https://images.unsplash.com/photo-1623241923490-5b2fd532828f?w=500',
};

const categoryIcons = {
  crystals: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  ),
  bracelets: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.5 0-3 1-3 3v2c0 1.5 1 3 3 3s3-1 3-3v-2c0-2-1.5-3-3-3z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13c-2.5 0-5 1.5-5 4v2c0 1.5 1 3 3 3h10c2 0 3-1.5 3-3v-2c0-2.5-2.5-4-5-4" />
    </svg>
  ),
  'ritual-kits': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  'energy-tools': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  decor: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
};

export default function CategoryCard({ category }) {
  const label = category.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  const imageUrl = categoryImages[category] || 'https://images.unsplash.com/photo-1621329109234-d7657d2f3846?w=500';

  return (
    <Link href={`/shop?category=${category}`} className="block group">
      <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
        <Image
          src={imageUrl}
          alt={label}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald/80 via-emerald/40 to-transparent transition-opacity group-hover:opacity-90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
          <div className="mb-2 text-gold transition-transform duration-300 group-hover:scale-110">
            {categoryIcons[category]}
          </div>
          <h3 className="font-playfair text-xl font-semibold text-center">{label}</h3>
        </div>
      </div>
    </Link>
  );
}