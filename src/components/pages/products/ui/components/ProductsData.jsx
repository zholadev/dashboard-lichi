'use client'

import React, {useCallback} from 'react';
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
                        {
                            Object.entries(productsData?.table?.head || {}).map(([key, value], index) => {
                                return (
                                    <TableHead key={index}>
                                        <h4 dangerouslySetInnerHTML={{__html: value.label}}/>
                                    </TableHead>
                                )
                            })
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        Object.entries(productsData?.table?.data || {}).map(([key, value], index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>
                                        {
                                            value?.["phtot"] ?
                                                <Image
                                                    width={60}
                                                    height={90}
                                                    src={value.photo}
                                                    alt={value.category}
                                                />
                                                :
                                                <Heading type={"h4"}>{value?.article}</Heading>
                                        }

                                    </TableCell>
                                    <TableCell className="font-light w-[230px]">
                                        <Heading type={"h4"}>{value.article}</Heading>
                                        <Heading type={"h4"}>{value.category}</Heading>
                                    </TableCell>
                                    <TableCell className="font-light">
                                        <Heading type={"h4"}>{value.sale}</Heading>
                                    </TableCell>
                                    <TableCell className="font-light">
                                        <Heading type={"h4"}>{value.refund}</Heading>
                                    </TableCell>
                                    <TableCell className="font-light">
                                        <Heading type={"h4"}>{value.sale_ae}</Heading>
                                    </TableCell>
                                    <TableCell className="font-light">
                                        <Heading type={"h4"}>{value.refund_ae}</Heading>
                                    </TableCell>
                                    <TableCell className="font-light">
                                        <Heading type={"h4"}>{value.sale_ru}</Heading>
                                    </TableCell>
                                    <TableCell className="font-light">
                                        <Heading type={"h4"}>{value.refund_ru}</Heading>
                                    </TableCell>
                                    <TableCell className="font-light">
                                        <Heading type={"h4"}>{value.sale_kz}</Heading>
                                    </TableCell>
                                    <TableCell className="font-light">
                                        <Heading type={"h4"}>{value.refund_kz}</Heading>
                                    </TableCell>
                                    <TableCell className="font-light">
                                        <Heading type={"h4"}>{value.sale_im}</Heading>
                                    </TableCell>
                                    <TableCell className="font-light">
                                        <Heading type={"h4"}>{value.refund_im}</Heading>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    );
}

export default ProductsData;
