import React from "react";
import { BsHeart, BsFillHeartFill } from "react-icons/bs"
import { HiAdjustments } from "react-icons/hi"
import { AiOutlineClose } from "react-icons/ai"
import { CreateButton } from "../createProduct/createButton";
import { Drawer } from "@mui/material";
import { useGetAllProductsQuery } from "../../features/productsApi";
import { useGetAllCategoriesQuery } from "../../features/productsApi";
import { useNavigate } from "react-router-dom"
import { useAppDispatch , useAppSelector } from "../../app/hooks" 
import { updateFav } from "../../features/favourite";
import { delProduct } from "../../features/deleteProduct"

interface Props {
    window?: () => Window;
}

interface ProductInterface {
  _id : string,
  name : string,
  avatar : string,
  description : string,
  price : number,
  category : string
}

interface CategoriesInterface {
  _id : string,
  name : string
}


export function AllProducts(props: Props) {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { favItems } = useAppSelector((state) => state.fav)
  const { deleteProduct } = useAppSelector((state) => state.del)

  let responceProductData = useGetAllProductsQuery(0)  
  let responseCategories = useGetAllCategoriesQuery(0)
  let [ SelectedFilters, setSelectedFilters] = React.useState("")


    const { window } = props;
    const container = window !== undefined ? () => window().document.body : undefined;
    const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };


  
  function SelectedItems(items : string) {

    if(SelectedFilters === "") return true;

    if(items === SelectedFilters){
      return true
    }
    return false
  }

  function setSelectedCategories(item: string) {
    
    if(item === SelectedFilters){
      return setSelectedFilters("")
    }

    return setSelectedFilters(item)

  }

  function DeletedProducts(id: string) {

    if(deleteProduct.includes(id)){
      return true
    }

    return false
  }


  const drawer = (
    <div className="w=[100vw] mt-5">
      <h1 className=" w-[100%] text-lg font-bold text-zinc-800 mb-2 pl-5">Categories</h1>

      {responseCategories.status === "rejected" ?
      <h1 className="text-center font-sans font-semibold text-zinc-700 mt-4 px-1">Fetching Data Request Rejected :(</h1>
      :
      <>
      {responseCategories.isLoading ? 

        <div className="w-[98vw] flex items-start pt-20 justify-center">
          <iframe src="https://giphy.com/embed/jAYUbVXgESSti" title="Loading Categories..." width="480" height="270" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
        </div>

        :
        <div>
          {
            responseCategories.data.categories.map((items: CategoriesInterface) => {
              return <div key={items._id} className=" flex pt-1 rounded mx-auto w-[95%] text-md font-serif pb-1 pl-5 cursor-pointer hover:bg-stone-400">
                { (items.name === SelectedFilters) ? 
                  <p className="bg-stone-400 rounded-md px-2" onClick={() => setSelectedCategories(items.name)}>{items.name}</p>
                :
                  <p onClick={() => setSelectedCategories(items.name)}>{items.name}</p>
                }
                </div>
            })
          }
        </div>
      }
      </>
    }
    </div>
  );

    return (
        <>
        {/* <CreateButton /> */}
        <div>
            <h1 className="w-auto pl-[5vw] text-4xl font-medium font-serif mt-5">All Products</h1>
        </div>

        {responceProductData.status === "rejected" ?
              <h1 className="text-center font-sans font-semibold text-zinc-700 mt-[20vh] text-4xl">Fetching Data Request Rejected :(</h1>
            :
            <>
        <div className="flex justify-between items-center w-[90vw] mx-auto mt-10 m-5">
            <div className="flex justify-center items-center cursor-pointer">
                <HiAdjustments size={19} />
                <p className="pl-2 text-lg font-normal" onClick={handleDrawerToggle}>Filter</p>

                <Drawer
                  container={container}
                  variant="temporary"
                  open={drawerOpen}
                  onClose={handleDrawerToggle}
                  ModalProps={{
                    keepMounted: true,
                  }}
                  sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
                  }}
                  >
                  {drawer}
                </Drawer>


                
                <div className="flex max-w-[25vw] overflow-x-scroll no-scrollbar ml-2 ">
                {/* {SelectedFilters.map((items, index) => ( */}
                { (SelectedFilters !== "") ?
                    <div className="flex justify-center items-center ml-2 border rounded">
                        <p className="mr-1 px-1">{SelectedFilters}</p>
                        <AiOutlineClose onClick={() => setSelectedFilters("")} />
                    </div>
                :null}
                {/* ))} */}
                </div>
            </div>

            <div className="flex justify-center items-start text-gray-500 ">
                <button className="text-xl hover:text-gray-700 hover:underline" onClick={() => navigate('/favourites')}>Favourites</button>
                <p className="z-10 bg-red-400 rounded-full px-1 text-xs text-center text-white">{favItems.length}</p>
            </div>
        </div>

        <CreateButton />
    {responceProductData.isLoading ? 

        <div className="w-[98vw] flex items-start pt-20 justify-center">
          <iframe src="https://giphy.com/embed/ZO9b1ntYVJmjZlsWlm" title="Loading..." width="480" height="360" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
        </div>

        :

    <div className="bg-white p-5 pb-10">
      <div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8">

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {responceProductData.data.products.map((product: ProductInterface) => (
            <>
            { DeletedProducts(product._id) ?
            null :
            <>
               { (SelectedItems(product.category)) ? 
            <div key={product._id} className="group" >
              <div className=" cursor-pointer " onClick={() => navigate(`/productDetails/${product._id}`)}>
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={product.avatar}
                  alt={product.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
              </div>
                
              <div className="w-[100%] justify-between flex items-center">
              <button className=" bg-red-400 text-white rounded-md ml-0.5 p-2 mr-2 mt-1" onClick={() => dispatch(delProduct(product._id))}>Delete Product</button>
              { favItems.includes(product._id) ?
                <BsFillHeartFill className=" cursor-pointer" size={20} color={"red"} onClick={() => dispatch(updateFav(product._id))} />
              :
                <BsHeart className=" cursor-pointer" size={20} color="red" onClick={() => dispatch(updateFav(product._id))}/>
              }
              </div>
            </div>
            :
             null
            }
            </>
            }
          </>
          ))}
        </div>
      </div>
    </div>
      }
      </>
}
    </>
  )
}