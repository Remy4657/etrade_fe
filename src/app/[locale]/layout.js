import { ProviderRedux } from '@/store/provider';
import { DM_Sans } from "next/font/google";
import "/public/css/font-awesome.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/style.scss";
import { ToastContainer, Flip } from 'react-toastify';
import InitiateData from '@/components/helper/refresh';
import NextAuthWrapper from '@/components/helper/next.auth.wrapper';
import I18Provider from '@/provider/i18n';
import Header from '@/components/helper/header';

const dmSans = DM_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	style: ["normal", "italic"],
	display: "swap"
});
const RootLayout = ({ children }) => {
	return (
		<html suppressHydrationWarning={true}>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
			</head>
			<body className={dmSans.className}>
				<NextAuthWrapper>
					<ProviderRedux>
						<I18Provider>
							<InitiateData>
								{
									<>
										<Header />
										{children}
									</>
								}
							</InitiateData>
							<ToastContainer

								position="top-right"
								autoClose={5000}
								hideProgressBar={false}
								newestOnTop
								closeOnClick
								rtl={false}
								pauseOnFocusLoss
								draggable
								pauseOnHover={false}
								theme="light"
								transition={Flip}
							/>
						</I18Provider>

					</ProviderRedux>
				</NextAuthWrapper>


			</body>
		</html>
	);
}

export default RootLayout;

