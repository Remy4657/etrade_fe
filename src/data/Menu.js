const HeaderMenu = [
    {
        name: "Home",
        url: "/",
        hasChildren: false,
    },
    {
        name: "Shop",
        url: "/shop",
        hasChildren: false,
        children: [
            {
                name: "Shop",
                url: "/shop"
            },
            {
                name: "Shop Without Sidebar",
                url: "/shop?layout=no-sidebar"
            },
            {
                name: "Product Variation 1",
                url: "/products/43"
            },
            {
                name: "Product Variation 2",
                url: "/products/65"
            },
            {
                name: "Product Variation 3",
                url: "/products/2"
            },
            {
                name: "Product Variation 4",
                url: "/products/77"
            },
            {
                name: "Product Variation 5",
                url: "/products/19"
            }
        ]
    },

    {
        name: "About",
        url: "/about",
        hasChildren: false,

    },

    {
        name: "Contact",
        url: "/contact",
        hasChildren: false,

    },
]


const DashboardAsideMenu = [
    {
        icon: "fas fa-shopping-basket",
        name: "Đơn hàng",
        slug: "orders"
    },
    {
        icon: "fas fa-user",
        name: "Tài khoản",
        slug: "account-details"
    }
]

export { HeaderMenu, DashboardAsideMenu };