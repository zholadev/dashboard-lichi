import React from 'react';
import {cn} from "@/lib/utils";
import {Heading} from "@/components/shared/uikit/heading";
import NotFileImg from '../../../../../../public/not-file-icon.png'

/**
 * @author Zholaman Zhumanov
 * @created 30.01.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function NotData(props) {
    return (
        <div className={cn("w-full h-[300px] flex justify-center flex-col items-center p-10")}>
            <Heading type={"h3"}>Нет данных!</Heading>
            <Heading type={"h4"} cls={cn("text-muted-foreground")}>Выберите другие настройки</Heading>

            <div>
                <img width={50} height={40} src={NotFileImg['src']} alt={'not file'}/>
            </div>
        </div>
    );
}

export default NotData;
