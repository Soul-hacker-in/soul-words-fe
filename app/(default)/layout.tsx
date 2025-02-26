"use client";

import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import Footer from "@/components/ui/footer";
import store from "../api/hello/store";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 600,
      easing: "ease-out-sine",
    });
  }, []);

  return (
    <>
    <Provider store={store}>
      <main className="relative flex grow flex-col">{children}</main>

      <Footer />
      </Provider>
    </>
  );
}
