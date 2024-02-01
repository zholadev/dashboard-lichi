'use client'

import React from 'react';
import {TableHead, TableHeader, TableRow} from "@/components/shared/shadcn/ui/table";

/**
 * @author Zholaman Zhumanov
 * @created 01.02.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function EventsTableHeader(props) {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className="w-[30px]"></TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Ежегодно?</TableHead>
                <TableHead>Наименование</TableHead>
                <TableHead></TableHead>
            </TableRow>
        </TableHeader>
    );
}

export default EventsTableHeader;
