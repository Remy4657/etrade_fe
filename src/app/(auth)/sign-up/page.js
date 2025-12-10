'use client';
import { toast, Bounce } from 'react-toastify';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import AuthService from "@/services/auth.service"

const SignUp = () => {
    const router = useRouter();
    const [signupData, setSignupData] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data, e) => {
        setSignupData(data);
        const res = await AuthService.register({ ...data })
        console.log("res sign up: ", res)
        if (res.data.code === 200) {
            toast.success(res.data.message, {
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
            router.push("/sign-in")
        } else {
            toast.error(res.data.message, {
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
        }

    }


    return (
        <div className="axil-signin-form">
            <h3 className="title">I&apos;m New Here</h3>
            <p className="b2 mb--55">Enter your detail below</p>
            <form className="singin-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>User Name</label>
                    <input type="text" className="form-control" {...register('username', { required: true })} placeholder="admin" />
                    {errors.username && <p className="error">User Name is required.</p>}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} placeholder="annie@example.com" />
                    {errors.email && <p className="error">Email is required.</p>}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" {...register('password', { required: true, minLength: 4 })} />
                    {errors.password && <p className="error">Password is required.</p>}
                </div>
                <div className="form-group">
                    <button type="submit" className="axil-btn btn-bg-primary submit-btn">Create Account</button>
                    {signupData && <p className="success">Account Created successfully</p>}
                </div>
            </form>
        </div>
    );
}

export default SignUp;