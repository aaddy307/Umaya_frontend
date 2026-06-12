import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in ${product.name} (₹${product.price})`
  );

  return (
    <div className="card flex flex-col hover:-translate-y-1 transition-transform duration-300">
      <Link href={`/product/${product._id}`} className="relative aspect-square overflow-hidden">
        {product.images && product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
        {!product.stock && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Out of Stock
          </span>
        )}
        {product.featured && (
          <span className="absolute top-2 right-2 bg-gold text-white text-xs px-2 py-1 rounded-full">
            Featured
          </span>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/product/${product._id}`}>
          <h3 className="font-playfair text-lg font-semibold text-emerald hover:text-gold transition-colors mb-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-gold font-bold text-lg mb-2">₹{product.price.toLocaleString('en-IN')}</p>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>
        <div className="flex gap-2 mt-auto">
          <Link
            href={`/product/${product._id}`}
            className="flex-1 text-center bg-emerald text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition-colors"
          >
            View Details
          </Link>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition-colors"
          >
            Enquire
          </a>
        </div>
      </div>
    </div>
  );
}