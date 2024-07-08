"use client";
import { redirect } from "next/navigation";

const HomePage: React.FC = () => {

    const token = localStorage.getItem('jwtToken');
    if (token) {
      redirect('/main/dashboard');
    } else {
      redirect('/login');
    };
}

export default HomePage;