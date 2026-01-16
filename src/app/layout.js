
import { ProviderRedux } from '@/store/provider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/style.scss";
import { ToastContainer, Bounce } from 'react-toastify';
import RefreshApp from '@/helper/refresh';
import NextAuthWrapper from '@/helper/next.auth.wrapper';

const RootLayout = ({ children }) => {
	return (
		<html>
			<head>
				<link rel="stylesheet" href="/css/font-awesome.css" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet" />
			</head>
			<body>
				<NextAuthWrapper>
					<ProviderRedux>
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
					</ProviderRedux>
				</NextAuthWrapper>


			</body>
		</html>
	);
}

export default RootLayout;

