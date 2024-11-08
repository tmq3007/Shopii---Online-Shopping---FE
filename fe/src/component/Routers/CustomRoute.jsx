import React, {useEffect, useState} from 'react';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Home from "../Home/Home";
import Auth from "../Auth/Auth";
import ProductDetail from "../Product/ProductDetail";
import {AdminDashboard} from "../Admin/AdminDashboard";
import VendorDashboard from "../Vendor/VendorDashboard";
import {CustomerProfile} from "../User/CustomerProfile/CustomerProfile";
import {ShopDashboard} from "../Shop/ShopDashboard";
import {CreateShop} from "../Shop/CreateShop";
import Processing from "../Shop/Processing";
import Cart from "../Cart/Cart";
import CustomerPayment from "../User/CustomerProfile/CustomerPayment";
import SuccessOrderShow from "../User/CustomerProfile/SuccessOrderShow";
import {HelpingCenter} from "../HelpingCenter/HelpingCenter";
import PaymentTimeOut from "../Payment/PaymentTimeOut";
import Payment from "../Payment/Payment";
import UnAuthorizedPage from "../Auth/UnAuthorizedPage";

import RejectedShopCreation from "../Shop/RejectedShopCreation";
import {EditShop} from "../Shop/EditShop";
import Review from "../User/CustomerProfile/Orders/ReviewProduct";
import axios from "axios";
const PaymentRoute = ({ children }) => {
    const orderPlaced = localStorage.getItem('orderPlaced') === 'true';
    console.log('Order placed status:', orderPlaced); // Check this output
    return orderPlaced ? children : <Navigate to="/cart" />;
};
const PaymentRoute2 = ({ children }) => {
    const orderPlaced = localStorage.getItem('paymentPlaced') === 'true';
    console.log('Order placed status:', orderPlaced); // Check this output
    return orderPlaced ? children : <Navigate to="/cart" />;
};

const ProtectedRoute = ({ role, children }) => {
    const userRole = localStorage.getItem('role');

    if (!userRole) {
        return <Navigate to="/auth/login" />;
    }

    return userRole === role ? children : <Navigate to="/auth/unauthorized" />;
};

const ProtectedVendorRoute = ({ role, children }) => {
    const token = localStorage.getItem('jwt');
    const userRole = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [shopId, setShopId] = useState(null);
    const [unverifiedShopId, setUnverifiedShopId] = useState(null);
    const [shopError, setShopError] = useState(false);
    const [unverifiedShopError, setUnverifiedShopError] = useState(false);
    const [isRejected, setIsRejected] = useState(false);

    useEffect(() => {
        if (userRole !== role || !userId) {
            navigate("/auth/unauthorized");
            return;
        }

        const fetchShopData = async () => {
            try {
                axios.get(`http://localhost:8080/api/v1/shops/get-shopId/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(response => {
                        setShopId(response.data.result);
                        setShopError(false);
                    })
                    .catch(error => {
                        console.error("Error fetching shopId:", error);
                        setShopError(true);
                    });

                axios.get(`http://localhost:8080/api/v1/get-unverifed-shopid/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(response => {
                        setUnverifiedShopId(response.data.result);
                        setUnverifiedShopError(false);
                        console.log("UnverifiedShopId:", response.data.result);
                    })
                    .catch(error => {
                        console.error("Error fetching UnshopId:", error);
                        setUnverifiedShopError(true);
                    });
            } catch (error) {
                console.error("Error fetching shop data:", error);
            }
        };

        fetchShopData();
    }, [userRole, role, userId, token, navigate]);

    useEffect(() => {
        if (unverifiedShopId) {
            const fetchRejectedStatus = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/v1/get-status-rejected/${unverifiedShopId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setIsRejected(response.data.result);
                } catch (error) {
                    console.error("Error fetching rejection status:", error);
                }
            };
            fetchRejectedStatus();
        }
    }, [unverifiedShopId, token]);

    useEffect(() => {
        if (shopError && unverifiedShopError) {
            navigate("/create-shop");
        } else if (shopError && !unverifiedShopError) {
            navigate(!isRejected ? "/processing" : `/rejected-shop-creation/${unverifiedShopId}`);
        } else if (!shopError && unverifiedShopError) {
            navigate("/vendor-dashboard");
        }
    }, [shopError, unverifiedShopError, isRejected, unverifiedShopId, navigate]);

    return userRole === role ? children : <Navigate to="/auth/unauthorized" />;
};



const CustomRoute = () => {
    return (
        <div>

            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/auth/:register' element={<Home/>}/>
                <Route path="/product-detail" element={<ProductDetail/>}/>
                <Route path="/help-center/*" element={<HelpingCenter/>}/>
                <Route path="/my-profile/*" element={<CustomerProfile/>}/>
                {/*<Route path="/payment-time-out" element={<PaymentTimeOut/>}/>*/}
                {/*<Route*/}
                {/*    path="/payment-time-out"*/}
                {/*    element={*/}
                {/*        <PaymentRoute>*/}
                {/*            <PaymentTimeOut />*/}
                {/*        </PaymentRoute>*/}
                {/*    }*/}
                {/*/>*/}
                <Route
                    path="/payment"
                    element={
                        <PaymentRoute2>
                            <Payment />
                        </PaymentRoute2>
                    }
                />
                <Route
                    path="/payment-time-out"
                    element={
                        <PaymentRoute2>
                            <PaymentTimeOut />
                        </PaymentRoute2>
                    }
                />
                <Route
                    path="/my-payment"
                    element={
                        <PaymentRoute>
                            <CustomerPayment />
                        </PaymentRoute>
                    }
                />
                <Route
                    path="/success-place-order"
                    element={
                        <PaymentRoute2>
                            <SuccessOrderShow />
                        </PaymentRoute2>
                    }
                />


                <Route path="/shop-dashboard/*" element={
                    <ProtectedVendorRoute role="ROLE_VENDOR">
                        <ShopDashboard />
                    </ProtectedVendorRoute>
                } />

                <Route path="/vendor-dashboard/*" element={
                    <ProtectedVendorRoute role="ROLE_VENDOR">
                        <VendorDashboard />
                    </ProtectedVendorRoute>
                } />

                <Route path="/cart"
                    element={
                    <ProtectedRoute role="ROLE_CUSTOMER">
                        <Cart></Cart>
                    </ProtectedRoute>
                    }
                />

                <Route path="/create-shop" element={
                    <ProtectedVendorRoute role="ROLE_VENDOR">
                        <CreateShop/>
                    </ProtectedVendorRoute>
                } />

                <Route path="/processing" element={
                    <ProtectedVendorRoute role="ROLE_VENDOR">
                        <Processing />
                    </ProtectedVendorRoute>
                } />

                <Route path="/rejected-shop-creation/:unverifiedShopId" element={
                    <ProtectedVendorRoute role="ROLE_VENDOR">
                        <RejectedShopCreation />
                    </ProtectedVendorRoute>
                } />

                <Route path="/auth/unauthorized" element={<UnAuthorizedPage/>} />
                <Route path="/admin-dashboard/*"
                       element={
                           <ProtectedRoute role="ROLE_ADMIN">
                               <AdminDashboard/>
                           </ProtectedRoute>
                       }/>

                {/*<Route path="/payment" element={<Payment/>}/>*/}

            </Routes>
            <Auth/>
        </div>
    );
};

export default CustomRoute;