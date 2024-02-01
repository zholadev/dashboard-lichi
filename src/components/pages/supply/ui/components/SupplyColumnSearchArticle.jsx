import React from 'react';
import {useApiRequest, useDispatchActionHandle} from "@/components/shared/hooks";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {apiGetItemSizes} from "@/components/shared/services/axios/clientRequests";
import {cn} from "@/lib/utils";
import {Input} from "@/components/shared/shadcn/ui/input";
import {Button} from "@/components/shared/shadcn/ui/button";
import {LoaderButton} from "@/components/shared/uikit/loader";

/**
 * @author Zholaman Zhumanov
 * @created 01.02.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function SupplyColumnSearchArticle(props) {
    const events = useDispatchActionHandle()

    const {apiFetchHandler, loading} = useApiRequest()

    const {supplyParamsArticleValue} = useAppSelector(state => state?.supply)

    const fetchGetItemSize = async (e) => {
        if (e) e.preventDefault()
        await apiFetchHandler(
            apiGetItemSizes,
            [supplyParamsArticleValue],
            false,
            {
                onGetData: (params) => {
                    if (params.success) {
                        events.supplySizeListDataAction(params.data?.["sizes"])
                    }
                }
            }
        )
    }

    return (
        <form className={cn("w-full")} onSubmit={fetchGetItemSize}>
            <div className={cn("mb-4")}>
                <Input
                    type="text"
                    id="name"
                    placeholder={'Введите артикул'}
                    onChange={event => events.supplyParamsArticleValueAction(event.target.value)}
                />
            </div>

            <div className={cn("flex justify-center items-center mb-5")}>
                <Button disabled={loading} type="submit" className={cn("w-[150px]")}>
                    <LoaderButton loading={loading}/>
                    Найти
                </Button>
            </div>
        </form>
    );
}

export default SupplyColumnSearchArticle;
