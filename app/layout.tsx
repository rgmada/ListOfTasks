import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import Sidebar from "./Components/Sidebar/Sidebar";
import GlobalStyleProvider from "./Providers/GlobalStyleProvider";
import ContextProvider from "./Providers/ContextProvider";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import './globals.css';
import NextTopLoader from "nextjs-toploader";

const nunito = Nunito({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ToDoList",
  description: "Great way to track your tasks",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const {userId} = auth ();

  return (
    <ClerkProvider>
      <html lang="en">
        <head> 
              {/* <SignedOut>
                  <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn> */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        </head>
          <body className={nunito.className}>
          <NextTopLoader 
              height={2}
              color="#27AE60"
              easing="cubic-bezier(0.53,0.21,0,1)"
          />
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          <ContextProvider>
            <GlobalStyleProvider>
                {/* {userId && <Sidebar/>} */}
                <Sidebar/>
              <div className="w-full">{children}</div>
            </GlobalStyleProvider>
          </ContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
