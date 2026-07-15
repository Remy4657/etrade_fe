'use client';
import { toast, Bounce } from 'react-toastify';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import authService from "@/services/auth.service"

const SignUp = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const password = watch('password');
    const onSubmit = async (data) => {
        try {
            const res = await authService.register({ ...data })

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
                router.push("sign-in")
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
        } catch (error) {
            if (error.response.data.code === 409) {
                toast.error(error.response.data.message, {
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

            } else {
                toast.error("Có lỗi xảy ra, vui lòng thử lại sau!", {
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
    }
    return (
        <div className="axil-signin-form">
            <h3 className="title">Hãy đăng ký để bắt đầu với MegaDeal!</h3>
            <p className="b2 mb--55"></p>

            <form className="singin-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label className="w-100 text-start">Tên người dùng</label>
                    <input type="text" className="form-control" {...register('username', { required: true })} placeholder="" />
                    {errors.username && <p className="error">Tên người dùng là trường bắt buộc.</p>}
                </div>
                <div className="form-group">
                    <label className="w-100 text-start">Email</label>
                    <input type="email" className="form-control" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} placeholder="example@gmail.com" />
                    {errors.email && <p className="error">Email là trường bắt buộc.</p>}
                </div>
                <div className="form-group">
                    <label className="w-100 text-start">Mật khẩu</label>
                    <input type="password" className="form-control" {...register('password', { required: true, minLength: 6 })} />
                    {errors.password && errors.password.type === 'required' && <p className="error">Mật khẩu là trường bắt buộc.</p>}
                    {errors.password && errors.password.type === 'minLength' && <p className="error">Mật khẩu phải có ít nhất 6 ký tự.</p>}
                </div>
                {/* Trường Xác nhận mật khẩu */}
                <div className="form-group">
                    <label className="w-100 text-start">Xác nhận mật khẩu</label>
                    <input
                        type="password"
                        className="form-control"
                        {...register('confirmPassword', {
                            required: 'Vui lòng xác nhận mật khẩu.',
                            validate: (value) =>
                                value === password || 'Mật khẩu xác nhận không khớp.'
                        })}
                    />
                    {errors.confirmPassword && (
                        <p className="error">{errors.confirmPassword.message}</p>
                    )}
                </div>
                <div className="form-group">
                    <button type="submit" className="axil-btn btn-bg-primary submit-btn">Tạo tài khoản</button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;