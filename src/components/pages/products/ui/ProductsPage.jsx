'use client'

import React, {useState} from 'react';
import {cn} from "@/lib/utils";
import {CalendarIcon} from "lucide-react";
import {addDays, format} from "date-fns";
import {Label} from "@/components/shared/ui/label";
import {Input} from "@/components/shared/ui/input";
import {Switch} from "@/components/shared/ui/switch";
import {Button} from "@/components/shared/ui/button";
import {Calendar} from "@/components/shared/ui/calendar";
import {Heading} from "@/components/shared/uikit/heading";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/shared/ui/pagination"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/shared/ui/popover";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/shared/ui/select";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/shared/ui/table";
import Image from "next/image";

/**
 * @author Zholaman Zhumanov
 * @created 23.01.2024
 * @todo refactoring
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function ProductsPage(props) {
    const [date, setDate] = useState({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    })

    const [groupByStores, setGroupByStores] = useState(false)

    const api_data_ex = {
        "$pipeline": [
            {
                "$match": {
                    "date_utc": {
                        "$gte": {
                            "$date": {
                                "$numberLong": "1705363200000"
                            }
                        },
                        "$lte": {
                            "$date": {
                                "$numberLong": "1706054399000"
                            }
                        }
                    },
                    "article": {
                        "$nin": [
                            {
                                "$regex": "^pckg",
                                "$options": "i"
                            },
                            {
                                "$regex": "^nn",
                                "$options": "i"
                            },
                            {
                                "$regex": "^srt",
                                "$options": "i"
                            },
                            {
                                "$regex": "^shpr",
                                "$options": "i"
                            },
                            {
                                "$regex": "^box",
                                "$options": "i"
                            }
                        ]
                    }
                }
            },
            {
                "$lookup": {
                    "from": "1c_goods_g_art",
                    "localField": "article",
                    "foreignField": "_id",
                    "as": "good"
                }
            },
            {
                "$project": {
                    "article": 1,
                    "good": {
                        "$first": "$good"
                    },
                    "sale_kz": {
                        "$cond": [
                            {
                                "$and": [
                                    {
                                        "$eq": [
                                            "$type",
                                            "sale"
                                        ]
                                    },
                                    {
                                        "$eq": [
                                            "$warehouse.isFranchise",
                                            false
                                        ]
                                    },
                                    {
                                        "$eq": [
                                            "$warehouse.country",
                                            "Казахстан"
                                        ]
                                    },
                                    {
                                        "$eq": [
                                            "$warehouse.forReport",
                                            true
                                        ]
                                    }
                                ]
                            },
                            "$amount",
                            0
                        ]
                    },
                    "sale_ru": {
                        "$cond": [
                            {
                                "$and": [
                                    {
                                        "$eq": [
                                            "$type",
                                            "sale"
                                        ]
                                    },
                                    {
                                        "$eq": [
                                            "$warehouse.isFranchise",
                                            false
                                        ]
                                    },
                                    {
                                        "$eq": [
                                            "$warehouse.country",
                                            "Россия"
                                        ]
                                    },
                                    {
                                        "$eq": [
                                            "$warehouse.forReport",
                                            true
                                        ]
                                    }
                                ]
                            },
                            "$amount",
                            0
                        ]
                    },
                    "sale_im": {
                        "$cond": [
                            {
                                "$and": [
                                    {
                                        "$eq": [
                                            "$type",
                                            "sale"
                                        ]
                                    },
                                    {
                                        "$eq": [
                                            "$warehouse.isFranchise",
                                            false
                                        ]
                                    },
                                    {
                                        "$in": [
                                            "$warehouse.country",
                                            [
                                                "США",
                                                "UK",
                                                "Germany",
                                                "WorldWide",
                                                "Europe"
                                            ]
                                        ]
                                    },
                                    {
                                        "$eq": [
                                            "$warehouse.forReport",
                                            true
                                        ]
                                    }
                                ]
                            },
                            "$amount",
                            0
                        ]
                    },
                    "sale_ae": {
                        "$cond": [
                            {
                                "$and": [
                                    {
                                        "$eq": [
                                            "$type",
                                            "sale"
                                        ]
                                    },
                                    {
                                        "$eq": [
                                            "$warehouse.isFranchise",
                                            false
                                        ]
                                    },
                                    {
                                        "$in": [
                                            "$warehouse.country",
                                            [
                                                "ОАЭ"
                                            ]
                                        ]
                                    },
                                    {
                                        "$eq": [
                                            "$warehouse.forReport",
                                            true
                                        ]
                                    }
                                ]
                            },
                            "$amount",
                            0
                        ]
                    },
                    "refund_kz": {
                        "$cond": [
                            {
                                "$and": [
                                    {
                                        "$eq": [
                                            "$type",
                                            "refund"
                                        ]
                                    },
                                    {
                                        "$eq": [
                                            "$warehouse.isFranchise",
                                            false
                                        ]
                                    },
                                    {
                                        "$eq": [
                                            "$warehouse.country",
                                            "Казахстан"
                                        ]
                                    },
                                    {
                                        "$eq": [
                                            "$warehouse.forReport",
                                            true
                                        ]
                                    }
                                ]
                            },
                            "$amount",
                            0
                        ]
                    },
                    "refund_ru": {
                        "$cond": [
                            {
                                "$and": [
                                    {
                                        "$eq": [
                                            "$type",
                                            "refund"
                                        ]
                                    },
                                    {
                                        "$eq": [
                                            "$warehouse.isFranchise",
                                            false
                                        ]
                                    },
                                    {
                                        "$eq": [
                                            "$warehouse.country",
                                            "Россия"
                                        ]
                                    },
                                    {
                                        "$eq": [
                                            "$warehouse.forReport",
                                            true
                                        ]
                                    }
                                ]
                            },
                            "$amount",
                            0
                        ]
                    },
                    "refund_im": {
                        "$cond": [
                            {
                                "$and": [
                                    {
                                        "$eq": [
                                            "$type",
                                            "refund"
                                        ]
                                    },
                                    {
                                        "$eq": [
                                            "$warehouse.isFranchise",
                                            false
                                        ]
                                    },
                                    {
                                        "$in": [
                                            "$warehouse.country",
                                            [
                                                "США",
                                                "UK",
                                                "Germany",
                                                "WorldWide",
                                                "Europe"
                                            ]
                                        ]
                                    },
                                    {
                                        "$eq": [
                                            "$warehouse.forReport",
                                            true
                                        ]
                                    }
                                ]
                            },
                            "$amount",
                            0
                        ]
                    },
                    "refund_ae": {
                        "$cond": [
                            {
                                "$and": [
                                    {
                                        "$eq": [
                                            "$type",
                                            "refund"
                                        ]
                                    },
                                    {
                                        "$eq": [
                                            "$warehouse.isFranchise",
                                            false
                                        ]
                                    },
                                    {
                                        "$in": [
                                            "$warehouse.country",
                                            [
                                                "ОАЭ"
                                            ]
                                        ]
                                    },
                                    {
                                        "$eq": [
                                            "$warehouse.forReport",
                                            true
                                        ]
                                    }
                                ]
                            },
                            "$amount",
                            0
                        ]
                    }
                }
            },
            {
                "$group": {
                    "_id": "$article",
                    "good": {
                        "$last": "$good"
                    },
                    "sale_kz": {
                        "$sum": "$sale_kz"
                    },
                    "refund_kz": {
                        "$sum": "$refund_kz"
                    },
                    "sale_ae": {
                        "$sum": "$sale_ae"
                    },
                    "refund_ae": {
                        "$sum": "$refund_ae"
                    },
                    "sale_ru": {
                        "$sum": "$sale_ru"
                    },
                    "refund_ru": {
                        "$sum": "$refund_ru"
                    },
                    "sale_im": {
                        "$sum": "$sale_im"
                    },
                    "refund_im": {
                        "$sum": "$refund_im"
                    },
                    "sale": {
                        "$sum": {
                            "$add": [
                                "$sale_kz",
                                "$sale_ru",
                                "$sale_im",
                                "$sale_ae"
                            ]
                        }
                    },
                    "refund": {
                        "$sum": {
                            "$add": [
                                "$refund_kz",
                                "$refund_ru",
                                "$refund_im",
                                "$refund_ae"
                            ]
                        }
                    }
                }
            },
            {
                "$facet": {
                    "metadata": [
                        {
                            "$group": {
                                "_id": null,
                                "total": {
                                    "$sum": 1
                                }
                            }
                        }
                    ],
                    "data": [
                        {
                            "$sort": {
                                "sale": -1
                            }
                        },
                        {
                            "$skip": 0
                        },
                        {
                            "$limit": 20
                        }
                    ]
                }
            },
            {
                "$project": {
                    "data": 1,
                    "total": {
                        "$arrayElemAt": [
                            "$metadata.total",
                            0
                        ]
                    }
                }
            }
        ],
        "table": {
            "group_by": null,
            "head": {
                "photo": {
                    "style": "width:100px;min-width:100px;max-width:100px;text-align:center",
                    "label": "Фото",
                    "row_class": "text-center"
                },
                "name": {
                    "label": "Товар",
                    "export_fn": {}
                },
                "sale": {
                    "sort": -1,
                    "style": "width:100px;min-width:100px;max-width:100px;text-align:center",
                    "label": "Продажи<br/><small>ВСЕГО</small>",
                    "row_class": "text-center,--col-stripe",
                    "export_fn": true,
                    "active": true
                },
                "refund": {
                    "sort": 1,
                    "style": "width:100px;min-width:100px;max-width:100px;text-align:center",
                    "label": "Возвраты<br/><small>ВСЕГО</small>",
                    "row_class": "text-center,--col-stripe",
                    "export_fn": true
                },
                "sale_ae": {
                    "sort": 1,
                    "style": "width:100px;min-width:100px;max-width:100px;text-align:center",
                    "label": "Продажи<br/><small>UAE</small>",
                    "row_class": "text-center",
                    "export_fn": true
                },
                "refund_ae": {
                    "sort": 1,
                    "style": "width:100px;min-width:100px;max-width:100px;text-align:center",
                    "label": "Возвраты<br/><small>UAE</small>",
                    "row_class": "text-center",
                    "export_fn": true
                },
                "sale_ru": {
                    "sort": 1,
                    "style": "width:100px;min-width:100px;max-width:100px;text-align:center",
                    "label": "Продажи<br/><small>РОССИЯ</small>",
                    "row_class": "text-center,--col-stripe",
                    "export_fn": true
                },
                "refund_ru": {
                    "sort": 1,
                    "style": "width:100px;min-width:100px;max-width:100px;text-align:center",
                    "label": "Возвраты<br/><small>РОССИЯ</small>",
                    "row_class": "text-center,--col-stripe",
                    "export_fn": true
                },
                "sale_kz": {
                    "sort": 1,
                    "style": "width:100px;min-width:100px;max-width:100px;text-align:center",
                    "label": "Продажи<br/><small>КАЗАХСТАН</small>",
                    "row_class": "text-center",
                    "export_fn": true
                },
                "refund_kz": {
                    "sort": 1,
                    "style": "width:100px;min-width:100px;max-width:100px;text-align:center",
                    "label": "Возвраты<br/><small>КАЗАХСТАН</small>",
                    "row_class": "text-center",
                    "export_fn": true
                },
                "sale_im": {
                    "sort": 1,
                    "style": "width:100px;min-width:100px;max-width:100px;text-align:center",
                    "label": "Продажи<br/><small>ИМ</small>",
                    "row_class": "text-center,--col-stripe",
                    "export_fn": true
                },
                "refund_im": {
                    "sort": 1,
                    "style": "width:100px;min-width:100px;max-width:100px;text-align:center",
                    "label": "Возвраты<br/><small>ИМ</small>",
                    "row_class": "text-center,--col-stripe",
                    "export_fn": true
                }
            },
            "data": [
                {
                    "_id": "dr05243",
                    "sale_kz": 0,
                    "refund_kz": 0,
                    "sale_ae": 0,
                    "refund_ae": 0,
                    "sale_ru": 108,
                    "refund_ru": 17,
                    "sale_im": 0,
                    "refund_im": 0,
                    "sale": 108,
                    "refund": 17,
                    "article": "dr05243",
                    "photo": "https://app3.lichishop.com/add-ons/get_image_by_art/from_1c.php?art=dr05243&size=xs",
                    "category": "Платье"
                },
                {
                    "_id": "dr05117",
                    "sale_kz": 4,
                    "refund_kz": 0,
                    "sale_ae": 0,
                    "refund_ae": 0,
                    "sale_ru": 76,
                    "refund_ru": 4,
                    "sale_im": 0,
                    "refund_im": 0,
                    "sale": 80,
                    "refund": 4,
                    "article": "dr05117",
                    "photo": "https://app3.lichishop.com/add-ons/get_image_by_art/from_1c.php?art=dr05117&size=xs",
                    "category": "Платье"
                },
                {
                    "_id": "tsh0086",
                    "sale_kz": 0,
                    "refund_kz": 0,
                    "sale_ae": 0,
                    "refund_ae": 0,
                    "sale_ru": 79,
                    "refund_ru": 0,
                    "sale_im": 0,
                    "refund_im": 0,
                    "sale": 79,
                    "refund": 0,
                    "article": "tsh0086",
                    "photo": "https://app3.lichishop.com/add-ons/get_image_by_art/from_1c.php?art=tsh0086&size=xs",
                    "category": "Лонгслив"
                },
                {
                    "_id": "dr05061",
                    "sale_kz": 3,
                    "refund_kz": 0,
                    "sale_ae": 0,
                    "refund_ae": 0,
                    "sale_ru": 74,
                    "refund_ru": 12,
                    "sale_im": 0,
                    "refund_im": 0,
                    "sale": 77,
                    "refund": 12,
                    "article": "dr05061",
                    "photo": "https://app3.lichishop.com/add-ons/get_image_by_art/from_1c.php?art=dr05061&size=xs",
                    "category": "Платье"
                },
                {
                    "_id": "dr05290",
                    "sale_kz": 9,
                    "refund_kz": 0,
                    "sale_ae": 0,
                    "refund_ae": 0,
                    "sale_ru": 65,
                    "refund_ru": 3,
                    "sale_im": 1,
                    "refund_im": 0,
                    "sale": 75,
                    "refund": 3,
                    "article": "dr05290",
                    "photo": "https://app3.lichishop.com/add-ons/get_image_by_art/from_1c.php?art=dr05290&size=xs",
                    "category": "Платье"
                },
                {
                    "_id": "dr05228",
                    "sale_kz": 0,
                    "refund_kz": 0,
                    "sale_ae": 0,
                    "refund_ae": 0,
                    "sale_ru": 72,
                    "refund_ru": 25,
                    "sale_im": 0,
                    "refund_im": 0,
                    "sale": 72,
                    "refund": 25,
                    "article": "dr05228",
                    "photo": "https://app3.lichishop.com/add-ons/get_image_by_art/from_1c.php?art=dr05228&size=xs",
                    "category": "Платье"
                },
                {
                    "_id": "dr04884",
                    "sale_kz": 7,
                    "refund_kz": 1,
                    "sale_ae": 0,
                    "refund_ae": 0,
                    "sale_ru": 64,
                    "refund_ru": 12,
                    "sale_im": 0,
                    "refund_im": 0,
                    "sale": 71,
                    "refund": 13,
                    "article": "dr04884",
                    "photo": "https://app3.lichishop.com/add-ons/get_image_by_art/from_1c.php?art=dr04884&size=xs",
                    "category": "Платье"
                },
                {
                    "_id": "car0127",
                    "sale_kz": 0,
                    "refund_kz": 0,
                    "sale_ae": 0,
                    "refund_ae": 0,
                    "sale_ru": 69,
                    "refund_ru": 15,
                    "sale_im": 0,
                    "refund_im": 0,
                    "sale": 69,
                    "refund": 15,
                    "article": "car0127",
                    "photo": "https://app3.lichishop.com/add-ons/get_image_by_art/from_1c.php?art=car0127&size=xs",
                    "category": "Кардиган"
                },
                {
                    "_id": "dr05211",
                    "sale_kz": 1,
                    "refund_kz": 0,
                    "sale_ae": 0,
                    "refund_ae": 0,
                    "sale_ru": 67,
                    "refund_ru": 12,
                    "sale_im": 0,
                    "refund_im": 0,
                    "sale": 68,
                    "refund": 12,
                    "article": "dr05211",
                    "photo": "https://app3.lichishop.com/add-ons/get_image_by_art/from_1c.php?art=dr05211&size=xs",
                    "category": "Платье"
                },
                {
                    "_id": "bls0103",
                    "sale_kz": 1,
                    "refund_kz": 0,
                    "sale_ae": 0,
                    "refund_ae": 0,
                    "sale_ru": 65,
                    "refund_ru": 1,
                    "sale_im": 0,
                    "refund_im": 0,
                    "sale": 66,
                    "refund": 1,
                    "article": "bls0103",
                    "photo": "https://app3.lichishop.com/add-ons/get_image_by_art/from_1c.php?art=bls0103&size=xs",
                    "category": "Блуза"
                },
                {
                    "_id": "car0130",
                    "sale_kz": 0,
                    "refund_kz": 0,
                    "sale_ae": 0,
                    "refund_ae": 0,
                    "sale_ru": 63,
                    "refund_ru": 16,
                    "sale_im": 0,
                    "refund_im": 0,
                    "sale": 63,
                    "refund": 16,
                    "article": "car0130",
                    "photo": "https://app3.lichishop.com/add-ons/get_image_by_art/from_1c.php?art=car0130&size=xs",
                    "category": "Кардиган"
                },
                {
                    "_id": "dr05051",
                    "sale_kz": 0,
                    "refund_kz": 0,
                    "sale_ae": 0,
                    "refund_ae": 0,
                    "sale_ru": 58,
                    "refund_ru": 2,
                    "sale_im": 0,
                    "refund_im": 0,
                    "sale": 58,
                    "refund": 2,
                    "article": "dr05051",
                    "photo": "https://app3.lichishop.com/add-ons/get_image_by_art/from_1c.php?art=dr05051&size=xs",
                    "category": "Платье"
                },
                {
                    "_id": "jk00680",
                    "sale_kz": 9,
                    "refund_kz": 0,
                    "sale_ae": 0,
                    "refund_ae": 0,
                    "sale_ru": 47,
                    "refund_ru": 4,
                    "sale_im": 0,
                    "refund_im": 0,
                    "sale": 56,
                    "refund": 4,
                    "article": "jk00680",
                    "photo": "https://app3.lichishop.com/add-ons/get_image_by_art/from_1c.php?art=jk00680&size=xs",
                    "category": "Жакет"
                },
                {
                    "_id": "tsh0088",
                    "sale_kz": 0,
                    "refund_kz": 0,
                    "sale_ae": 0,
                    "refund_ae": 0,
                    "sale_ru": 56,
                    "refund_ru": 0,
                    "sale_im": 0,
                    "refund_im": 0,
                    "sale": 56,
                    "refund": 0,
                    "article": "tsh0088",
                    "photo": "https://app3.lichishop.com/add-ons/get_image_by_art/from_1c.php?art=tsh0088&size=xs",
                    "category": "Лонгслив"
                },
                {
                    "_id": "dr05239",
                    "sale_kz": 4,
                    "refund_kz": 0,
                    "sale_ae": 0,
                    "refund_ae": 0,
                    "sale_ru": 50,
                    "refund_ru": 1,
                    "sale_im": 0,
                    "refund_im": 0,
                    "sale": 54,
                    "refund": 1,
                    "article": "dr05239",
                    "photo": "https://app3.lichishop.com/add-ons/get_image_by_art/from_1c.php?art=dr05239&size=xs",
                    "category": "Платье"
                },
                {
                    "_id": "dr05230",
                    "sale_kz": 0,
                    "refund_kz": 0,
                    "sale_ae": 0,
                    "refund_ae": 0,
                    "sale_ru": 53,
                    "refund_ru": 15,
                    "sale_im": 0,
                    "refund_im": 0,
                    "sale": 53,
                    "refund": 15,
                    "article": "dr05230",
                    "photo": "https://app3.lichishop.com/add-ons/get_image_by_art/from_1c.php?art=dr05230&size=xs",
                    "category": "Платье"
                },
                {
                    "_id": "dr05291",
                    "sale_kz": 4,
                    "refund_kz": 0,
                    "sale_ae": 0,
                    "refund_ae": 0,
                    "sale_ru": 48,
                    "refund_ru": 2,
                    "sale_im": 0,
                    "refund_im": 0,
                    "sale": 52,
                    "refund": 2,
                    "article": "dr05291",
                    "photo": "https://app3.lichishop.com/add-ons/get_image_by_art/from_1c.php?art=dr05291&size=xs",
                    "category": "Платье"
                },
                {
                    "_id": "tsh0089",
                    "sale_kz": 0,
                    "refund_kz": 0,
                    "sale_ae": 0,
                    "refund_ae": 0,
                    "sale_ru": 50,
                    "refund_ru": 0,
                    "sale_im": 0,
                    "refund_im": 0,
                    "sale": 50,
                    "refund": 0,
                    "article": "tsh0089",
                    "photo": "https://app3.lichishop.com/add-ons/get_image_by_art/from_1c.php?art=tsh0089&size=xs",
                    "category": "Лонгслив"
                },
                {
                    "_id": "car0129",
                    "sale_kz": 0,
                    "refund_kz": 0,
                    "sale_ae": 0,
                    "refund_ae": 0,
                    "sale_ru": 49,
                    "refund_ru": 10,
                    "sale_im": 0,
                    "refund_im": 0,
                    "sale": 49,
                    "refund": 10,
                    "article": "car0129",
                    "photo": "https://app3.lichishop.com/add-ons/get_image_by_art/from_1c.php?art=car0129&size=xs",
                    "category": "Кардиган"
                },
                {
                    "_id": "dr05188",
                    "sale_kz": 2,
                    "refund_kz": 0,
                    "sale_ae": 0,
                    "refund_ae": 0,
                    "sale_ru": 45,
                    "refund_ru": 0,
                    "sale_im": 0,
                    "refund_im": 0,
                    "sale": 47,
                    "refund": 0,
                    "article": "dr05188",
                    "photo": "https://app3.lichishop.com/add-ons/get_image_by_art/from_1c.php?art=dr05188&size=xs",
                    "category": "Платье"
                }
            ],
        },
        "paging": {
            "page": 1,
            "limit": 20,
            "max_page": 122,
            "total": 2432
        }
    }

    return (
        <>
            <Heading type={"h1"}>Отчет по товарам</Heading>

            <div className={cn("w-100 border mb-20 p-4 rounded mt-3")}>
                <form className={cn("grid gap-10 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 mb-10 items-center")}>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant={"outline"}
                                className={cn(
                                    "justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, "LLL dd, y")} -{" "}
                                            {format(date.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(date.from, "LLL dd, y")
                                    )
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>

                    <Select>
                        <SelectTrigger className="w-100">
                            <SelectValue placeholder="Отчет"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ru">По отчетам</SelectItem>
                            <SelectItem value="kz">По цветам</SelectItem>
                            <SelectItem value="uae">По размерам</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-100">
                            <SelectValue placeholder="Категория товара"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ru">Все</SelectItem>
                            <SelectItem value="kz">Одежда</SelectItem>
                            <SelectItem value="uae">Юбки</SelectItem>
                            <SelectItem value="uae">Юбки</SelectItem>
                            <SelectItem value="uae">Юбки</SelectItem>
                            <SelectItem value="uae">Юбки</SelectItem>
                            <SelectItem value="uae">Юбки</SelectItem>
                            <SelectItem value="uae">Юбки</SelectItem>
                        </SelectContent>
                    </Select>

                    <Input defaultValue={'Артикул'}/>

                    {
                        groupByStores &&
                        <Select>
                            <SelectTrigger className="w-100">
                                <SelectValue placeholder="Выберите магазины"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ru">Астана</SelectItem>
                                <SelectItem value="kz">Павло</SelectItem>
                                <SelectItem value="uae">Алматы</SelectItem>
                            </SelectContent>
                        </Select>
                    }
                </form>

                <div className={cn("flex items-center flex-wrap gap-10 justify-between")}>
                    <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" onCheckedChange={(e) => setGroupByStores(e)}/>
                        <Label htmlFor="airplane-mode">Группировка по магазинам</Label>
                    </div>

                    <Button className={cn("2xl:w-[230px] w-[100%]")}>Сформировать</Button>
                </div>
            </div>

            <div className={cn("w-100 border rounded mt-3")}>
                <Table className={cn("mb-3")}>
                    <TableHeader>
                        <TableRow>
                            {
                                Object.entries(api_data_ex.table.head || {}).map(([key, value], index) => {
                                    return (
                                        <TableHead key={index}>
                                            <h4 dangerouslySetInnerHTML={{__html: value.label}}/>
                                        </TableHead>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            Object.entries(api_data_ex.table.data || {}).map(([key, value], index) => {
                                return (
                                   <TableRow key={index}>
                                       <TableCell>
                                           <Image
                                               width={60}
                                               height={90}
                                               src={value.photo}
                                               alt={value.category}
                                           />
                                       </TableCell>
                                       <TableCell className="font-light w-[230px]">
                                           <Heading type={"h4"}>{value.article}</Heading>
                                           <Heading type={"h4"}>{value.category}</Heading>
                                       </TableCell>
                                       <TableCell className="font-light">
                                           <Heading type={"h4"}>{value.sale}</Heading>
                                       </TableCell>
                                       <TableCell className="font-light">
                                           <Heading type={"h4"}>{value.refund}</Heading>
                                       </TableCell>
                                       <TableCell className="font-light">
                                           <Heading type={"h4"}>{value.sale_ae}</Heading>
                                       </TableCell>
                                       <TableCell className="font-light">
                                           <Heading type={"h4"}>{value.refund_ae}</Heading>
                                       </TableCell>
                                       <TableCell className="font-light">
                                           <Heading type={"h4"}>{value.sale_ru}</Heading>
                                       </TableCell>
                                       <TableCell className="font-light">
                                           <Heading type={"h4"}>{value.refund_ru}</Heading>
                                       </TableCell>
                                       <TableCell className="font-light">
                                           <Heading type={"h4"}>{value.sale_kz}</Heading>
                                       </TableCell>
                                       <TableCell className="font-light">
                                           <Heading type={"h4"}>{value.refund_kz}</Heading>
                                       </TableCell>
                                       <TableCell className="font-light">
                                           <Heading type={"h4"}>{value.sale_im}</Heading>
                                       </TableCell>
                                       <TableCell className="font-light">
                                           <Heading type={"h4"}>{value.refund_im}</Heading>
                                       </TableCell>
                                   </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>

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
            </div>
        </>
    );
}

export default ProductsPage;
