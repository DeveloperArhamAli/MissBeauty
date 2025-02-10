import { useEffect, useState } from 'react'
import axios from "axios"
import ProductCard from '../components/ProductCard'

function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [productsWithImages, setProductsWithImages] = useState([]);

  useEffect(() => {
    try {
      setErrorMessage(null)
      axios.get('/api/getProducts')
        .then((response) => {
          setProducts(response.data.products)
        })
        .catch((error) => {
          setErrorMessage(error.message)
        })
        .finally(() => setLoading(false))
    } catch (error) {
      setErrorMessage(error.message)
    }
  }, [])

  useEffect(() => {
    // Convert Buffer data to base64 string for each product
    const updatedProducts = products.map((product) => {
      if (product.image[0] && product.image[0].data && product.image[0].type) {
        // Convert Buffer to base64 string
        const base64String = btoa(
          new Uint8Array(product.image[0].data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        // Add a new property for the base64 image
        return {
          ...product,
          imageSrc: `data:${product.image.type};base64,${base64String}`,
        };
      }
      return product;
    });
    setProductsWithImages(updatedProducts);
  }, [products]);

  if (errorMessage) {
    return (
      <div className='flex items-center justify-center min-h-screen w-full bg-[#ea667e] text-white'>
        <h1 className='text-3xl'>An error occured</h1>
      </div>
  )}

    return !loading ? (
      <>
        {/* <h1>Miss Beauty</h1>
        <p>Products: {products.length}</p> */}

          <div className='py-5 flex flex-wrap items-center justify-center gap-5 relative'>
          {productsWithImages.map((product) => (
            <div key={product._id}>
              {/* {console.log(product)} */}
              <ProductCard product={product} />
            </div>
          ))}
          </div>


      </>
    ) : (
      <div className='flex items-center justify-center min-h-screen w-full bg-[#ea667e] text-white'>
        <h1 className='text-3xl'>Loading...</h1>
      </div>
    )
}

export default HomePage