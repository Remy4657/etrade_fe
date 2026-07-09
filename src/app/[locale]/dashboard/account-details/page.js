'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from "react-redux";

const AccountDetails = () => {
    const { userData } = useSelector((state) => state.auth);

    const [userAccountInfo, setUserAccountInfo] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const userInfoHandler = (data) => {
        setUserAccountInfo(data);
    }

    return (
        <div className="axil-dashboard-account">
            <form className="account-details-form" onSubmit={handleSubmit(userInfoHandler)}>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Tên người dùng</label>
                            <input type="text" className="form-control" {...register('firstName', { required: true })} defaultValue={userData?.username} />
                            {errors.firstName && <p className="error">First Name is required.</p>}
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" {...register('lastName', { required: true })} defaultValue={userData?.email} />
                            {errors.lastName && <p className="error">Last Name is required.</p>}
                        </div>
                    </div>

                    <div className="col-12">
                        <h5 className="title">Thay đổi mật khẩu</h5>
                        <div className="form-group">
                            <label>Mật khẩu</label>
                            <input type="password" className="form-control" defaultValue={1201112131415} />
                        </div>
                        <div className="form-group">
                            <label>Mật khẩu mới</label>
                            <input type="password" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Xác nhận mật khẩu mới</label>
                            <input type="password" className="form-control" />
                        </div>
                        <div className="form-group mb--0">
                            <input type="submit" className="axil-btn" defaultValue="Lưu thay đổi" />
                        </div>
                    </div>
                </div>
            </form>
        </div>

    );
}

export default AccountDetails;