import React, {useCallback, useEffect, useRef, useState} from 'react';

import {Command as CommandPrimitive} from 'cmdk';
import {Cross1Icon} from "@radix-ui/react-icons";
import {Badge} from "@/components/shared/shadcn/ui/badge";
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";
import {Command, CommandGroup, CommandItem} from "@/components/shared/shadcn/ui/command";

/**
 * @author Zholaman Zhumanov
 * @created 03,.02.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function MultiSelect(props) {
    const {data, getValueSelected} = props

    const inputRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleUnselect = useCallback((item) => {
        setSelected(prev => prev.filter(s => s.value !== item.value));
    }, []);

    const handleKeyDown = useCallback((e) => {
        const input = inputRef.current;
        if (input) {
            if (e.key === 'Delete' || e.key === 'Backspace') {
                if (input.value === '') {
                    setSelected(prev => {
                        const newSelected = [...prev];
                        newSelected.pop();
                        return newSelected;
                    });
                }
            }
            if (e.key === 'Escape') {
                input.blur();
            }
        }
    }, []);

    const selectables = data.filter(item => !selected.includes(item));

    useEffect(() => {
        try {
            const getAllSelectedValues = selected.map(item => item.value);
            getValueSelected(getAllSelectedValues)
        } catch (error) {
            errorHandler("multiSelect", "effect", error)
        }
    }, [selected]);

    return (
        <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
            <div
                className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <div className="flex gap-1 flex-wrap">
                    {selected.map((selected) => (
                        <Badge key={selected.value} variant="secondary">
                            {selected.label}
                            <button
                                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleUnselect(selected);
                                    }
                                }}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                                onClick={() => handleUnselect(selected)}
                            >
                                <Cross1Icon className="h-3 w-3 text-muted-foreground hover:text-foreground"/>
                            </button>
                        </Badge>
                    ))}
                    <CommandPrimitive.Input
                        ref={inputRef}
                        value={inputValue}
                        onValueChange={setInputValue}
                        onBlur={() => setOpen(false)}
                        onFocus={() => setOpen(true)}
                        placeholder="Выберите"
                        className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
                    />
                </div>
            </div>
            <div className="relative mt-2">
                {open && selectables.length > 0 ? (
                    <div
                        className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                        <CommandGroup className="h-full overflow-auto">
                            {selectables.map((select) => (
                                <CommandItem
                                    key={select.value}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onSelect={(value) => {
                                        setInputValue("");
                                        setSelected(prev => [...prev, select]);
                                    }}
                                    className={"cursor-pointer"}
                                >
                                    {select.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </div>
                ) : null}
            </div>
        </Command>
    );
}

export default MultiSelect;
