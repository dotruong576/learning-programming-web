import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./provider";
import UserContextProvider from '~/context/UserContext';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProCode: Code like a pro",
  description:
    "Want to learn how to code like a professional? Check out our websites",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <UserContextProvider>{children}</UserContextProvider>
    </Providers>
  );
};

export default RootLayout;
