'use client';
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, Bounce } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import AuthLayout from "../layout";
import { loginUser } from "@/store/slices/authSlice";

const SignIn = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [signInData, setSignInData] = useState(null);
    const [loginError, setLoginError] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const loginInfo = {
        email: "test1@gmail.com",
        password: "123456"
    }

    const onSubmit = async (data) => {

        const resultAction = await dispatch(loginUser({ email: data.email, password: data.password }));
        console.log("[res dispatch login]: ", resultAction)
        if (resultAction.payload.code == 200) {
            toast.success(resultAction.payload?.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            router.push("/");
        } else {
            toast.error(resultAction.payload?.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            setLoginError(true);
        }

    }

    return (
        <AuthLayout bgImage="bg_image--9">
            <div className="axil-signin-form">
                <h3 className="title">Sign in to eTrade.</h3>
                <p className="b2 mb--55">Enter your detail below</p>
                <form className="singin-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" {...register('email', { required: true })} defaultValue="test1@gmail.com" />
                        {errors.email && <p className="error">Email is required.</p>}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" {...register('password', { required: true, minLength: 4 })} defaultValue={123456} />
                        {errors.password && <p className="error">Password is required.</p>}
                    </div>
                    <div className="form-group d-flex align-items-center justify-content-between">
                        <button type="submit" className="axil-btn btn-bg-primary submit-btn">Sign In</button>
                        <Link href="/forgot-password" className="forgot-btn">Forget password?</Link>
                    </div>
                    {loginError && <p className="error">User and Password doesn&apos;t match</p>}
                </form>
            </div>
        </AuthLayout>
    );
}

export default SignIn;