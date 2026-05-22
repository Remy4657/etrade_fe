"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "@/store/slices/authSlice";
import { logout } from "@/store/slices/authSlice";
import { getCurrentCart } from "@/store/slices/productSlice";
import { toast } from "react-toastify";

const InitiateData = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        await dispatch(getMe()).unwrap();
      } catch (error) {
        await dispatch(logout());
        // router.push("/sign-in");
      }
    };
    fetchMe();
  }, [dispatch]);

  return <>{children}</>;
};

export default InitiateData;
