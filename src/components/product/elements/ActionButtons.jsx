"use client";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToCartAPI,
  addToWishlist,
  addToQuickView,
} from "@/store/slices/productSlice";

const ActionButtons = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);

  const getWishlist = useSelector((state) => state.productData.wishlistItems);
  const isWishlistAdded = getWishlist.filter(
    (data) => data.id === props.productAction.id,
  );

  const handleAddToCart = (product) => {
    if (!userData?.login) {
      router.push("/sign-in");
      return;
    }
    dispatch(addToCart(product));
    dispatch(addToCartAPI({ productId: product.id, quantity: 1 }));
  };

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
  };

  const quickViewHandler = (product) => {
    dispatch(
      addToQuickView({
        viewItem: product,
        quickView: true,
      }),
    );
  };

  return (
    <ul className="cart-action">
      <li className="wishlist">
        <button onClick={() => handleAddToWishlist(props.productAction)}>
          <i
            className={
              isWishlistAdded.length === 1 ? "fas fa-heart" : "far fa-heart"
            }
          />
        </button>
      </li>

      {/* {props.cartBtn && (
        <li className="select-option">
          <button onClick={() => handleAddToCart(props.productAction)}>
            Thêm vào giỏ hànggg
          </button>
        </li>
      )} */}

      <li className="quickview">
        <button onClick={() => quickViewHandler(props.productAction)}>
          <i className="far fa-eye" />
        </button>
      </li>
    </ul>
  );
};

export default ActionButtons;
