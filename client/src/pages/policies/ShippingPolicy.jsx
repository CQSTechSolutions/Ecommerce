import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Shipping Policy</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-blue-700">Processing Time</h2>
              <p className="text-gray-700 mb-2">
                All orders are processed within 1-2 business days after receiving your order confirmation email.
                Orders placed on weekends or holidays will be processed on the next business day.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-blue-700">Shipping Methods & Delivery Times</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Domestic Shipping (United States)</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li><span className="font-medium">Standard Shipping:</span> 3-5 business days (Free on orders over $100)</li>
                    <li><span className="font-medium">Express Shipping:</span> 2-3 business days ($15)</li>
                    <li><span className="font-medium">Next Day Shipping:</span> 1 business day ($25)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-1">International Shipping</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li><span className="font-medium">Standard International:</span> 7-14 business days ($20)</li>
                    <li><span className="font-medium">Express International:</span> 3-5 business days ($45)</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    Please note that delivery times for international orders may vary depending on the destination country's customs processing.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-blue-700">Shipping Restrictions</h2>
              <p className="text-gray-700 mb-2">
                We currently ship to most countries worldwide, with the exception of regions affected by trade restrictions or embargoes.
                If your country is not listed during checkout, unfortunately, we do not currently ship to your location.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-blue-700">Tracking Your Order</h2>
              <p className="text-gray-700 mb-2">
                Once your order ships, you will receive a shipping confirmation email with a tracking number.
                You can use this number to track your order through the carrier's website or by logging into your account on our website.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-blue-700">Customs & Import Duties</h2>
              <p className="text-gray-700 mb-2">
                For international orders, please note that you may be responsible for import duties, taxes, and customs clearance fees imposed by your country.
                These fees are not included in the purchase price or shipping costs and will be collected by the delivery carrier or customs office.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-blue-700">Missing or Delayed Packages</h2>
              <p className="text-gray-700 mb-2">
                If your package has not arrived within the estimated delivery timeframe, please contact our customer service team at support@bagstopia.com.
                For domestic orders, we will investigate packages that have not been delivered within 7 days after the estimated delivery date.
                For international orders, we will investigate packages that have not been delivered within 30 days of shipment.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-blue-700">Policy Updates</h2>
              <p className="text-gray-700 mb-2">
                We reserve the right to modify this shipping policy at any time. Changes will be posted on this page with an updated revision date.
              </p>
              <p className="text-gray-700">
                Last Updated: May 1, 2023
              </p>
            </section>
          </div>
          
          <div className="mt-10 border-t pt-6">
            <p className="text-gray-600 text-center">
              If you have any questions about our shipping policy, please contact us at <a href="mailto:support@bagstopia.com" className="text-blue-600 hover:underline">support@bagstopia.com</a>.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ShippingPolicy; 