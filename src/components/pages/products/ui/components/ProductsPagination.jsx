import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/shared/shadcn/ui/pagination";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {Skeleton} from "@/components/shared/shadcn/ui/skeleton";
import {cn} from "@/lib/utils";

/**
 * @author Zholaman Zhumanov
 * @created 26.01.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function ProductsPagination(props) {

    const {formData, productsData, apiLoader} = useAppSelector(state => state.products)

    if (apiLoader) {
        return <div className={cn("w-full flex justify-center items-center my-4")}>
            <div className={cn("w-max-[500px] flex flex-row flex-wrap md:gap-7 gap-5 items-center")}>
                <Skeleton className="w-[70px] h-[30px] rounded-2 mb-3"/>
                <Skeleton className="w-[30px] h-[30px] rounded-full mb-3"/>
                <Skeleton className="w-[30px] h-[30px] rounded-full mb-3"/>
                <Skeleton className="w-[30px] h-[30px] rounded-full mb-3"/>
                <Skeleton className="w-[70px] h-[30px] rounded-2 mb-3"/>
            </div>
        </div>
    }

    if (productsData.length === 0) {
        return null
    }

    return (
        <Pagination className={"mb-20"}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious title={"Назад"} href="#"/>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" isActive>
                        2
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis/>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext title={"Дальше"} href="#"/>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export default ProductsPagination;
