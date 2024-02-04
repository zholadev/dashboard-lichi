import {Montserrat, Rubik} from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import NextTopLoader from "nextjs-toploader";
import 'react-toastify/dist/ReactToastify.css'
import {Header} from "@/components/widgets/header";
import {Slide, ToastContainer} from "react-toastify";
import {StoreProvider} from "@/components/entities/store";
import {ThemeProvider} from "@/components/shared/theme-provider";

const rubik = Rubik({subsets: ["latin"]});

export const metadata = {
    title: "Lichi Dashboard",
    description: "Generated by create next app",
};

export default function RootLayout({children}) {
    return (
        <StoreProvider>
            <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-background antialiased",
                    rubik.className
                )}
                translate={"no"}
            >
            <NextTopLoader
                color="#000"
                showSpinner={false}
                zIndex={10010}
            />
            <ToastContainer
                position={'top-right'}
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                className="toast-container"
                theme={"colored"}
                transition={Slide}
            />
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <Header/>
                <main className={cn("mb-10")}>
                    {children}
                </main>
            </ThemeProvider>
            </body>
            </html>
        </StoreProvider>
    );
}
