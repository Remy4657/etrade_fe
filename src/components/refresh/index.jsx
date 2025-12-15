'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMe } from '@/store/slices/authSlice';

const RefreshApp = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("reload app")
        const fetchMe = async () => {
            dispatch(getMe())
        }
        fetchMe()
    }, [dispatch])

    return (
        <>
            {children}
        </>
    );
}

export default RefreshApp;

