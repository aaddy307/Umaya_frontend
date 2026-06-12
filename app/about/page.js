import Image from 'next/image';

const values = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Authenticity',
    description: 'Every crystal is hand-selected and ethically sourced, ensuring genuine quality and positive energy.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Sustainability',
    description: 'We partner with eco-conscious suppliers and use sustainable packaging for a greener planet.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: 'Intention',
    description: 'Each piece is chosen with intention, clearing and charging before it reaches your hands.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Timelessness',
    description: 'Our pieces blend ancient wisdom with modern aesthetics, creating tools for everyday rituals.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative bg-emerald text-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our Story
            </h1>
            <p className="text-xl text-ivory/80">
              Where ancient wisdom meets modern wellness. Discover the journey of Umaya 
              and the passion behind our curated crystal collection.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
               <Image
                src="https://images.unsplash.com/photo-1546608135-e5de34abc308?w=600"
                alt="Amethyst crystals"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-playfair text-3xl font-bold text-emerald mb-6">
                The Birth of Umaya
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Umaya was born from a deeply personal journey into the world of crystal healing 
                and spiritual wellness. What started as a personal collection quickly grew into 
                a mission to share the transformative power of these ancient stones with others.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our founder, after experiencing the profound effects of crystal energy firsthand, 
                felt called to create a space where others could access authentic, 
                high-quality crystals and spiritual tools without the confusion of an 
                overwhelming market.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, Umaya stands as a trusted destination for those seeking to elevate their 
                energy, enhance their meditation practice, or simply bring more natural beauty 
                and positive vibes into their lives.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="font-playfair text-3xl font-bold text-emerald mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We believe that everyone deserves access to authentic, ethically-sourced crystals 
                and spiritual tools. Our mission is to demystify crystal healing and make it 
                approachable for everyone—from seasoned practitioners to curious newcomers.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Every piece in our collection is hand-selected, cleansed, and charged with 
                positive intentions before finding its way to you. We are committed to 
                sustainability, authenticity, and spreading the joy of energetic wellness.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden order-1 md:order-2">
              <Image
                src="https://images.unsplash.com/photo-1521133573892-e44906baee46?w=600"
                alt="Crystal ritual setup"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-emerald mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Umaya
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-ivory rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-emerald/10 rounded-full flex items-center justify-center text-emerald">
                  {value.icon}
                </div>
                <h3 className="font-playfair text-xl font-semibold text-emerald mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gradient-to-r from-emerald to-emerald/90 text-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            Ready to Elevate Your Energy?
          </h2>
          <p className="text-lg text-ivory/80 mb-8">
            Explore our collection of hand-picked crystals and spiritual tools, 
            each chosen to bring positive energy into your life.
          </p>
          <a
            href="/shop"
            className="inline-block bg-gold text-emerald px-8 py-4 rounded-full font-medium hover:bg-ivory transition-colors"
          >
            Shop Collection
          </a>
        </div>
      </section>
    </>
  );
}