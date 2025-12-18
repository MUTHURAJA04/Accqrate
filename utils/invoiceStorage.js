import AsyncStorage from '@react-native-async-storage/async-storage';

const INVOICE_PRODUCTS_KEY = '@invoice_products';

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

export const clearProducts = async () => {
  try {
    await AsyncStorage.removeItem(INVOICE_PRODUCTS_KEY);
    console.log('✅ All products cleared from storage');
  } catch (error) {
    console.error('❌ Error clearing products:', error);
    throw error;
  }
};

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

export const saveInvoiceWithAutoNo = async (products, totalAmount, totalTax) => {
  let invoiceCounter = 1; 
  try {
   // Generate simple sequential invoice number
    const invoiceNo = `INV_${invoiceCounter++}`;

    const invoiceData = {
      invoiceNo,
      products,
      totalAmount,
      totalTax,
      totalPayable: totalAmount + totalTax,
      timestamp: new Date().toISOString(),
    };

    const storageKey = `@invoice_${invoiceNo}`;
    await AsyncStorage.setItem(storageKey, JSON.stringify(invoiceData));
    console.log('✅ Invoice saved with number:', invoiceNo);
    return invoiceNo;
  } catch (error) {
    console.error('❌ Error saving invoice:', error);
    throw error;
  }
};