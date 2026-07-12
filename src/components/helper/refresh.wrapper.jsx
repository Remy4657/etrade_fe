"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "@/store/slices/authSlice";
import { logout } from "@/store/slices/authSlice";

const InitiateData = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        await dispatch(getMe()).unwrap();
      } catch (error) {
        await dispatch(logout());
      }
    };
    fetchMe();
  }, [dispatch]);

  return <>{children}</>;
};

export default InitiateData;
