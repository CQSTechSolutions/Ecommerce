import dotenv from 'dotenv';
dotenv.config();

import Product from '../models/product.model.js';
import ctdb from './db.util.js';

const products = [
  // Backpacks
  {
    name: "Urban Explorer Backpack",
    price: 3999,
    description: "A versatile backpack perfect for daily commuters or weekend travelers. Features multiple compartments and a padded laptop sleeve.",
    image: "https://images.pexels.com/photos/1546003/pexels-photo-1546003.jpeg",
    category: "backpacks", 
    inStock: true,
    rating: 4.5,
  },
  {
    name: "Adventure Pro Hiking Backpack",
    price: 5899,
    description: "This durable 45L hiking backpack is designed for outdoor adventures with excellent weight distribution and waterproof material.",
    image: "https://th.bing.com/th/id/OIP.v2EbEp77w6ta-ZMepSWAfgHaHa?rs=1&pid=ImgDetMain",
    category: "backpacks",
    inStock: true,
    rating: 4.8,
  },
  {
    name: "Campus Student Backpack",
    price: 2499,
    description: "Designed for students, this backpack has ample space for books, a 15\" laptop compartment, and a USB charging port.",
    image: "https://images.pexels.com/photos/1262692/pexels-photo-1262692.jpeg",
    category: "backpacks",
    inStock: true,
    rating: 4.2,
  },
  {
    name: "Minimalist Daypack",
    price: 1899,
    description: "A simple, lightweight daypack perfect for daily use with a sleek modern design.",
    image: "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg",
    category: "backpacks",
    inStock: true,
    rating: 4.0,
  },
  
  // Handbags
  {
    name: "Classic Leather Tote",
    price: 6499,
    description: "A timeless full-grain leather tote bag with ample storage space and a classic design that never goes out of style.",
    image: "https://th.bing.com/th/id/OIP.smzcclyKPOL4t-ePB0E_ggHaHa?rs=1&pid=ImgDetMain",
    category: "handbags",
    inStock: true,
    rating: 4.7,
  },
  {
    name: "Elegance Evening Clutch",
    price: 3999,
    description: "A sophisticated clutch for formal occasions, featuring a satin finish and decorative clasp.",
    image: "https://th.bing.com/th/id/OIP.z6tHox5bAqzSyCx6i7Um6wHaEy?rs=1&pid=ImgDetMain",
    category: "handbags",
    inStock: true,
    rating: 4.3,
  },
  {
    name: "Everyday Crossbody Bag",
    price: 2799,
    description: "A practical and stylish crossbody bag with adjustable strap and multiple pockets for organization.",
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    category: "handbags",
    inStock: true,
    rating: 4.4,
  },
  {
    name: "Designer Shoulder Bag",
    price: 8999,
    description: "A premium designer shoulder bag made from high-quality materials with distinctive hardware and elegant design.",
    image: "https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg",
    category: "handbags",
    inStock: true,
    rating: 4.9,
  },
  
  // Travel Bags
  {
    name: "Weekend Getaway Duffel",
    price: 4299,
    description: "The perfect companion for short trips, this duffel bag offers spacious compartments and comfortable carrying options.",
    image: "https://imgix.bustle.com/zoe-report/2015/06/apc-basic-duffel-bag2.jpg?w=414&h=414&fit=crop&crop=faces&q=50&dpr=2",
    category: "travel",
    inStock: true,
    rating: 4.6,
  },
  {
    name: "Rolling Luggage Suitcase",
    price: 7999,
    description: "A durable hard-shell suitcase with smooth-rolling wheels, telescopic handle, and secure locking system.",
    image: "https://images.bonanzastatic.com/afu/images/1568/4463/39/__57.jpg",
    category: "travel",
    inStock: true,
    rating: 4.7,
  },
  {
    name: "Travel Organizer Set",
    price: 1499,
    description: "A set of packing cubes and toiletry bags to keep your belongings organized during travel.",
    image: "https://m.media-amazon.com/images/I/61Uc6PFOhlL._SL1500_.jpg",
    category: "travel",
    inStock: true,
    rating: 4.5,
  },
  {
    name: "Adventure Travel Backpack",
    price: 6499,
    description: "A convertible backpack designed for international travel with anti-theft features and expandable compartments.",
    image: "https://th.bing.com/th/id/OIP.xi4ZmkNC5-ypaEnP5teLHQHaEO?rs=1&pid=ImgDetMain",
    category: "travel",
    inStock: true,
    rating: 4.8,
  },
  
  // More Backpacks
  {
    name: "Tech Professional Backpack",
    price: 4599,
    description: "Designed for tech professionals with specialized compartments for laptops, tablets, and gadgets with built-in cable management.",
    image: "https://images.pexels.com/photos/1546003/pexels-photo-1546003.jpeg",
    category: "backpacks",
    inStock: true,
    rating: 4.6,
  },
  {
    name: "Compact City Backpack",
    price: 2999,
    description: "A stylish compact backpack perfect for urban environments with anti-theft features and water-resistant material.",
    image: "https://images.pexels.com/photos/934673/pexels-photo-934673.jpeg",
    category: "backpacks",
    inStock: true,
    rating: 4.3,
  },
  
  // More Handbags
  {
    name: "Structured Work Tote",
    price: 5299,
    description: "A professional tote bag with a structured design, laptop sleeve, and organization pockets ideal for work.",
    image: "https://th.bing.com/th/id/OIP.RImf1GlqWv-JlbeaoYnD0gHaId?rs=1&pid=ImgDetMain",
    category: "handbags",
    inStock: true,
    rating: 4.5,
  },
  {
    name: "Mini Fashion Purse",
    price: 2499,
    description: "A trendy mini purse with chain strap and stylish design, perfect for carrying essentials on a night out.",
    image: "https://th.bing.com/th/id/OIP.8DyQzFDbiSN-d9MMn8bz4AHaHa?rs=1&pid=ImgDetMain",
    category: "handbags",
    inStock: true,
    rating: 4.2,
  },
  
  // More Travel Bags
  {
    name: "Premium Garment Bag",
    price: 3999,
    description: "Keep your formal wear wrinkle-free with this premium garment bag featuring multiple pockets and durable construction.",
    image: "https://th.bing.com/th/id/OIP.DJW-SkLzmxY468cwU-whGgHaHa?rs=1&pid=ImgDetMain",
    category: "travel",
    inStock: true,
    rating: 4.4,
  },
  {
    name: "Lightweight Cabin Luggage",
    price: 5999,
    description: "A lightweight cabin-approved luggage with expandable capacity and smooth 360° wheels.",
    image: "https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg",
    category: "travel",
    inStock: true,
    rating: 4.6,
  },

  // Additional Backpacks
  {
    name: "Outdoor Sports Backpack",
    price: 3499,
    description: "Perfect for sports and outdoor activities with ventilated back panel and hydration bladder compatibility.",
    image: "https://images.pexels.com/photos/1242764/pexels-photo-1242764.jpeg",
    category: "backpacks",
    inStock: true,
    rating: 4.4,
  },
  {
    name: "Photography Backpack",
    price: 7999,
    description: "Specially designed for photographers with customizable compartments and quick-access camera storage.",
    image: "https://images.pexels.com/photos/2952834/pexels-photo-2952834.jpeg",
    category: "backpacks",
    inStock: true,
    rating: 4.7,
  },

  // Additional Handbags
  {
    name: "Vintage Leather Satchel",
    price: 4599,
    description: "A classic leather satchel with a vintage finish and brass hardware, perfect for a timeless look.",
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    category: "handbags",
    inStock: true,
    rating: 4.6,
  },
  {
    name: "Summer Beach Tote",
    price: 2999,
    description: "A spacious straw tote perfect for beach days with water-resistant lining and rope handles.",
    image: "https://images.pexels.com/photos/5706273/pexels-photo-5706273.jpeg",
    category: "handbags",
    inStock: true,
    rating: 4.3,
  },

  // Additional Travel Bags
  {
    name: "Business Travel Set",
    price: 12999,
    description: "A matching set of rolling suitcase and laptop bag designed for business travelers.",
    image: "https://th.bing.com/th/id/OIP.ufmo2rpmKn79dX5S9bzEugHaHa?rs=1&pid=ImgDetMain",
    category: "travel",
    inStock: true,
    rating: 4.8,
  }
];

const uploadProducts = async () => {
  try {
    // Connect to database
    await ctdb();
    
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert new products
    const result = await Product.insertMany(products);
    
    console.log(`Successfully uploaded ${result.length} products to the database`);
    process.exit(0);
  } catch (error) {
    console.error('Error uploading products:', error);
    process.exit(1);
  }
};

uploadProducts(); 