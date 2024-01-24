import {Montserrat} from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import {ThemeProvider} from "@/components/shared/theme-provider";
import {Header} from "@/components/widgets/header";
import {Footer} from "@/components/widgets/footer";
import NextTopLoader from "nextjs-toploader";

const inter = Montserrat({subsets: ["latin"]});

export const metadata = {
    title: "Lichi Dashboard",
    description: "Generated by create next app",
};

export default function RootLayout({children, params}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={cn(
                "min-h-screen bg-background antialiased",
                inter.className
            )}
            translate={"no"}
        >
        <NextTopLoader
            color="#000"
            showSpinner={false}
            zIndex={10010}
        />
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Header/>
            <main>
                {children}
            </main>
        </ThemeProvider>
        </body>
        </html>
    );
}
