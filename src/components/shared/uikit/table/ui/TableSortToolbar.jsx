import React from 'react';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/shared/shadcn/ui/dropdown-menu";
import {Button} from "@/components/shared/shadcn/ui/button";
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";
import {CaretDownIcon, CaretUpIcon, MixerHorizontalIcon} from "@radix-ui/react-icons";


/**
 * @author Zholaman Zhumanov
 * @created 02.02.2024
 * @param props
 * @returns {Element}
 * @constructor
 *
 */
function TableSortToolbar(props) {
    const {table, sortToolbar, checked, sortSelectHandler, sortData} = props

    const getSortDataItem = (id) => {
        try {
            return sortData[id]
        } catch (error) {
            errorHandler("sortToolbar", "getSortDataItem", error)
        }
    }

    if (!sortToolbar) {
        return null
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                >
                    <MixerHorizontalIcon className="mr-2 h-4 w-4"/>
                    Сортировка
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
                <DropdownMenuLabel>Сортировать по</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                {table
                    .getAllColumns()
                    .filter(
                        (column) =>
                            typeof column.accessorFn !== "undefined" && column.getCanSort()
                    )
                    .map((column) => {
                        const sortItem = getSortDataItem(column?.id)
                        return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize px-1 xs"
                                checked={checked}
                                onCheckedChange={(value) => {
                                    if (column.getCanSort()) {
                                        sortSelectHandler(column?.id, sortItem?.["sort"])
                                    }
                                }}
                            >
                                <h4 dangerouslySetInnerHTML={{__html: sortItem?.["label"]}}></h4>
                                {sortItem?.["sort"] === 1 ? (
                                    <CaretUpIcon className="ml-2 h-4 w-4"/>
                                ) : sortItem?.["sort"] === -1 ? (
                                    <CaretDownIcon
                                        className="ml-2 h-4 w-4"/>
                                ) : null}
                            </DropdownMenuCheckboxItem>
                        )
                    })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default TableSortToolbar;
