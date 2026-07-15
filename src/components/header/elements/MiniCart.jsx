import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCartItem,
  removeFromCartAPI,
  miniCartHandler,
} from "@/store/slices/cartSlice";

const MiniCart = () => {
  const dispatch = useDispatch();
  const getCarts = useSelector((state) => state.cart);
  const router = useRouter();

  const removeCartHandler = (data) => {
    dispatch(removeCartItem(data));
    dispatch(removeFromCartAPI(data.id));
  };
  const cartHandler = (data) => {
    dispatch(miniCartHandler(data));
  };

  const miniCartFooterBtnHandler = (data) => {
    router.push(data);
    dispatch(miniCartHandler(false));
  };

  return (
    <>
      <div className={`cart-dropdown ${getCarts.isMinicartOpen ? "open" : ""}`}>
        <div className="cart-content-wrap">
          <div className="cart-header">
            <h2 className="header-title">Giỏ hàng</h2>
            <button
              className="cart-close sidebar-close"
              onClick={() => cartHandler(false)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="cart-body">
            <ul className="cart-item-list">
              {getCarts?.cartItems?.length > 0 ? (
                getCarts.cartItems?.map((data, index) => (
                  <li className="cart-item" key={index}>
                    <div className="item-img">
                      <Image
                        src={data.thumbnail}
                        alt={data.title}
                        height={100}
                        width={100}
                      />
                      <button
                        className="close-btn"
                        onClick={() => removeCartHandler(data)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                    <div className="item-content">
                      <h3 className="item-title">{data.title}</h3>
                      <div className="item-price">
                        <span className="currency-symbol">$</span>
                        {data.salePrice ? data.salePrice : data.price}
                        <strong>x{data.cartQuantity}</strong>
                        <span> </span>
                        <span className="currency-symbol">
                          size: {data.productSize},
                        </span>
                        <span className="currency-symbol">
                          color: {data.productColor}
                        </span>
                      </div>
                      <div className="pro-qty item-quantity">
                        <input type="number" className="quantity-input" />
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <h4 className="text-center">Giỏ hàng trống</h4>
              )}
            </ul>
          </div>
          {getCarts?.cartItems?.length > 0 ? (
            <div className="cart-footer">
              <h3 className="cart-subtotal">
                <span className="subtotal-title">Tổng cộng:</span>
                <span className="subtotal-amount">
                  ${getCarts.cartTotalAmount}
                </span>
              </h3>
              <div className="group-btn">
                <button
                  className="axil-btn btn-bg-primary viewcart-btn"
                  onClick={() => miniCartFooterBtnHandler("/cart")}
                >
                  Xem giỏ hàng
                </button>
                <button
                  className="axil-btn btn-bg-secondary checkout-btn"
                  onClick={() => miniCartFooterBtnHandler("/checkout")}
                >
                  Thanh toán
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {getCarts.isMinicartOpen && (
        <div className="closeMask" onClick={() => cartHandler(false)}></div>
      )}
    </>
  );
};

export default MiniCart;
