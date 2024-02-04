import React, {useMemo, useState} from 'react';
import {cn} from "@/lib/utils";
import {Heading} from "@/components/shared/uikit/heading";
import {Input} from "@/components/shared/shadcn/ui/input";
import {Button} from "@/components/shared/shadcn/ui/button";
import {LoaderButton} from "@/components/shared/uikit/loader";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {ListSkeleton, NotData} from "@/components/shared/uikit/templates";
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";
import {useApiRequest, useDispatchActionHandle} from "@/components/shared/hooks";
import {apiCreateKanbanColumn} from "@/components/shared/services/axios/clientRequests";

/**
 * @author Zholaman Zhumanov
 * @created 04.02.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function SupplyUpdateItemKanbanModal(props) {
    const {id, weekId, updateKanbanData, data, article, closeModalHandle} = props

    const events = useDispatchActionHandle()

    const {apiFetchHandler, loading} = useApiRequest()

    const {
        supplyParamsNetworkId,
    } = useAppSelector(state => state?.supply)

    const [sizesAmounts, setSizes] = useState({})

    const isSizeListData = useMemo(() => {
        try {
            return Object.values(data || {}).length > 0
        } catch (error) {
            errorHandler("updateKanbanItem", "isSizeListData", error)
        }
    }, [data])

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
                        "sk_id": id,
                        "sk_week_id": weekId,
                        "sk_item_id": article,
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
                        updateKanbanData()
                        closeModalHandle()
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
                    Object.entries(data || {}).map(([key, value], index) => {
                        return (
                            <div key={index}>
                                <Heading type={"h4"} cls={"mb-1"}>{key?.toUpperCase()}</Heading>
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
                <Button variant={"outline"} disabled={loading} type="button" onClick={closeModalHandle}>
                    Отмена
                </Button>
                <Button disabled={loading} type="submit">
                    <LoaderButton loading={loading}/>
                    Сохранть
                </Button>
            </div>
        </form>
    );
}

export default SupplyUpdateItemKanbanModal;
