/**
 * Filter products by search term
 * @param {Array} products - List of products to filter
 * @param {string} searchTerm - Search term to filter by
 * @returns {Array} - Filtered products
 */
export const filterBySearchTerm = (products, searchTerm) => {
  if (!searchTerm) return products;
  
  const term = searchTerm.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(term) || 
    product.description.toLowerCase().includes(term)
  );
};

/**
 * Filter products by category
 * @param {Array} products - List of products to filter
 * @param {string} category - Category to filter by
 * @returns {Array} - Filtered products
 */
export const filterByCategory = (products, category) => {
  if (!category) return products;
  
  return products.filter(product => product.category === category);
};

/**
 * Filter products by multiple categories
 * @param {Array} products - List of products to filter
 * @param {Array} categories - Categories to filter by
 * @returns {Array} - Filtered products
 */
export const filterByCategories = (products, categories) => {
  if (!categories || categories.length === 0) return products;
  
  return products.filter(product => categories.includes(product.category));
};

/**
 * Filter products by price range
 * @param {Array} products - List of products to filter
 * @param {Object} priceRange - Price range to filter by
 * @returns {Array} - Filtered products
 */
export const filterByPriceRange = (products, priceRange) => {
  if (!priceRange) return products;
  
  return products.filter(product => 
    product.price >= priceRange.min && product.price <= priceRange.max
  );
};

/**
 * Filter products by rating
 * @param {Array} products - List of products to filter
 * @param {number} rating - Minimum rating to filter by
 * @returns {Array} - Filtered products
 */
export const filterByRating = (products, rating) => {
  if (!rating) return products;
  
  return products.filter(product => product.rating >= rating);
};

/**
 * Apply all filters to products
 * @param {Array} products - List of products to filter
 * @param {Object} filters - Object containing all filters
 * @returns {Array} - Filtered products
 */
export const applyAllFilters = (products, filters) => {
  let filteredProducts = [...products];
  
  const { searchTerm, categories, category, priceRange, rating } = filters;
  
  if (searchTerm) {
    filteredProducts = filterBySearchTerm(filteredProducts, searchTerm);
  }
  
  // Handle both old single category and new multiple categories
  if (categories && categories.length > 0) {
    filteredProducts = filterByCategories(filteredProducts, categories);
  } else if (category) {
    filteredProducts = filterByCategory(filteredProducts, category);
  }
  
  if (priceRange) {
    filteredProducts = filterByPriceRange(filteredProducts, priceRange);
  }
  
  if (rating) {
    filteredProducts = filterByRating(filteredProducts, rating);
  }
  
  return filteredProducts;
};

/**
 * Sort products by different criteria
 * @param {Array} products - List of products to sort
 * @param {string} sortOption - Sort option
 * @returns {Array} - Sorted products
 */
export const sortProducts = (products, sortOption) => {
  const sortedProducts = [...products];
  
  switch (sortOption) {
    case 'price-low':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'rating':
      return sortedProducts.sort((a, b) => b.rating - a.rating);
    case 'featured':
    default:
      // For featured, we'll sort by rating and then by price
      return sortedProducts.sort((a, b) => {
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }
        return a.price - b.price;
      });
  }
};