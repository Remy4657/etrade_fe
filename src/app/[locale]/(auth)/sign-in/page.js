'use client';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { toast, Flip, Bounce } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { useSession, signIn } from "next-auth/react";
import AuthLayout from "../layout";
import { loginUser } from "@/store/slices/authSlice";
import { getCurrentCart } from "@/store/slices/productSlice";

const SignIn = () => {
    const { data: session, status } = useSession();
    const dispatch = useDispatch();
    const router = useRouter();
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
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,
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
        }

    }
    const handleLoginGoogle = async () => {
        signIn("google", { callbackUrl: "/" })
    }

    return (
        <AuthLayout bgImage="bg_image--9">
            <div className="axil-signin-form">
                <h3 className="title">Đăng nhập vào MegaDeal.</h3>
                <p className="b2 mb--55">Chào mừng bạn đến với MegaDeal</p>
                <form className="singin-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" {...register('email', { required: true })} defaultValue="test2@gmail.com" />
                        {errors.email && <p className="error">Email là trường bắt buộc.</p>}
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input type="password" className="form-control" {...register('password', { required: true, minLength: 6 })} defaultValue={123456} />
                        {errors.password && errors.password.type === 'required' && <p className="error">Mật khẩu là trường bắt buộc.</p>}
                        {errors.password && errors.password.type === 'minLength' && <p className="error">Mật khẩu phải có ít nhất 6 ký tự.</p>}
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                        <button type="submit" className="axil-btn btn-bg-primary submit-btn m-auto">Đăng nhập</button>
                        {/* <Link href="/forgot-password" className="forgot-btn">Forget password?</Link> */}

                    </div>

                    <div className="d-flex align-items-center my-5 justify-content-center">
                        <div className="border-top w-25"></div>
                        <span className="px-3 text-muted">Hoặc</span>
                        <div className="border-top w-25"></div>
                    </div>


                    <div className="form-group d-flex align-items-center justify-content-between">
                        <button
                            type="button"
                            className="btn"
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
                            <Image
                                src="/images/logo/google.png"
                                alt="Google"
                                width={20}
                                height={20}

                            />
                            Tiếp tục bằng tài khoản Google
                        </button>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}

export default SignIn;