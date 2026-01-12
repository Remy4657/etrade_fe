'use client';
import { useEffect } from 'react';
import { Providers } from '@/store/provider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/style.scss";
import { ToastContainer, Bounce } from 'react-toastify';
import RefreshApp from '@/helper/refresh';
import NextAuthWrapper from '@/helper/next.auth.wrapper';
import I18Provider from '@/provider/i18n';

const RootLayout = ({ children, params: { locale } }) => {
	useEffect(() => {
		window.bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
	}, []);


	return (
		<html lang={locale}>
			<head>
				<link rel="stylesheet" href="/css/font-awesome.css" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet" />
			</head>
			<body>
				<NextAuthWrapper>
					<Providers>
						<RefreshApp>
							{children}
						</RefreshApp>
						<ToastContainer
							position="top-right"
							autoClose={5000}
							hideProgressBar={true}
							newestOnTop={false}
							closeOnClick={false}
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme="light"
							transition={Bounce}
						/>
					</Providers>
				</NextAuthWrapper>

			</body>
		</html>
	);
}

export default RootLayout;

