/**
 * Invoice Storage Utility
 * Handles all AsyncStorage operations for invoice products
 * Makes it easy to save, load, delete, and reset invoice data
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage key for invoice products
const INVOICE_PRODUCTS_KEY = '@invoice_products';

/**
 * Save products to AsyncStorage
 * @param {Array} products - Array of product objects to save
 * @returns {Promise<void>}
 */
export const saveProducts = async (products) => {
  try {
    const jsonProducts = JSON.stringify(products);
    await AsyncStorage.setItem(INVOICE_PRODUCTS_KEY, jsonProducts);
    console.log('✅ Products saved to storage:', products.length);
  } catch (error) {
    console.error('❌ Error saving products:', error);
    throw error;
  }
};

/**
 * Load products from AsyncStorage
 * @returns {Promise<Array>} Array of products, or empty array if none found
 */
export const loadProducts = async () => {
  try {
    const jsonProducts = await AsyncStorage.getItem(INVOICE_PRODUCTS_KEY);
    if (jsonProducts) {
      const products = JSON.parse(jsonProducts);
      console.log('✅ Products loaded from storage:', products.length);
      return products;
    }
    return [];
  } catch (error) {
    console.error('❌ Error loading products:', error);
    return [];
  }
};

/**
 * Delete all products from AsyncStorage
 * @returns {Promise<void>}
 */
export const clearProducts = async () => {
  try {
    await AsyncStorage.removeItem(INVOICE_PRODUCTS_KEY);
    console.log('✅ All products cleared from storage');
  } catch (error) {
    console.error('❌ Error clearing products:', error);
    throw error;
  }
};

/**
 * Delete a specific product by code
 * @param {Array} currentProducts - Current array of products
 * @param {string} productCode - Code of product to delete
 * @returns {Promise<Array>} Updated array of products
 */
export const deleteProduct = async (currentProducts, productCode) => {
  try {
    const updatedProducts = currentProducts.filter(p => p.code !== productCode);
    await saveProducts(updatedProducts);
    console.log('✅ Product deleted:', productCode);
    return updatedProducts;
  } catch (error) {
    console.error('❌ Error deleting product:', error);
    throw error;
  }
};

