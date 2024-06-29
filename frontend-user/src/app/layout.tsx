import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./provider";
import UserContextProvider from '~/context/UserContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProCode: Code like a pro",
  description:
    "Want to learn how to code like a professional? Check out our websites",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
      <Providers>
      <UserContextProvider>{children}</UserContextProvider>
     <ToastContainer />
    </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
