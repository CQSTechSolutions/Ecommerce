import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">About BagsTopia</h1>
          
          {/* Company Story */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-blue-700">Our Story</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 mb-4">
                  Founded in 2020, BagsTopia started with a simple mission: to provide high-quality, 
                  stylish bags that combine functionality, durability, and aesthetic appeal.
                </p>
                <p className="text-gray-700 mb-4">
                  Our journey began when our founder, Sarah Johnson, found herself frustrated with 
                  the lack of bags that could transition seamlessly from work to weekend adventures. 
                  She envisioned creating a brand that offered versatile, well-crafted bags for every 
                  aspect of modern life.
                </p>
                <p className="text-gray-700">
                  Today, BagsTopia has grown into a trusted name in the bag industry, known for our 
                  commitment to quality materials, thoughtful design, and excellent customer service.
                </p>
              </div>
              <div>
                <img 
                  src="https://th.bing.com/th/id/OIP.P9fDNB3v1RtJ37wrM76S2gHaHa?w=180&h=180&c=7&r=0&o=5&pid=1.7" 
                  alt="BagsTopia founder" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </section>
          
          {/* Mission & Values */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-blue-700">Our Mission & Values</h2>
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3">Mission</h3>
                <p className="text-gray-700">
                  To create high-quality, functional bags that enhance our customers' lives through 
                  thoughtful design, sustainable practices, and exceptional value.
                </p>
              </div>
              
              <h3 className="text-xl font-semibold mb-4">Core Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Quality First</h4>
                    <p className="text-gray-600 text-sm">We never compromise on the quality of our materials or craftsmanship.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Customer Focus</h4>
                    <p className="text-gray-600 text-sm">We listen to our customers and design products that meet their needs.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Sustainability</h4>
                    <p className="text-gray-600 text-sm">We're committed to reducing our environmental impact and promoting ethical practices.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Innovation</h4>
                    <p className="text-gray-600 text-sm">We continuously seek new ways to improve our products and processes.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA */}
          <section>
            <div className="bg-blue-700 text-white p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Join the BagsTopia Family</h2>
              <p className="mb-6 max-w-2xl mx-auto">
                Experience the perfect blend of style, function, and quality with our premium bags.
              </p>
              <a
                href="/category/backpacks"
                className="inline-block bg-white text-blue-700 px-6 py-3 rounded-md font-semibold hover:bg-blue-50 transition-colors"
              >
                Shop Now
              </a>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About; 