'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMe } from '@/store/slices/authSlice';
import { getCart } from '@/store/slices/productSlice';

const RefreshApp = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMe = async () => {
            dispatch(getMe())
            dispatch(getCart())
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

