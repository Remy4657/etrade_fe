"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductSearchModal from "@/components/header/elements/ProductSearchModal";
import MiniCart from "@/components/header/elements/MiniCart";
import { miniCartHandler } from "@/store/slices/productSlice";
import { mobileMenu } from "@/store/slices/menuSlice";
import { useRouter } from "next/navigation";
import { logout } from "@/store/slices/authSlice";
import { useSession, signIn, signOut } from "next-auth/react";

const HeaderActions = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: session } = useSession();
  const userInfoGoogle = session?.user || null;
  const userInfoCre = useSelector((state) => state.auth);

  const getProducts = useSelector((state) => state.productData);

  const [searchToggle, setSearchToggle] = useState(false);
  const [accountDropdown, setaccountDropdown] = useState(false);

  const searchBoxToggleHandler = () => {
    setSearchToggle((toggler) => !toggler);
  };
  const accountDropdownToggler = () => {
    setaccountDropdown((toggler) => !toggler);
  };
  const cartHandler = (data) => {
    if (!userInfoCre.userData) {
      router.push("/sign-in");
      return;
    }
    dispatch(miniCartHandler(data));
  };

  const mobileMneuHandler = (data) => {
    dispatch(mobileMenu(data));
  };
  return (
    <div className="header-action">
      <ul className="action-list">
        {props.searchBox && (
          <li className="axil-search" onClick={searchBoxToggleHandler}>
            <input
              type="search"
              className="placeholder product-search-input"
              name="search2"
              placeholder="What are you looking forr?"
              autoComplete="off"
            />
            <button type="submit" className="icon wooc-btn-search">
              <i className="far fa-search" />
            </button>
          </li>
        )}
        {props.searchIcon && (
          <li className="axil-search axil-search-icon">
            <button
              className="header-search-icon"
              onClick={searchBoxToggleHandler}
            >
              <i className="far fa-search" />
            </button>
          </li>
        )}

        <li className="wishlist">
          <Link href="/wishlist">
            {getProducts.wishListQuantity > 0 && (
              <span className="cart-count">{getProducts.wishListQuantity}</span>
            )}
            <i className="far fa-heart" />
          </Link>
        </li>
        <li className="shopping-cart">
          <button
            className="cart-dropdown-btn"
            onClick={() => cartHandler(true)}
          >
            <span className="cart-count">{getProducts.cartQuantityTotal}</span>
            <i className="far fa-shopping-cart" />
          </button>
        </li>
        <li className="my-account">
          <button onClick={accountDropdownToggler}>
            {userInfoGoogle?.image ? (
              <Image
                src={userInfoGoogle?.image}
                alt="User avatar"
                height={30}
                width={30}
                className="rounded-circle"
              />
            ) : (
              <i className="far fa-user" />
            )}
          </button>
          <div
            className={`my-account-dropdown ${accountDropdown ? "open" : ""}`}
          >
            <ul>
              <li>
                <Link href="/dashboard/account-details">Tài khoản</Link>
              </li>
              <li>
                <Link href="/dashboard/orders">Đơn hàng</Link>
              </li>
              <li>
                {/* <Link href="dashboard/account-details">Settings</Link> */}
              </li>
            </ul>
            <div className="login-btn">
              {!userInfoCre?.login ? (
                <button
                  onClick={() => {
                    router.push("/sign-in");
                  }}
                  className="axil-btn btn-bg-primary"
                >
                  Đăng nhập
                </button>
              ) : (
                <button
                  onClick={async () => {
                    await dispatch(logout());
                    router.push("/sign-in");
                  }}
                  className="axil-btn btn-bg-primary"
                >
                  Đăng xuất
                </button>
              )}
            </div>
            {!userInfoCre?.login && (
              <div className="reg-footer text-center">
                Chưa có tài khoản?
                <Link href="/sign-up" className="btn-link">
                  ĐĂNG KÝ.
                </Link>
              </div>
            )}
          </div>
        </li>
        <li className="axil-mobile-toggle">
          <button
            className="menu-btn mobile-nav-toggler"
            onClick={() => mobileMneuHandler(true)}
          >
            <i className="fal fa-bars"></i>
          </button>
        </li>
      </ul>
      <MiniCart />
      {(props.searchIcon || props.searchBox) && (
        <ProductSearchModal
          toggleHandler={searchBoxToggleHandler}
          toggler={searchToggle}
        />
      )}
    </div>
  );
};

export default HeaderActions;
