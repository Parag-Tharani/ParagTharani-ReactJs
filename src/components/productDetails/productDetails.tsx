import React from "react";
import { useGetProductDetailsQuery } from "../../features/productsApi";
import { useParams } from "react-router-dom"

export function ProductDetails() {

    let { id } = useParams()

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
         <div className="flex font-sans w-[80vw] mx-auto mt-10">
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
      {/* <button className="flex-none flex items-center justify-center w-9 h-9 rounded-full text-violet-600 bg-violet-50" type="button" aria-label="Like">
        <svg width="20" height="20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
        </svg>
      </button> */}
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