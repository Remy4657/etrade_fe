"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "@/store/slices/authSlice";
import { getCurrentCart } from "@/store/slices/productSlice";

const RefreshApp = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMe = async () => {
      dispatch(getMe());
      dispatch(getCurrentCart());
    };
    fetchMe();
  }, [dispatch]);

  return <>{children}</>;
};

export default RefreshApp;
