import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./provider";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProCode: Code like a pro",
  description:
    "Want to learn how to code like a professional? Check out our websites",
};

const SignupLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      {children}
    </Providers>
  );
};

export default SignupLayout;
