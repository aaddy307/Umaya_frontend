import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import Loader from '@/components/Loader';

async function getFeaturedProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?featured=true`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

const categories = ['crystals', 'bracelets', 'ritual-kits', 'energy-tools', 'decor'];

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-ivory via-ivory to-emerald/10 overflow-hidden py-16 md:py-24">
        {/* Ambient Decorative Background Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-emerald/5 rounded-full blur-[120px]" />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-terracotta/5 rounded-full blur-[100px] -translate-y-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              {/* Editorial Heading */}
              <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-emerald leading-[1.15] mb-6 animate-slide-up">
                Ancient <span className="text-gold italic font-playfair font-normal">Energy</span> <br />
                for the Modern Mind
              </h1>

              {/* Subheading text */}
              <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 max-w-xl leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
                Discover handcrafted crystals, sacred spiritual tools, and energy essentials curated to harmonize your environment, cultivate mindfulness, and elevate your daily wellness practice.
              </p>

              {/* Interactive CTA buttons */}
              <div className="flex flex-wrap gap-4 items-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <Link href="/shop" className="btn-primary text-base md:text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
                  Explore Collection
                </Link>
                <Link href="/about" className="inline-flex items-center gap-2 text-emerald hover:text-gold font-semibold text-base md:text-lg transition-colors group px-4 py-3">
                  Our Story
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Offset Image Gallery Column */}
            <div className="lg:col-span-5 mt-12 lg:mt-0 flex justify-center items-center w-full">
              
              {/* Gallery Wrapper */}
              <div className="relative w-[75%] sm:w-[65%] lg:w-[85%] aspect-[3/4]">
                
                {/* Main Image Container */}
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl z-10 group transform hover:scale-[1.01] transition-transform duration-500">
                  <Image
                    src="https://images.unsplash.com/photo-1567113463224-37cf03ba4577?w=800"
                    alt="Crystals and spiritual items on wood table"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald/20 to-transparent pointer-events-none" />
                </div>

                {/* Floating Overlapping Crystal Image */}
                <div className="absolute -bottom-6 -left-8 sm:-left-12 w-[45%] aspect-square rounded-2xl overflow-hidden border-4 border-ivory shadow-2xl z-20 hover:scale-105 transition-transform duration-300">
                  <Image
                    src="https://images.unsplash.com/photo-1521133573892-e44906baee46?w=400"
                    alt="Amethyst crystal cluster"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Subtle Decorative Golden Circle Outline */}
                <div className="absolute -top-8 -left-8 w-24 h-24 border border-gold/20 rounded-full z-0 pointer-events-none" />
                <div className="absolute -bottom-8 -right-8 w-32 h-32 border border-gold/10 rounded-full z-0 pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-emerald mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our most loved pieces, carefully selected for their quality and energy
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <Loader />
          )}

          <div className="text-center mt-10">
            <Link href="/shop" className="text-emerald font-medium hover:text-gold transition-colors inline-flex items-center gap-2 group">
              View All Products
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-emerald mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our curated collections, each designed for specific intentions and needs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-emerald text-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                About Umaya
              </h2>
              <p className="text-ivory/80 mb-4">
                Born from a passion for holistic wellness and ancient wisdom, Umaya brings 
                you ethically sourced crystals and spiritual tools that harmonize energy 
                and inspire mindfulness.
              </p>
              <p className="text-ivory/80 mb-8">
                Every piece in our collection is hand-selected for its quality, beauty, 
                and metaphysical properties. We believe in the power of intention and 
                the transformative energy of nature&apos;s gifts.
              </p>
              <Link href="/about" className="inline-block bg-gold text-emerald px-6 py-3 rounded-full font-medium hover:bg-ivory transition-colors">
                Learn More
              </Link>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1521133573892-e44906baee46?w=600"
                alt="Umaya crystals collection"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gradient-to-r from-gold/20 to-terracotta/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-emerald mb-4">
            Follow Our Journey
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Join our community @umaya.reset for daily inspiration, crystal tips, and exclusive offers
          </p>
          <a
            href="https://instagram.com/umaya.reset"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white px-8 py-4 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Follow @umaya.reset
          </a>
        </div>
      </section>
    </>
  );
}