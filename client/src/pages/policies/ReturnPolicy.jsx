import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Return Policy</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-blue-700">Return Period</h2>
              <p className="text-gray-700 mb-2">
                We offer a 30-day return policy for all products purchased directly from BagsTopia. 
                This means you have 30 days from the date of delivery to request a return.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-blue-700">Return Conditions</h2>
              <p className="text-gray-700 mb-2">
                To be eligible for a return, your item must be:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>In the same condition that you received it</li>
                <li>Unworn, unused, and undamaged</li>
                <li>In the original packaging with all tags attached</li>
                <li>Accompanied by the original receipt or proof of purchase</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-blue-700">Non-Returnable Items</h2>
              <p className="text-gray-700 mb-2">
                The following items cannot be returned:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Customized or personalized products</li>
                <li>Sale items (unless defective)</li>
                <li>Items marked as "Final Sale" or "Non-Returnable"</li>
                <li>Items damaged due to customer misuse or negligence</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-blue-700">Return Process</h2>
              <p className="text-gray-700 mb-2">
                To initiate a return, please follow these steps:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                <li>Log in to your BagsTopia account and navigate to your order history</li>
                <li>Select the order containing the item(s) you wish to return</li>
                <li>Fill out the return form specifying the items and reason for return</li>
                <li>Print the prepaid return shipping label</li>
                <li>Pack the item(s) securely with all original packaging and tags</li>
                <li>Attach the return shipping label to the outside of the package</li>
                <li>Drop off the package at the specified carrier location</li>
              </ol>
              <p className="text-gray-700 mt-3">
                Alternatively, you can contact our customer service team at returns@bagstopia.com for assistance with your return.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-blue-700">Refunds</h2>
              <p className="text-gray-700 mb-2">
                Once we receive and inspect your return, we will send you an email to notify you that we have received your returned item. 
                We will also notify you of the approval or rejection of your refund.
              </p>
              <p className="text-gray-700 mb-2">
                If approved, your refund will be processed to the original method of payment within 5-7 business days. 
                Please note that depending on your credit card company, it may take an additional 2-10 business days for the refund to appear on your statement.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-blue-700">Exchanges</h2>
              <p className="text-gray-700 mb-2">
                If you need to exchange an item for a different size or color, please follow the same return process and place a new order for the desired item. 
                This ensures you get the item you want as quickly as possible, as exchanges may take longer to process than returns.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-blue-700">Damaged or Defective Items</h2>
              <p className="text-gray-700 mb-2">
                If you receive an item that is damaged or defective, please contact us within 48 hours of receipt at quality@bagstopia.com. 
                Please include photos of the damage or defect, your order number, and a description of the issue.
              </p>
              <p className="text-gray-700 mb-2">
                We will provide a prepaid return label and arrange for a replacement or refund, depending on your preference and product availability.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-blue-700">Return Shipping Costs</h2>
              <p className="text-gray-700 mb-2">
                For standard returns, the customer is responsible for return shipping costs. The original shipping fee is non-refundable.
              </p>
              <p className="text-gray-700 mb-2">
                For damaged or defective items, BagsTopia will cover the return shipping costs.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-blue-700">Policy Updates</h2>
              <p className="text-gray-700 mb-2">
                We reserve the right to modify this return policy at any time. Changes will be posted on this page with an updated revision date.
              </p>
              <p className="text-gray-700">
                Last Updated: May 1, 2023
              </p>
            </section>
          </div>
          
          <div className="mt-10 border-t pt-6">
            <p className="text-gray-600 text-center">
              If you have any questions about our return policy, please contact us at <a href="mailto:returns@bagstopia.com" className="text-blue-600 hover:underline">returns@bagstopia.com</a>.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ReturnPolicy; 