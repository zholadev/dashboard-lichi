import React from 'react';
import {cn} from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/shared/shadcn/ui/select";
import {Label} from "@/components/shared/shadcn/ui/label";
import {categories} from "@/components/shared/data/categories";

/**
 * @author Zholaman Zhumanov
 * @created 04.02.2024
 * @param props
 * @returns {*}
 * @constructor
 */
function FormSelectCategories(props) {
    const {defaultValue, onValueChange} = props

    return (
        <div className={cn("w-full flex flex-col gap-3")}>
            <Label>Категория товара</Label>
            <Select onValueChange={value => onValueChange(value)} defaultValue={defaultValue}>
                <SelectTrigger className="w-100">
                    <SelectValue placeholder="Категория товара"/>
                </SelectTrigger>
                <SelectContent>
                    {
                        categories.map((categoryItem, index) => {
                            return (
                                categoryItem?.["is_submenu"] ? (
                                    <SelectGroup className={cn("mb-3")} key={index}>
                                        <SelectLabel
                                            className={cn("mb-2 text-xs")}>{categoryItem.title}</SelectLabel>
                                        {
                                            categoryItem.items.map((childCategory) => {
                                                return (
                                                    <SelectItem
                                                        key={childCategory.id}
                                                        value={childCategory.category}>
                                                        {childCategory.title}
                                                    </SelectItem>
                                                )
                                            })
                                        }
                                    </SelectGroup>
                                ) : (
                                    <SelectItem
                                        key={index}
                                        value={categoryItem.category}
                                    >
                                        {categoryItem.title}
                                    </SelectItem>
                                )
                            )
                        })
                    }
                </SelectContent>
            </Select>
        </div>
    );
}

export default FormSelectCategories;
