"use client"

import { searchAtom } from "@/store";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { isMobile } from "react-device-detect";

export function PaginationLinks({
    currentPage,
    totalPages,
}: React.PropsWithChildren<{
    currentPage: number;
    totalPages: number;
}>) {
    const search = useAtomValue(searchAtom);
    const pagesArray = Array(totalPages)
        .fill(null)
        .map((_, page) => page + 1);

    if(search !== '') {
        return null;    
    }

    return (
        <div className={`flex space-x-4 w-full items-center justify-center pt-8 ${isMobile && "px-4 pt-12"}`}>
            {pagesArray.map((page) => {
                const isSelected = page === currentPage;
                const className = isSelected
                    ? 'font-jekobold bg-[#FF4140] border-[#FF4140] text-white p-4 px-6 rounded-lg'
                    : 'hover:font-medium border rounded-lg p-4 px-6';

                return (
                    <Link key={page} className={className} href={`/?page=${page}`}>
                        {page}
                    </Link>
                );
            })}
        </div>
    );
}
