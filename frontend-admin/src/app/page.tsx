"use client";
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

const HomePage: React.FC = () => {

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      redirect('/main');
    } else {
      redirect('/login');
    }
  });
  return null;
}
export default HomePage;