import React, {useState} from 'react';
import {Alert, Button, Snackbar, Typography} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import InputField from "./InputField";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {loginUser} from "../State/Authentication/Action";  // For form validation



// Initial form values
const initialValues = {
    username: '',
    password: ''
};

// Validation schema using Yup
const validationSchema = Yup.object({
    username: Yup.string().required('Username or Email is required'),
    password: Yup.string().required('Password is required'),
});

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCloseSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackBarOpen(false);
    };

    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");

    // Handle form submission
    const handleSubmit = (values) => {

            dispatch(loginUser({userData: values, navigate}))
                .catch((error) => {
                    setSnackBarMessage(error.response.data.message);
                    setSnackBarOpen(true);
                });

    };

    return (



        <div>

            <Snackbar
                open={snackBarOpen}
                onClose={handleCloseSnackBar}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleCloseSnackBar}
                    severity="error"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {snackBarMessage}
                </Alert>
            </Snackbar>

            <Typography variant='h4' className='text-center'>
                Login
            </Typography>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema} // Add validation schema
                onSubmit={handleSubmit}  // Submit form values
            >
                {({ errors, touched }) => (
                    <Form>

                        {/* Username Field */}
                        <Field
                            as={InputField}
                            name='username'
                            label='Username or Email'
                            fullWidth
                            margin='normal'
                            error={touched.username && Boolean(errors.username)} // Show error
                            helperText={touched.username && errors.username} // Display error message
                        />

                        {/* Password Field */}
                        <Field
                            name="password"
                            label="Password"
                            margin="normal"
                            component={PasswordInput} // Render PasswordInput with Field
                        />

                        {/* Submit Button */}
                        <Button
                            sx={{
                                mt: 3, padding: "1rem", backgroundColor: '#019376', '&:hover': {
                                    color: 'white',
                                }
                            }}
                            fullWidth
                            type='submit'
                            variant='contained'
                        >
                            <span style={{color: "#FFFFFF"}}>Login</span>
                        </Button>

                    </Form>
                )}
            </Formik>

            <Typography sx={{mt: 3}} variant='body2' align='center'>

                Don't have an account?
                <Button
                    sx={{color: '#039375'}}
                    size='small'
                    onClick={() => navigate("/auth/register")}
                >
                    Register
                </Button>
            </Typography>
        </div>
    );
};

export default LoginForm;