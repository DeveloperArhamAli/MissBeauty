import { Link } from "react-router-dom"

function ProductCard({product}) {

    return (
        <div className="w-[300px] h-[400px] p-5 bg-[#f7d4aa]">
    
            <Link to={`/${product._id}`}>

                <div className="relative flex items-end overflow-hidden">

                    <img src={product.imageSrc} alt={product.title} className="w-full h-full aspect-square object-contain" />

                </div>

                <div className="mt-2 flex flex-col overflow-hidden">

                    <h2 className="text-[#ea667e] font-bold text-md text-center px-5 whitespace-nowrap overflow-hidden text-ellipsis">{product.name}</h2>
                    
                    {product.brand ? (
                        <p className="mt-1 text-sm text-slate-400 text-center hidden">
                        by {product.brand}
                    </p>
                    ) : null}

                    <div className="flex flex-col items-center justify-between w-full">

                        <div className="flex gap-2">

                            <p className={`${product.discount ? "line-through" : ""}`}>Rs. {product.price}</p>
                            {product.discount ? (
                                <p className="font-semibold mb-1 text-black">
                                    Rs.{product.price - product.discount}
                                </p>
                            ) : null}

                        </div>

                        {product.stock > 0 ? (
                            <Link className="flex items-center space-x-1.5 bg-[#ea667e] px-4 py-1.5 w-full text-white duration-100" to={`/users/addtocart/${product._id}`}>
                                <i className="ri-shopping-cart-line"></i>
                                <button className="text-sm text-center">Add to cart</button>
                            </Link>
                        ) : (
                            <Link className="flex items-center space-x-1.5 bg-[#ea667e] px-4 py-1.5 w-full text-white duration-100 hover:bg-pink-600 cursor-not-allowed">
                                <i className="ri-shopping-cart-line"></i>
                                <button className="text-sm text-center">Sold Out</button>
                            </Link>
                        )}

                    </div>

                </div>

            </Link>

        </div>
    )
}
export default ProductCard