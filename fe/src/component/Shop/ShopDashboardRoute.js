import React from 'react';
import {Route, Routes} from "react-router-dom";
import {NavbarShop} from "../Navbar/NavbarShop";
import {ShopDashboardSidebar} from "./ShopDashboardSidebar";
import {ShopDashboard} from "./ShopDashboard";
import {ShopProduct} from "./ShopProduct";
import {ShopAddProduct} from "./ShopAddProduct";
import {ShopEditProduct} from "./ShopEditProduct";

export const ShopDashboardRoute = () => {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <section className="main flex h-screen">

            <NavbarShop/>

            <ShopDashboardSidebar/>

            <div className='lg: w-[80%]'>
                <Routes>
                    {/* Main layout route with sidebar and navbar */}

                    <Route path="/" element={<ShopDashboard/>}/>

                    <Route path="/shop-dashboard" element={<ShopDashboard/>}/>

                    <Route path="/shop-product" element={<ShopProduct/>}/>

                    <Route path="/shop-add-product" element={<ShopAddProduct/>}/>

                    <Route path="/shop-edit-product" element={<ShopEditProduct/>}/>

                    {/* Add more routes here */}

                </Routes>
            </div>

        </section>
    )
}
