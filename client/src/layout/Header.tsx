"use client";
import {ConnectButton} from "@/components/common/ConnectButton";
import Link from "next/link";
import {ReactNode} from "react";

export function Header (): ReactNode {
    return (
            <header className="relative z-[1] flex flex-col w-full">
                <div className="flex items-center justify-between px-5 md:px-10 lg:px-[120px] pt-8 pb-6 md:py-6 lg:py-8">
                    <Link href="/">
                        <div className="relative cursor-pointer w-[85px] h-[15px] md:-ml-1 lg:-ml-2 md:w-[132px] md:h-[24.5px] lg:h-[31.5px] lg:w-[170px]">
                           <h1 className="font-bold text-3xl text-white">FitNess Buddy</h1>
                        </div>
                    </Link>
                    <div className="flex h-9 items-center md:h-10 lg:h-12">
                     <ConnectButton />
                    </div>
                </div>
            </header>
    )
}
