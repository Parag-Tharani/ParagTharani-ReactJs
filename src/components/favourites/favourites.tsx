import React from "react";
import { useGetAllProductsQuery } from "../../features/productsApi";
import { BsHeart, BsFillHeartFill } from "react-icons/bs"
import { useAppDispatch , useAppSelector } from "../../app/hooks" 
import { updateFav } from "../../features/favourite";


interface ProductInterface {
    _id : string,
    name : string,
    avatar : string,
    description : string,
    price : number,
    category : string
}



export function Favourites() {

    
  const dispatch = useAppDispatch()
  const { favItems } = useAppSelector((state) => state.fav)

    const responseAllProducts = useGetAllProductsQuery(0)


    function isFav(id: string) {
        if(favItems.includes(id)){
            return true
        }
        return false
    }

    console.log(responseAllProducts)
    return (
        <>
        <div>
            <h1 className="w-auto pl-[5vw] text-4xl font-medium font-serif mt-5">Favourites</h1>
        </div>

        { responseAllProducts.isLoading ? 

            <div className="w-[98vw] flex items-start pt-20 justify-center">
              <iframe src="https://giphy.com/embed/jAYUbVXgESSti" title="Loading Categories..." width="480" height="270" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
            </div>
        :
            <>
            { responseAllProducts.data.products.map((product: ProductInterface) => {
                return <>
                { (isFav(product._id)) ?
                
<div key={product._id} className="flex flex-wrap font-sans w-[70vw] mx-auto my-10 border rounded ">
  <div className="flex-none w-56 relative">
    <img src={product.avatar} alt="" className="absolute inset-0 w-full h-full object-cover rounded-lg" loading="lazy" />
  </div>
  <form className="flex-auto p-6">
    <div className="flex flex-wrap">
      <h1 className="flex-auto font-medium text-2xl text-slate-900">
        {product.name}
      </h1>
      <div className="w-full flex-none mt-2 order-1 text-3xl font-bold text-violet-600">
        ${product.price}
      </div>
      <div className="flex space-x-4 mb-5 text-sm font-medium">
      { favItems.includes(product._id) ?
        <BsFillHeartFill className=" cursor-pointer" size={20} color={"red"} onClick={() => dispatch(updateFav(product._id))} />
        :
        <BsHeart className=" cursor-pointer" size={20} color="red" onClick={() => dispatch(updateFav(product._id))}/>
      }
    </div>
    </div>
    <p className="text-md text-slate-500 my-5">
      {product.description}
    </p>
  </form>
</div>
                :null}
                </>
            })}
            </>
        }
    </>
)
}