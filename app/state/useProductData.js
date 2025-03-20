import { useState, useEffect, useCallback } from 'react';

export const useProductsData = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const fetchProducts = useCallback(async (pageNumber) => {
    if (loading) return;
    
    try {
      setLoading(true);
      setError(null);
      

      const apiUrl = `http://192.168.118.38:3000/api/v2/storefront/products?include=images&per_page=6&page=${pageNumber}`;
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Check if we received products data in the expected format
      if (data && data.data) {
        // Transform the API data into a more usable format
        const formattedProducts = data.data.map(item => {
          // Find associated images for this product
          const productImages = data.included
            ? data.included
                .filter(included => 
                  included.type === 'image' && 
                  item.relationships.images.data.some(img => img.id === included.id)
                )
                .map(image => ({
                  id: image.id,
                  url: image.attributes.url,
                  position: image.attributes.position
                }))
            : [];
          
          return {
            id: item.id,
            name: item.attributes.name,
            description: item.attributes.description,
            price: item.attributes.price,
            available: item.attributes.available_on !== null,
            slug: item.attributes.slug,
            images: productImages
          };
        });
        
        if (pageNumber === 1) {
          setProducts(formattedProducts);
        } else {
          setProducts(prev => [...prev, ...formattedProducts]);
        }
        
        setHasMore(formattedProducts.length >= 6);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  // Load initial data
  useEffect(() => {
    fetchProducts(1);
  }, []);

  // Function to load more products
  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProducts(nextPage);
    }
  }, [hasMore, loading, page, fetchProducts]);

  return { products, loading, error, loadMore, hasMore };
};