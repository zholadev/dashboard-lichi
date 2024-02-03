import React, {useMemo, useState} from 'react';
import {useApiRequest, useDispatchActionHandle} from "@/components/shared/hooks";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";
import {ListSkeleton, NotData} from "@/components/shared/uikit/templates";
import {Input} from "@/components/shared/shadcn/ui/input";
import {cn} from "@/lib/utils";
import {DialogClose} from "@/components/shared/shadcn/ui/dialog";
import {Button} from "@/components/shared/shadcn/ui/button";
import {LoaderButton} from "@/components/shared/uikit/loader";
import {Heading} from "@/components/shared/uikit/heading";
import {apiCreateKanbanColumn} from "@/components/shared/services/axios/clientRequests";

/**
 * @author Zholaman Zhumanov
 * @created 01.02.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function SupplyColumnCreateForm(props) {
    const {weekId, updateKanbanData} = props

    const events = useDispatchActionHandle()

    const {apiFetchHandler, loading} = useApiRequest()

    const {
        supplyParamsNetworkId,
        supplySizeListData,
        supplySizeAmountValues,
        supplyParamsArticleValue
    } = useAppSelector(state => state?.supply)

    const [sizesAmounts, setSizes] = useState({})

    const isSizeListData = useMemo(() => {
        try {
            return Object.values(supplySizeListData || {}).length > 0
        } catch (error) {
            errorHandler("columnSearchArticle", "isSizeListData", error)
        }
    }, [supplySizeListData])

    const onChangeInputData = (key, newValue) => {
        setSizes(size => {
            return {
                ...size,
                [key]: newValue
            }
        });
    }

    const fetchCreateKanbanColumn = async (e) => {
        if (e) e.preventDefault()

        await apiFetchHandler(
            apiCreateKanbanColumn,
            [
                {
                    item: {
                        "sk_id": "",
                        "sk_week_id": weekId,
                        "sk_item_id": supplyParamsArticleValue,
                        "sk_network_id": supplyParamsNetworkId,
                        "sk_data": {
                            "amount_by_size": {
                                ...sizesAmounts
                            }
                        }
                    }
                }
            ],
            false,
            {
                onGetData: (params) => {
                    if (params.success) {
                        setSizes({})
                        events.supplySizeListDataAction("")
                        updateKanbanData()
                    }
                }
            }
        )
    }

    if (loading) {
        return <ListSkeleton/>
    }

    if (!isSizeListData) {
        return <NotData/>
    }

    return (
        <form onSubmit={fetchCreateKanbanColumn}>
            <div className={cn("mb-5")}>
                {
                    Object.values(supplySizeListData || {}).map((value, index) => {
                        return (
                            <div key={index}>
                                <Heading type={"h4"} cls={"mb-1"}>{value}</Heading>
                                <Input
                                    id={'size'}
                                    name={'size'}
                                    defaultValue={value}
                                    type={'number'}
                                    className={cn("mb-2")}
                                    onChange={event => onChangeInputData(value?.toLowerCase(), event.target.value)}
                                />
                            </div>
                        )
                    })
                }
            </div>

            <div className={cn("w-100 flex items-center justify-center gap-5")}>
                <DialogClose asChild>
                    <Button disabled={loading} variant={"secondary"}>Отмена</Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button disabled={loading} type="submit">
                        <LoaderButton loading={loading}/>
                        Сохранть
                    </Button>
                </DialogClose>
            </div>
        </form>
    );
}

export default SupplyColumnCreateForm;
