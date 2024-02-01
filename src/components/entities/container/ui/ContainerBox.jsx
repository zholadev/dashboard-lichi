import React from 'react';
import {cn} from "@/lib/utils";

function ContainerBox(props) {
    const {children, cls} = props

    return (
        <div className={cn("py-4 md:px-5 px-2 w-full border rounded mb-5", cls)}>
            {children}
        </div>
    );
}

export default ContainerBox;
