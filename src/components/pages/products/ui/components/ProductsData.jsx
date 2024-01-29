'use client'

import React from 'react';
import {cn} from "@/lib/utils";
import Image from "next/image";
import {Heading} from "@/components/shared/uikit/heading";
import {Skeleton} from "@/components/shared/shadcn/ui/skeleton";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/shared/shadcn/ui/table";

/**
 * @author Zholaman Zhumanov
 * @created 26.01.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function ProductsData(props) {
    const {productsData, apiLoader} = useAppSelector(state => state.products)

    if (apiLoader) {
        return <div className={cn("w-full flex justify-center items-center my-4")}>
            <div className={cn("w-full flex flex-row flex-wrap md:gap-3 gap-1 items-center")}>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
            </div>
        </div>
    }

    if (productsData.length === 0) {
        return null
    }

    return (
        <div className={cn("w-100 border rounded mt-3")}>
            <Table className={cn("mb-3")}>
                <TableHeader>
                    <TableRow>
                        {Object.keys(productsData?.table?.head || {}).map((key) => (
                            <TableHead key={key}>
                                <h4 dangerouslySetInnerHTML={{__html: productsData?.table?.head[key].label}}></h4>
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object.values(productsData?.table?.data || {}).map((rowData) => {
                        return (
                            <TableRow key={rowData._id}>
                                {Object.keys(productsData?.table?.head || {}).map((key) => {
                                    return (
                                        <TableCell key={key}>
                                            {
                                                key === 'photo' ? (
                                                    <Image
                                                        width={60}
                                                        height={90}
                                                        src={rowData[key]}
                                                        alt={'...'}
                                                    />
                                                ) : (
                                                    <Heading type={"h4"}>{rowData[key]}</Heading>
                                                )
                                            }
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    );
}

export default ProductsData;
