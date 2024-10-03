import React, { useEffect, useState } from 'react';
import "../../style/Home.css";
import MultiItemCarousel from "./MultiItemCarousel";
import { Divider, PaginationItem } from "@mui/material";
import CategoryMenu from "../Category/CategoryMenu";
import ProductCard from "../Product/ProductCard";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAction } from "../State/Product/Action";
import CartModal from '../Cart/CartModal';  // Import the CartModal

const Home = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(store => store);  // Getting products from store
    const [cart, setCart] = useState([]);  // Initialize cart state
    const [openCartModal, setOpenCartModal] = useState(false);  // State to open/close cart modal
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch products
    useEffect(() => {
        dispatch(getAllProductsAction()); // Call action to fetch product data
    }, [dispatch]);

    // Load cart from localStorage on initial render
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        if (savedCart) {
            setCart(savedCart);  // Load saved cart data
        }
    }, []);

    // Save cart to localStorage whenever cart state changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));  // Save the cart to localStorage
    }, [cart]);

    // Add a product to the cart (this could be triggered when a user clicks "Add to Cart")
    const addToCart = (product) => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);  // Update cart state
    };

    // Get the current page products
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products && products.products ? products.products.slice(indexOfFirstProduct, indexOfLastProduct) : [];

    // Pagination change handler
    const handleChange = (event, value) => {
        setCurrentPage(value); // Update current page
    };

    // Open and close modal handlers
    const handleOpenCart = () => {
        setOpenCartModal(true);
    };

    const handleCloseCart = () => {
        setOpenCartModal(false);
    };

    // Calculate total price from the cart
    const totalPrice = cart.reduce((total, item) => total + (item.discountPrice || item.unitSellPrice), 0);

    return (
        <div>
            <section className="banner -z-50 relative flex flex-col items-center">
                <div className="w-[50vw] z-10 text-center">
                    <p className="text-2xl lg:text-5xl font-bold z-10 py-5 mt-9" style={{ color: "#019376" }}>
                        Grocery
                    </p>
                    <p className="z-10 text-black-400 text-xl lg:text-2xl">
                        Get your healthy foods & snacks delivered at your doorsteps all day every day
                    </p>
                </div>
            </section>
            <Divider />
            <section className="p-10 lg:py-10 lg:px-20">
                <p className="text-2xl font-semibold text-black-400 py-3 pb-10" style={{ color: "#019376" }}>
                    Top Product
                </p>
                <MultiItemCarousel />
            </section>

            <section className="pt-[2rem] lg:flex relative">
                <div className="space-y-10 w-[300px] filter" style={{ backgroundColor: '#ffffff', padding: '1rem' }}>
                    <div className="box spacey-8 items-center lg:sticky top-28">
                        <CategoryMenu />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mx-auto ml-8" style={{ width: '100%', maxWidth: '1600px' }}>
                    {
                        currentProducts.map((item) =>
                            <ProductCard
                                key={item.id}
                                item={item}
                                addToCart={() => addToCart(item)} // Add "Add to Cart" functionality
                            />
                        )  // Use item.id as key
                    }
                </div>
            </section>

            <Stack spacing={2} className="mt-5" alignItems="center" sx={{ marginBottom: "30px" }}>
                <Pagination
                    count={Math.ceil((products && products.products ? products.products.length : 0) / itemsPerPage)} // Calculate number of pages
                    page={currentPage}
                    onChange={handleChange}
                    color="primary"
                    renderItem={(item) => (
                        <PaginationItem {...item} className="pagination-item" />
                    )}
                />
            </Stack>

            {/* Add the cart button */}
            <div className="fixed bottom-10 right-10 cart-modal">
                <button
                    className=" text-white p-3 rounded-lg shadow-lg"
                    onClick={handleOpenCart}
                >
                    View Cart ({cart.length})
                </button>
            </div>

            {/* Cart Modal */}
            <CartModal
                open={openCartModal}
                onClose={handleCloseCart}
                cartItems={cart}
                totalPrice={totalPrice}
            />
        </div>
    );
}

export default Home;
