import axiosClient from "@/utils/axios";
import { wishlistApi } from "@/api/api";

const WishlistService = {
    addToWishlist: (productId) => {
        return axiosClient.post(`${wishlistApi.WISHLIST}?productId=${productId}`);
    },
    getWishlist: () => {
        return axiosClient.get(`${wishlistApi.WISHLIST}`);
    },
    removeFromWishlist: (productId) => {
        return axiosClient.delete(`${wishlistApi.WISHLIST}?productId=${productId}`)
    },
};

module.exports = WishlistService