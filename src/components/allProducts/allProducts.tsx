import React from "react";
import { BsHeart , BsFillHeartFill } from "react-icons/bs"
import { HiAdjustments } from "react-icons/hi"
import { AiOutlineClose } from "react-icons/ai"
import { CreateButton } from "../createProduct/createButton";
import { Drawer } from "@mui/material"


interface Props {
    window?: () => Window;
}


export function AllProducts(props: Props) {

    const { window } = props;
    const drawerWidth = 240;
    const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      Hello World
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;



    const products = [
        {
          id: 1,
          name: 'Earthen Bottle',
          href: '#',
          price: '$48',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
          imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
        },
        {
          id: 2,
          name: 'Nomad Tumbler',
          href: '#',
          price: '$35',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
          imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
        },
        {
          id: 3,
          name: 'Focus Paper Refill',
          href: '#',
          price: '$89',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
          imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        },
        {
          id: 4,
          name: 'Machined Mechanical Pencil',
          href: '#',
          price: '$35',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
          imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        },
        {
            id: 5,
            name: 'Earthen Bottle',
            href: '#',
            price: '$48',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
            imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
          },
        // More products...
    ]

    const filter_arr: String[] =["Parag" , "Chirag" , "Tashu"]

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
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>


                
                <div className="flex max-w-[25vw] overflow-x-scroll no-scrollbar ml-2 ">
                {filter_arr.map((items, index) => (
                    <div key={index} className="flex justify-center items-center ml-2 border rounded">
                        <p className="mr-1 px-1">{items}</p>
                        <AiOutlineClose />
                    </div>
                ))}
                </div>
            </div>

            <div className="flex justify-center items-start text-gray-500 ">
                <button className="text-xl hover:text-gray-700 hover:underline">Favourites</button>
                <p className="z-10 bg-red-400 rounded-full px-1 text-xs text-center text-white">{filter_arr.length}</p>
            </div>
        </div>


    <div className="bg-white">
      <div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8">

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <a key={product.id} href={product.href} className="group">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                
              <div className="w-[100%] justify-between flex items-center">
              <button className=" bg-red-400 text-white rounded-md ml-0.5 p-2 mr-2 mt-1">Delete Product</button>
              <BsHeart size={20} color="red"/>
              {/* <BsFillHeartFill size={20} color={"red"} /> */}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
        </>
    )
}