import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useStore from "../store/useStore";
import { createOrder } from "../utils/orderApi";

const Payment = () => {
	const { cart, clearCart, checkoutData, clearCheckoutData } = useStore();
	const navigate = useNavigate();

	const [paymentMethod, setPaymentMethod] = useState("creditCard");
	const [paymentInfo, setPaymentInfo] = useState({
		cardName: "",
		cardNumber: "",
		expiryMonth: "",
		expiryYear: "",
		cvv: "",
	});
	const [isProcessing, setIsProcessing] = useState(false);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		// Redirect to checkout if no checkout data exists
		if (!checkoutData) {
			navigate('/checkout');
		}
	}, [checkoutData, navigate]);

	// Get totals from checkout data if available, otherwise calculate
	const subtotal = checkoutData?.subtotal || 
		cart.reduce((total, item) => total + item.price * item.quantity, 0);
	const shipping = checkoutData?.shippingCost || 
		(subtotal > 5000 ? 0 : 300); // Free shipping for orders over ₹5000
	const tax = checkoutData?.tax || (subtotal * 0.18); // 18% GST
	const total = checkoutData?.total || (subtotal + shipping + tax);

	// List of years for expiry date
	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

	const handlePaymentChange = (e) => {
		const { name, value } = e.target;
		setPaymentInfo((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear error for this field if exists
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: null,
			}));
		}
	};

	const validateForm = () => {
		const newErrors = {};

		// Card name validation
		if (!paymentInfo.cardName.trim()) {
			newErrors.cardName = "Name on card is required";
		}

		// Card number validation (simple 16 digit check)
		const cardNumberRegex = /^[0-9]{16}$/;
		if (!cardNumberRegex.test(paymentInfo.cardNumber.replace(/\s/g, ""))) {
			newErrors.cardNumber = "Please enter a valid 16-digit card number";
		}

		// Expiry date validation
		if (!paymentInfo.expiryMonth) {
			newErrors.expiryMonth = "Month is required";
		}

		if (!paymentInfo.expiryYear) {
			newErrors.expiryYear = "Year is required";
		}

		// CVV validation (3 or 4 digits)
		const cvvRegex = /^[0-9]{3,4}$/;
		if (!cvvRegex.test(paymentInfo.cvv)) {
			newErrors.cvv = "Please enter a valid 3 or 4 digit CVV";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const formatCardNumber = (value) => {
		const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
		const matches = v.match(/\d{4,16}/g);
		const match = (matches && matches[0]) || "";
		const parts = [];

		for (let i = 0, len = match.length; i < len; i += 4) {
			parts.push(match.substring(i, i + 4));
		}

		if (parts.length) {
			return parts.join(" ");
		} else {
			return value;
		}
	};

	const handleCardNumberChange = (e) => {
		const formattedValue = formatCardNumber(e.target.value);
		setPaymentInfo((prev) => ({
			...prev,
			cardNumber: formattedValue,
		}));

		if (errors.cardNumber) {
			setErrors((prev) => ({
				...prev,
				cardNumber: null,
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm() || !checkoutData) {
			return;
		}

		setIsProcessing(true);

		try {
			// Prepare order data
			const orderData = {
				orderItems: checkoutData.orderItems,
				shippingAddress: checkoutData.shippingAddress,
				paymentMethod: paymentMethod,
				subtotal: checkoutData.subtotal,
				tax: checkoutData.tax,
				shipping: checkoutData.shippingCost,
				total: checkoutData.total
			};

			// Create order in database
			const response = await createOrder(orderData);

			if (response.success) {
				// Order success - clear cart and checkout data but after navigation
				// Store order info for redirect
				const orderInfo = {
					orderId: response.data._id,
					orderNumber: response.data._id.substring(response.data._id.length - 8),
					orderDate: response.data.createdAt,
					total: response.data.total,
				};
				
				// Navigate to confirmation page first
				navigate("/order-confirmation", { 
					state: orderInfo,
					replace: true // Replace current URL in history to prevent back navigation
				});
				
				// Then clear cart and checkout data after navigation is initiated
				setTimeout(() => {
					clearCart();
					clearCheckoutData();
				}, 100);
			} else {
				// Handle error
				setIsProcessing(false);
				console.error("Failed to create order:", response.error);
				alert("There was a problem processing your payment. Please try again.");
			}
		} catch (error) {
			setIsProcessing(false);
			console.error("Error during payment:", error);
			alert("There was a problem processing your payment. Please try again.");
		}
	};

	// If cart is empty or no checkout data, redirect to checkout
	if (cart.length === 0 || !checkoutData) {
		return (
			<div className="min-h-screen flex flex-col">
				<Navbar />
				<div className="container mx-auto px-4 py-16 flex-grow text-center">
					<h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
					<p className="text-gray-600 mb-8">
						You need to add items to your cart before proceeding to payment.
					</p>
					<Link
						to="/"
						className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
					>
						Continue Shopping
					</Link>
				</div>
				<Footer />
			</div>
		);
	}

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />

			<div className="container mx-auto px-4 py-8 flex-grow">
				<div className="max-w-6xl mx-auto">
					<h1 className="text-3xl font-bold mb-8">Payment</h1>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Payment Form */}
						<div className="lg:col-span-2">
							<form onSubmit={handleSubmit}>
								{/* Payment Method Selection */}
								<div className="bg-white rounded-lg shadow-md p-6 mb-8">
									<h2 className="text-xl font-semibold mb-4">Payment Method</h2>

									<div className="space-y-4">
										<label className="flex items-center">
											<input
												type="radio"
												name="paymentMethod"
												value="creditCard"
												checked={paymentMethod === "creditCard"}
												onChange={() => setPaymentMethod("creditCard")}
												className="h-5 w-5 text-blue-600"
											/>
											<span className="ml-2 font-medium">
												Credit Card / Debit Card
											</span>
										</label>

										<label className="flex items-center opacity-50 cursor-not-allowed">
											<input
												type="radio"
												name="paymentMethod"
												value="paypal"
												disabled
												className="h-5 w-5 text-blue-600"
											/>
											<span className="ml-2 font-medium">
												PayPal (Coming Soon)
											</span>
										</label>

										<label className="flex items-center opacity-50 cursor-not-allowed">
											<input
												type="radio"
												name="paymentMethod"
												value="applePay"
												disabled
												className="h-5 w-5 text-blue-600"
											/>
											<span className="ml-2 font-medium">
												Apple Pay (Coming Soon)
											</span>
										</label>
									</div>
								</div>

								{/* Credit Card Form */}
								{paymentMethod === "creditCard" && (
									<div className="bg-white rounded-lg shadow-md p-6 mb-8">
										<h2 className="text-xl font-semibold mb-4">
											Credit Card Information
										</h2>

										<div className="mb-4">
											<label
												htmlFor="cardName"
												className="block text-gray-700 mb-2"
											>
												Name on Card*
											</label>
											<input
												type="text"
												id="cardName"
												name="cardName"
												value={paymentInfo.cardName}
												onChange={handlePaymentChange}
												className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cardName ? "border-red-500" : "border-gray-300"}`}
											/>
											{errors.cardName && (
												<p className="text-red-500 text-sm mt-1">
													{errors.cardName}
												</p>
											)}
										</div>

										<div className="mb-4">
											<label
												htmlFor="cardNumber"
												className="block text-gray-700 mb-2"
											>
												Card Number*
											</label>
											<input
												type="text"
												id="cardNumber"
												name="cardNumber"
												value={paymentInfo.cardNumber}
												onChange={handleCardNumberChange}
												placeholder="XXXX XXXX XXXX XXXX"
												maxLength="19"
												className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cardNumber ? "border-red-500" : "border-gray-300"}`}
											/>
											{errors.cardNumber && (
												<p className="text-red-500 text-sm mt-1">
													{errors.cardNumber}
												</p>
											)}
										</div>

										<div className="grid grid-cols-2 gap-4 mb-4">
											<div>
												<label
													htmlFor="expiryDate"
													className="block text-gray-700 mb-2"
												>
													Expiry Date*
												</label>
												<div className="grid grid-cols-2 gap-2">
													<select
														id="expiryMonth"
														name="expiryMonth"
														value={paymentInfo.expiryMonth}
														onChange={handlePaymentChange}
														className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.expiryMonth ? "border-red-500" : "border-gray-300"}`}
													>
														<option value="">Month</option>
														{Array.from({ length: 12 }, (_, i) => {
															const month = i + 1;
															return (
																<option key={month} value={month.toString().padStart(2, "0")}>
																	{month.toString().padStart(2, "0")}
																</option>
															);
														})}
													</select>
													<select
														id="expiryYear"
														name="expiryYear"
														value={paymentInfo.expiryYear}
														onChange={handlePaymentChange}
														className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.expiryYear ? "border-red-500" : "border-gray-300"}`}
													>
														<option value="">Year</option>
														{years.map((year) => (
															<option key={year} value={year}>
																{year}
															</option>
														))}
													</select>
												</div>
												{(errors.expiryMonth || errors.expiryYear) && (
													<p className="text-red-500 text-sm mt-1">
														Please select expiry date
													</p>
												)}
											</div>
											<div>
												<label htmlFor="cvv" className="block text-gray-700 mb-2">
													CVV*
												</label>
												<input
													type="text"
													id="cvv"
													name="cvv"
													value={paymentInfo.cvv}
													onChange={handlePaymentChange}
													maxLength="4"
													className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cvv ? "border-red-500" : "border-gray-300"}`}
												/>
												{errors.cvv && (
													<p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
												)}
											</div>
										</div>
									</div>
								)}

								{/* Shipping Information Summary */}
								<div className="bg-white rounded-lg shadow-md p-6 mb-8">
									<h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
									<div className="text-gray-700">
										<p className="mb-1">{checkoutData?.shippingAddress?.street}</p>
										<p className="mb-1">
											{checkoutData?.shippingAddress?.city}, {checkoutData?.shippingAddress?.state} {checkoutData?.shippingAddress?.zipCode}
										</p>
										<p>{checkoutData?.shippingAddress?.country}</p>
										{checkoutData?.shippingAddress?.phone && (
											<p className="mt-2">Phone: {checkoutData.shippingAddress.phone}</p>
										)}
									</div>
								</div>

								<div className="lg:hidden mb-8">
									<div className="bg-white rounded-lg shadow-md p-6">
										<h2 className="text-xl font-semibold mb-4">Order Summary</h2>
										<div className="mb-4">
											<div className="flex justify-between mb-2">
												<span>Subtotal</span>
												<span>₹{subtotal.toFixed(2)}</span>
											</div>
											<div className="flex justify-between mb-2">
												<span>Shipping</span>
												<span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
											</div>
											<div className="flex justify-between mb-2">
												<span>Tax (18%)</span>
												<span>₹{tax.toFixed(2)}</span>
											</div>
											<div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
												<span>Total</span>
												<span>₹{total.toFixed(2)}</span>
											</div>
										</div>
									</div>
								</div>

								<div className="pb-4">
									<button
										type="submit"
										disabled={isProcessing}
										className={`w-full bg-blue-600 text-white py-3 rounded-md font-medium ${isProcessing ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"} transition-colors`}
									>
										{isProcessing ? (
											<div className="flex items-center justify-center">
												<span className="mr-2">Processing...</span>
												<svg
													className="animate-spin h-5 w-5 text-white"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
												>
													<circle
														className="opacity-25"
														cx="12"
														cy="12"
														r="10"
														stroke="currentColor"
														strokeWidth="4"
													></circle>
													<path
														className="opacity-75"
														fill="currentColor"
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
													></path>
												</svg>
											</div>
										) : (
											`Pay ₹${total.toFixed(2)}`
										)}
									</button>
								</div>
							</form>
						</div>

						{/* Order Summary */}
						<div className="hidden lg:block">
							<div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
								<h2 className="text-xl font-semibold mb-4">Order Summary</h2>
								<div className="divide-y">
									{checkoutData?.orderItems?.map((item) => (
										<div key={item.product} className="py-3 flex">
											<div className="h-16 w-16 rounded overflow-hidden mr-4">
												<img
													src={item.image}
													alt={item.name}
													className="h-full w-full object-cover"
												/>
											</div>
											<div className="flex-grow">
												<h3 className="text-sm font-medium">{item.name}</h3>
												<p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
												<p className="text-gray-900 mt-1">
													₹{(item.price * item.quantity).toFixed(2)}
												</p>
											</div>
										</div>
									))}
								</div>

								<div className="border-t mt-4 pt-4 space-y-2">
									<div className="flex justify-between">
										<span>Subtotal</span>
										<span>₹{subtotal.toFixed(2)}</span>
									</div>
									<div className="flex justify-between">
										<span>Shipping</span>
										<span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
									</div>
									<div className="flex justify-between">
										<span>Tax (18%)</span>
										<span>₹{tax.toFixed(2)}</span>
									</div>
									<div className="border-t pt-2 mt-2">
										<div className="flex justify-between font-bold">
											<span>Total</span>
											<span>₹{total.toFixed(2)}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default Payment;