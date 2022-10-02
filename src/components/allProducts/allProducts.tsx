import React from "react";
import { BsHeart , BsFillHeartFill } from "react-icons/bs"
import { HiAdjustments } from "react-icons/hi"
import { AiOutlineClose } from "react-icons/ai"
import { CreateButton } from "../createProduct/createButton";
import { Drawer } from "@mui/material";
import { useGetAllProductsQuery } from "../../features/productsApi";
import { useGetAllCategoriesQuery } from "../../features/categoriesApi";


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


  const responceProductData = useGetAllProductsQuery(0)  
  const responseCategories = useGetAllCategoriesQuery(0)
  const SelectedFilters: String[] = ["Clothing"]


    const { window } = props;
    const container = window !== undefined ? () => window().document.body : undefined;
    const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };


  function SelectedItemsCategories(items: string){
    for(var i=0; i<SelectedFilters.length; i++){
      if(SelectedFilters[i] === items){
        return true
      }
    }
    return false
  }


  function SelectedItems(items : string) {
    
    if(SelectedFilters.length === 0) return true;

    for(var i=0; i<SelectedFilters.length; i++){
      if(SelectedFilters[i] === items){
        return true
      }
    }
    return false
  }


  const drawer = (
    <div className="w=[100vw] mt-5">
      <h1 className=" w-[100%] text-lg font-bold text-zinc-800 mb-2 pl-5">Categories</h1>

      {responseCategories.isLoading ? 

        <div className="w-[98vw] flex items-start pt-20 justify-center">
          <iframe src="https://giphy.com/embed/jAYUbVXgESSti" title="Loading Categories..." width="480" height="270" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
        </div>

        :
        <div>
          {
            responseCategories.data.categories.map((items: CategoriesInterface) => {
              return <div key={items._id} className=" flex pt-1 rounded mx-auto w-[95%] text-md font-serif pb-1 pl-5 cursor-pointer hover:bg-stone-400">
                { SelectedItemsCategories(items.name) ? 
                  <p className="bg-stone-400 rounded-md px-2">{items.name}</p>
                :
                  <p>{items.name}</p>
                }
                </div>
            })
          }
        </div>
      }

    </div>
  );

    return (
        <>
        <CreateButton />
        <div>
            <h1 className="w-auto pl-[5vw] text-4xl font-medium font-serif mt-5">All Products</h1>
        </div>

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
                {SelectedFilters.map((items, index) => (
                    <div key={index} className="flex justify-center items-center ml-2 border rounded">
                        <p className="mr-1 px-1">{items}</p>
                        <AiOutlineClose />
                    </div>
                ))}
                </div>
            </div>

            <div className="flex justify-center items-start text-gray-500 ">
                <button className="text-xl hover:text-gray-700 hover:underline">Favourites</button>
                <p className="z-10 bg-red-400 rounded-full px-1 text-xs text-center text-white">{0}</p>
            </div>
        </div>

    { responceProductData.isLoading ? 

        <div className="w-[98vw] flex items-start pt-20 justify-center">
          <iframe src="https://giphy.com/embed/ZO9b1ntYVJmjZlsWlm" title="Loading..." width="480" height="360" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
        </div>

        :
        
    <div className="bg-white pb-10">
      <div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8">

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {responceProductData.data.products.map((product: ProductInterface) => (
            <>
               { SelectedItems(product.category) ? 
            <div key={product._id} className="group">
              <div className=" cursor-pointer ">
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
              <button className=" bg-red-400 text-white rounded-md ml-0.5 p-2 mr-2 mt-1">Delete Product</button>
              <BsHeart size={20} color="red"/>
              {/* <BsFillHeartFill size={20} color={"red"} /> */}
              </div>
            </div>
            :
             null
            }
            </>
          ))}
        </div>
      </div>
    </div>
    }
        </>
    )
}