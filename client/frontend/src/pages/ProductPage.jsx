import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import parse from "html-react-parser"

function ProductPage() {
    const [product, setProduct] = useState(null)
    const [randomProducts, setRandomProducts] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const location = useLocation()

    useEffect(() => {
        axios.get(`/api${location.pathname}`)
            .then((response) => {
                setProduct(response.data.productWithBase64Images)
                setRandomProducts(response.data.randomProducts)
                
            })
            .catch((error) => {
                setError(error.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [location])

    function displayImage(imageBase64) {
        document.getElementById('displayedImage').src = `${imageBase64}`;
    }
    
    error ? (<div>{error.message}</div>) : null
    return !loading ? (
    <main className="my-8">

        <div className="container mx-auto px-6">
            
            <div className="w-full flex flex-col justify-center md:flex md:flex-row md:justify-start">

                <div className="flex">

                    <div className="mr-2">
                        {product.image.map(img => (
                            <div className="w-14" key={img}>
                                <img src={img} className="thumbnail" onClick={() => displayImage(img)} />
                            </div>
                        ))}
                    </div>

                    <div>
                        <img className="h-full w-full rounded-md object-cover max-w-lg" id="displayedImage" src={product.image[0]} alt="Selected Product Image" />
                    </div>

                </div>

                <div className="w-full max-w-lg mt-5 md:ml-8 md:mt-0 md:w-1/2">

                    <div className="flex justify-between">
                        
                        <h3 className="text-gray-700 text-lg flex flex-col">{product.name}{product.brand ? (<span className="text-gray-500 text-sm">by {product.brand}</span>) : null}</h3> 

                        <div className="md:hidden">
                            
                            {product.stock >= 1 ? (
                                <div className="flex items-center">
    
                                <a href="/users/addtocart/{ product._id }"><button className="px-8 py-2 bg-pink-600 text-white text-sm font-medium rounded hover:bg-pink-500 focus:outline-none focus:bg-pink-500">Add to Cart</button></a>

                                </div>
                            ) : (
                                <a><button className="px-8 py-2 bg-pink-600 text-white text-sm font-medium rounded hover:bg-pink-500 focus:outline-none focus:bg-pink-500 cursor-not-allowed">Sold Out</button></a>
                            )}
                                
                        </div>
                        
                    </div>

                    <span className="text-gray-500 mt-3 flex items-center">
                    
                        {product.discount && (
                            <p className="line-through text-zinc-500">Rs.{ product.price }&nbsp;</p>
                        )}
                        
                        <p className="text-pink-700 font-semibold ms-1">Rs.{ product.price - product.discount }</p>
                        
                    </span>

                    <hr className="my-3" />

                    <div className="hidden md:flex">
                    
                        {product.stock >= 1 ? (
                            <div className="flex items-center mt-6">

                            <a href="/users/addtocart/{ product._id }"><button className="px-8 py-2 bg-pink-600 text-white text-sm font-medium rounded hover:bg-pink-500 focus:outline-none focus:bg-pink-500">Add to Cart</button></a>

                        </div>
                        ) : (
                            <a><button className="px-8 py-2 bg-pink-600 text-white text-sm font-medium rounded hover:bg-pink-500 focus:outline-none focus:bg-pink-500 cursor-not-allowed">Sold Out</button></a>
                        )}

                    </div>

                    <div className="mt-10 border border-zinc-400 px-4 py-4 overflow-hidden hidden lg:flex flex-col">
                        <h1 className="text-2xl mb-4">Description:</h1>
                        <h1 className="max-w-md">{parse(product.description)}</h1>
                    </div>

                </div>

            </div>

            <div className="mt-10 border border-zinc-400 px-4 py-4 overflow-hidden lg:hidden">
                <h1 className="text-2xl mb-4">Description:</h1>
                <h1 className="max-w-md">{parse(product.description)}</h1>

            </div>

            <div className="mt-16">

                <h3 className="text-gray-600 text-2xl font-medium">More Products</h3>

                <div className="flex mt-6 whitespace-nowrap overflow-x-auto">

                    {randomProducts.map(product => (
                        <div key={product._id}>
                            <Link to={`/${product._id}`} className="inline-block">

                            <div className="w-40 mr-5 rounded-md shadow-md overflow-hidden cursor-pointer">
        
                                <img className="w-full bg-cover" src={`data:image/jpeg;base64,${product.image[0].toString('base64')}`} />
        
                                <div className="px-5 py-3">
        
                                    <h3 className="text-gray-700 uppercase overflow-hidden">{ product.name }</h3>
                                    <span className="text-gray-500 mt-2">Rs. { product.price - product.discount }</span>
        
                                </div>
        
                            </div>
    
                            </Link>
                        </div>
                    ))}

                </div>
            </div>

        </div>

    </main>

    ) : (
        <div>Loading...</div>
    )
}

export default ProductPage