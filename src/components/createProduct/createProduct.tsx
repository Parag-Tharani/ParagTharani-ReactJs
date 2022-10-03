import React from "react";
import { useCreateProductMutation, useGetAllCategoriesQuery } from "../../features/productsApi";
import { useNavigate } from "react-router-dom"

interface CategoriesInterface {
    _id : string,
    name : string
  }

export function CreateProduct() {

    const navigate = useNavigate()

    const [name , setName] = React.useState("")
    const [price , setPrice] = React.useState(Number)
    const [category , setCategory] = React.useState("")
    const [description , setDescription] = React.useState("")
    const [avatar , setAvatar] = React.useState("")
    const [email , setEmail] = React.useState("ParagTharani24@gmail.com")

    const [error ,setError] = React.useState(false);

    let responseCategories = useGetAllCategoriesQuery(0)
    // eslint-disable-next-line
    const [createPost , responseInfo] = useCreateProductMutation()
    
    
    const body = {
        name,
        avatar,
        description,
        category,
        price,
        developerEmail: email
    }


    function HandleSubmit(e : any) {
        e.preventDefault()
        
        if(name !== "" && category !== "" && description !== "" && avatar !== "" && email !== ""){
            createPost(body)
            setError(false)
            navigate("/")
        }else{
            setError(true)
        }

    }


    return (
        
        <>
        <div>
            <h1 className="w-auto pl-[5vw] text-4xl font-medium font-serif mt-5">Create Product</h1>
        </div>
        { error ? 
        <p className="w-[98vw] text-center text-red-500 font-serif
        ">Please Provide all the Information Correctly</p>
        : 
        null}

            {responseCategories.isLoading ? 

                <div className="w-[98vw] flex items-start pt-20 justify-center">
                    <iframe src="https://giphy.com/embed/jAYUbVXgESSti" title="Loading Categories..." width="480" height="270" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
                </div>

                :
                <><div className="hidden sm:block" aria-hidden="true">
                    <div className="py-5">
                        <div className="border-t border-gray-200" />
                    </div>
                </div><div className="flex justify-center mt-10 sm:mt-0">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="mt-5 md:col-span-2 md:mt-0">
                                <form onSubmit={HandleSubmit}>
                                    <div className="overflow-hidden shadow sm:rounded-md">
                                        <div className="bg-white px-4 py-5 sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                        Name of the Product
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="product-name"
                                                        autoComplete="given-name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                                </div>

                                                <div className="col-span-6 sm:col-span-3">
                                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                        Price
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="price"
                                                        id="price"
                                                        autoComplete="number"
                                                        value={price}
                                                        onChange={(e) => setPrice(e.target.valueAsNumber)}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                                </div>


                                                <div className="col-span-6">
                                                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                                        Description
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="description"
                                                        id="description"
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        autoComplete="street-address"
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                                </div>


                                                <div className="col-span-6 sm:col-span-3">
                                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                        Categories
                                                    </label>
                                                    <select
                                                        id="categories"
                                                        name="categories"
                                                        autoComplete="categories"
                                                        value={category}
                                                        onChange={(e) => setCategory(e.target.value)}
                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    >
                                                        <option></option>
                                                        {responseCategories.data.categories.map((items: CategoriesInterface) => {
                                                            return <option key={items._id}>{items.name}</option>;
                                                        })}
                                                    </select>
                                                </div>

                                                <div className="col-span-6 sm:col-span-4">
                                                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                                        Avatar
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="avatar"
                                                        id="avatar"
                                                        autoComplete="email"
                                                        value={avatar}
                                                        onChange={(e) => setAvatar(e.target.value)}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                                </div>



                                                <div className="col-span-6 sm:col-span-4">
                                                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                                        Developer's Email address
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email-address"
                                                        id="email-address"
                                                        autoComplete="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                                </div>


                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                            <button
                                                type="submit"
                                                onClick={HandleSubmit}
                                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div></>
                    }
            </>
    )
}