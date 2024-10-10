import React, {useEffect} from 'react';
import './App.css';
import { CssBaseline, Divider, ThemeProvider } from "@mui/material";
import { lightTheme } from "./component/Theme/DarkTheme"; // Adjust import to reflect lightTheme
import CustomRoute from "./component/Routers/CustomRoute";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "./component/State/Authentication/Action";
import VendorDashboard from "./component/Vendor/VendorDashboard";


function App() {

    useEffect(() => {
        const isFirstRun = localStorage.getItem('firstRun');

        if (!isFirstRun) {
            // Clear all local storage data
            localStorage.clear();

            // Set the firstRun flag to true
            localStorage.setItem('firstRun', 'true');
        }
    }, []);


    return (
        <ThemeProvider theme={lightTheme}> {/* Directly use lightTheme */}
            <CssBaseline />
            {/*<NavbarHomePage />  No need to pass theme toggle props */}
            {/*<Divider />*/}
            {/*<Home />*/}
            {/*<VendorDashboard/>*/}
            <CustomRoute/>
            {/*for testing*/}
        </ThemeProvider>
    );
}

export default App;