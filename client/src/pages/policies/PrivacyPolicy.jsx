import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
          
          <div className="space-y-6">
            <section>
              <p className="text-gray-700 mb-4">
                At BagsTopia, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-blue-700">Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Personal Information</h3>
                  <p className="text-gray-700 mb-2">
                    We may collect personally identifiable information such as:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Mailing address</li>
                    <li>Phone number</li>
                    <li>Credit card or payment information (through our secure payment processor)</li>
                    <li>Account credentials (if you create an account)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-1">Non-Personal Information</h3>
                  <p className="text-gray-700 mb-2">
                    We may also collect non-personal information about you, including:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Browser type</li>
                    <li>IP address</li>
                    <li>Operating system</li>
                    <li>Pages visited and time spent on our website</li>
                    <li>Products viewed or searched for</li>
                    <li>Referring website addresses</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-blue-700">How We Use Your Information</h2>
              <p className="text-gray-700 mb-2">
                We may use the information we collect about you for purposes including:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Processing and fulfilling your orders</li>
                <li>Communicating with you about your order, account, or customer service needs</li>
                <li>Sending you promotional emails about new products, special offers, or other information we think you may find interesting (if you opt in)</li>
                <li>Improving our website and product offerings</li>
                <li>Customizing your experience on our website</li>
                <li>Administering contests, promotions, or surveys</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-blue-700">Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-2">
                We use cookies and similar tracking technologies to track activity on our website and store certain information. 
                Cookies are files with a small amount of data which may include an anonymous unique identifier.
              </p>
              <p className="text-gray-700 mb-2">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-blue-700">Third-Party Disclosure</h2>
              <p className="text-gray-700 mb-2">
                We may share your personal information with:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Service providers who help us operate our business (payment processors, shipping companies, etc.)</li>
                <li>Marketing partners (with your consent)</li>
                <li>Legal authorities when required by law or to protect our rights</li>
                <li>Business partners in the event of a corporate sale, merger, reorganization, or similar event</li>
              </ul>
              <p className="text-gray-700 mt-3">
                We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent, except as described above.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-blue-700">Data Security</h2>
              <p className="text-gray-700 mb-2">
                We implement a variety of security measures to maintain the safety of your personal information. 
                Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights.
              </p>
              <p className="text-gray-700 mb-2">
                All payment transactions are processed through a secure gateway provider and payment information is not stored on our servers.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-blue-700">Children's Privacy</h2>
              <p className="text-gray-700 mb-2">
                Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. 
                If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-blue-700">Your Rights</h2>
              <p className="text-gray-700 mb-2">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>The right to access personal information we hold about you</li>
                <li>The right to request correction of inaccurate information</li>
                <li>The right to request deletion of your information</li>
                <li>The right to withdraw consent for certain processing activities</li>
                <li>The right to request restriction of processing</li>
                <li>The right to data portability</li>
              </ul>
              <p className="text-gray-700 mt-3">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-blue-700">Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-2">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
              <p className="text-gray-700 mb-2">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
              <p className="text-gray-700">
                Last Updated: May 1, 2023
              </p>
            </section>
          </div>
          
          <div className="mt-10 border-t pt-6">
            <p className="text-gray-600 text-center">
              If you have any questions about our Privacy Policy, please contact us at <a href="mailto:privacy@bagstopia.com" className="text-blue-600 hover:underline">privacy@bagstopia.com</a>.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy; 