"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe, logout } from "@/store/slices/authSlice";
import { getCurrentCart } from "@/store/slices/cartSlice";
import { getWishlistApi } from "@/store/slices/wishlistSlice";

const InitiateData = ({ children }) => {
  const dispatch = useDispatch();
  //const { accessToken } = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch("/api/auth/get-cookie");
        const { accessToken } = await res.json();
        if (accessToken) {
          const data = await dispatch(getMe()).unwrap();
          if (data) {
            await dispatch(getCurrentCart());
            await dispatch(getWishlistApi());
          }
        }
      } catch (error) {
        console.log(error);
        dispatch(logout());
      }
    };
    fetchMe();
  }, [dispatch]);

  return <>{children}</>;
};

export default InitiateData;
