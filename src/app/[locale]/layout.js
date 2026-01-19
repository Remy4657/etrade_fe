
import { ProviderRedux } from '@/store/provider';
import { DM_Sans } from "next/font/google";
import "/public/css/font-awesome.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/style.scss";
import { ToastContainer, Bounce } from 'react-toastify';
import InitiateData from '@/helper/refresh';
import NextAuthWrapper from '@/helper/next.auth.wrapper';
import I18Provider from '@/provider/i18n';

const dmSans = DM_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	style: ["normal", "italic"],
	display: "swap"
});
const RootLayout = ({ children }) => {
	return (
		<html>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				{/* <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet" /> */}
			</head>
			<body className={dmSans.className}>
				<NextAuthWrapper>
					<ProviderRedux>
						<I18Provider>
							<InitiateData>
								{children}
							</InitiateData>
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
						</I18Provider>

					</ProviderRedux>
				</NextAuthWrapper>


			</body>
		</html>
	);
}

export default RootLayout;

