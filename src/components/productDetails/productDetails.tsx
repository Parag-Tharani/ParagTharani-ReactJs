import React from "react";
import { useGetProductDetailsQuery } from "../../features/productsApi";
import { BsHeart, BsFillHeartFill } from "react-icons/bs"
import { useAppDispatch , useAppSelector } from "../../app/hooks" 
import { useParams } from "react-router-dom"
import { updateFav } from "../../features/favourite";

export function ProductDetails() {

  let { id } = useParams()
  const dispatch = useAppDispatch()
  const { favItems } = useAppSelector((state) => state.fav)

    const resonseProducDetails = useGetProductDetailsQuery(id)

    
    return (
        <>
        <div>
            <h1 className="w-auto pl-[5vw] text-4xl font-medium font-serif mt-5">Product Details</h1>
        </div>

        { resonseProducDetails.isLoading ? 

            <div className="w-[98vw] flex items-start pt-20 justify-center">
              <iframe src="https://giphy.com/embed/jAYUbVXgESSti" title="Loading Categories..." width="480" height="270" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
            </div>
      :
         <div className="flex flex-wrap font-sans w-[70vw] mx-auto mt-10 border rounded ">
  <div className="flex-none w-56 relative">
    <img src={resonseProducDetails.data.product.avatar} alt="" className="absolute inset-0 w-full h-full object-cover rounded-lg" loading="lazy" />
  </div>
  <form className="flex-auto p-6">
    <div className="flex flex-wrap">
      <h1 className="flex-auto font-medium text-2xl text-slate-900">
        {resonseProducDetails.data.product.name}
      </h1>
      <div className="w-full flex-none mt-2 order-1 text-3xl font-bold text-violet-600">
        ${resonseProducDetails.data.product.price}
      </div>
      <div className="flex space-x-4 mb-5 text-sm font-medium">
      { favItems.includes(resonseProducDetails.data.product._id) ?
        <BsFillHeartFill className=" cursor-pointer" size={20} color={"red"} onClick={() => dispatch(updateFav(resonseProducDetails.data.product._id))} />
        :
        <BsHeart className=" cursor-pointer" size={20} color="red" onClick={() => dispatch(updateFav(resonseProducDetails.data.product._id))}/>
      }
    </div>
    </div>
    <p className="text-md text-slate-500 my-5">
      {resonseProducDetails.data.product.description}
    </p>
  </form>
</div>
  }
</>
    )
}