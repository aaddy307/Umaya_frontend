import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <WhatsAppButton />
      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="text-center">
          <h1 className="font-playfair text-9xl font-bold text-emerald mb-4 animate-pulse">
            404
          </h1>
          <h2 className="text-2xl font-playfair font-semibold text-emerald mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The crystal you&apos;re looking for has been misplaced. 
            Let&apos;s get you back on your spiritual journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary">
              Back to Home
            </Link>
            <Link href="/shop" className="btn-secondary">
              Browse Shop
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}