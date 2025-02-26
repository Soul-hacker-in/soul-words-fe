"use client";
import PageIllustration from "@/components/page-illustration";
import { Provider } from "react-redux";
import store from "../api/hello/store";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>

    <main className="relative flex grow flex-col">
      <PageIllustration multiple />

      {children}
    </main>
    </Provider>

  );
}