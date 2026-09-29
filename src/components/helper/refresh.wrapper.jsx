"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMe, logout } from "@/store/slices/authSlice";
import { getCurrentCart } from "@/store/slices/cartSlice";
import { getWishlistApi } from "@/store/slices/wishlistSlice";
import { useSession } from "next-auth/react";

const InitiateData = ({ children }) => {
  const dispatch = useDispatch();
  //const { accessToken } = useSelector((state) => state.auth.userData);

  const { data: session, status } = useSession();
  const access_token = session?.access_token;
  useEffect(() => {
    const fetchMe = async () => {
      try {
        // const res = await fetch("/api/auth/get-cookie");
        // const { accessToken } = await res.json();
        // if (accessToken) {
        // }
        const isLogin = await localStorage.getItem("isLogin");
        if ((isLogin && isLogin == "true") || access_token) {
          const data = await dispatch(getMe()).unwrap();
          if (data) {
            await dispatch(getCurrentCart());
            await dispatch(getWishlistApi());
          }
        }
      } catch (error) {
        console.log(error);
        //  dispatch(logout());
      }
    };
    fetchMe();
  }, [access_token]);

  return <>{children}</>;
};

export default InitiateData;
