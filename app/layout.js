import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Umaya - Elevate Your Energy',
  description: 'Discover ancient crystals and energy tools for modern wellness',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Toaster position="top-center" />
        <Navbar />
        <WhatsAppButton />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}