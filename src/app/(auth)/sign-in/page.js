'use client';
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, Bounce } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { useSession, signIn } from "next-auth/react";
import AuthLayout from "../layout";
import { loginUser } from "@/store/slices/authSlice";
import { getCurrentCart } from "@/store/slices/productSlice";

const SignIn = () => {
    const { data: session, status } = useSession();
    console.log("session: ", session)

    const dispatch = useDispatch();
    const router = useRouter();
    const [loginError, setLoginError] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {

        const resultAction = await dispatch(loginUser({ email: data.email, password: data.password }));
        if (resultAction.payload.code == 200) {
            dispatch(getCurrentCart())
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
    const handleLoginGoogle = async () => {
        signIn("google", { callbackUrl: "/" })
        // gắn access_token vào cookie
        const accessToken = session?.access_token
        await fetch(`${process.env.NEXT_URL}/api/auth/set-cookie`, {
            method: "POST",
            body: JSON.stringify({ accessToken }),
        })
    }

    return (
        <AuthLayout bgImage="bg_image--9">
            <div className="axil-signin-form">
                <h3 className="title">Sign in to eTrade.</h3>
                <p className="b2 mb--55">Enter your detail below</p>
                <form className="singin-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" {...register('email', { required: true })} defaultValue="test2@gmail.com" />
                        {errors.email && <p className="error">Email is required.</p>}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" {...register('password', { required: true, minLength: 4 })} defaultValue={123456} />
                        {errors.password && <p className="error">Password is required.</p>}
                    </div>
                    <div className="form-group d-flex align-items-center justify-content-between">
                        <button type="submit" className="axil-btn btn-bg-primary submit-btn ">Sign In</button>
                        <Link href="/forgot-password" className="forgot-btn">Forget password?</Link>
                        {loginError && <p className="error">User and Password doesn&apos;t match</p>}
                    </div>
                    {/* <hr style={{ height: "1px", backgroundColor: "#ccc", marginTop: "50px", marginBottom: "0px" }} /> */}
                    <div className="d-flex m-5"><span style={{ margin: "auto", fontSize: "12px" }}>OR</span></div>
                    <div className="form-group d-flex align-items-center justify-content-between">
                        <button
                            type="button"
                            class="btn"
                            style={{
                                fontSize: "14px",
                                fontWeight: "500",
                                border: "1px solid #ccc",
                                color: "#444",
                                backgroundColor: "#fff",
                                padding: "12px 16px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "10px"
                            }}
                            onClick={() => handleLoginGoogle()}>
                            <img
                                src="https://developers.google.com/identity/images/g-logo.png"
                                alt="Google"
                                style={{
                                    width: "22px",
                                    height: "22px"
                                }}
                            />
                            Continue with Google
                        </button>
                        {/* <button onClick={() => signIn("google")} className="axil-btn w-100">Sign In by Google</button> */}
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}

export default SignIn;