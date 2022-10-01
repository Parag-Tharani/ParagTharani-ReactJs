import React from "react";
import { useNavigate } from "react-router-dom"

export function CreateButton(){
    const navigate = useNavigate();


    return (
        <div className="flex justify-center items-center w-[10rem] rounded-lg sticky top-[85vh] left-[85vw] py-2 mr-2 z-10 bg-stone-500 text-slate-50 hover:bg-stone-200 hover:text-black">
            <button className="text-lg font-serif" onClick={() => navigate("/createProduct")}>Create Product</button>
        </div>
    )
}
