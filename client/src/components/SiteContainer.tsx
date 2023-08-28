import {Footer} from "@/layout/Footer";
import {Header} from "@/layout/Header";
import clsx from "clsx";
import {Space_Grotesk } from 'next/font/google';

const font = Space_Grotesk({subsets: ['latin']})
export default function ScreenContainer({children}: { children: JSX.Element}): JSX.Element {

    return (
        <div className={clsx("relative min-h-screen flex flex-col text-white", font.className)}>
            <Header />
            <div className="relative z-[1] flex-grow md:pb-12 lg:pb-20">
                <div>
                     <main>{children}</main>
                </div>
            </div>
            <div
                className={clsx(
                    "absolute top-0 left-0 z-auto h-full w-full bg-cover bg-local bg-clip-padding bg-top bg-no-repeat bg-origin-padding mix-blend-screen lg:bg-center",
                    "bg-[url('/background/background-1.jpeg')]"
                )}
            />
            <Footer />
        </div>
    );
}
