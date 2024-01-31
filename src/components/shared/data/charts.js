export const offlineChartList = [
    // {
    //     "id": 1,
    //     "title": "Продажи по магазинам",
    //     "key": "stores"
    // },
    {
        "id": 2,
        "title": "Динамика продаж",
        "key": "sale_dynamic"
    },{
        "id": 3,
        "title": "Средний чек",
        "key": "avg_check"
    },{
        "id": 4,
        "title": "Сегменты",
        "key": "product_category"
    },
    // {
    //     "id": 5,
    //     "title": "ТОП Продаж",
    //     "key": "product_top_sale"
    // },
    // {
    //     "id": 6,
    //     "title": "ТОП Возвратов",
    //     "key": "product_top_return"
    // },
    {
        "id": 7,
        "title": "Активность",
        "key": "week_activity"
    },
    // {
    //     "id": 8,
    //     "title": "Продажи по магазинам (по дням)",
    //     "key": "stores_by_day"
    // },
]

export const chartSalesDynamic = {
    "title": {
        "text": ""
    },
    "chart": {
        "type": "line",
        "fontFamily": "Rubik, serif",
        "toolbar": {
            "show": true,
            "tools": {
                "download": false,
                "selection": true,
                "zoom": true,
                "zoomIn": true,
                "zoomOut": true,
                "pan": true,
                "reset": true
            }
        },
        "height": 350
    },
    "stroke": {
        "width": [
            0,
            0,
            0,
            0,
            3
        ],
        "curve": "smooth"
    },
    "series": [
        {
            "name": "Продажи",
            "type": "column",
            "data": [
                9713248.09,
                8608748.07,
                4998216.71,
                4916920.93,
                6065142.37,
                6508930.37,
                7457394.82,
                11358094.34,
                9392342.96,
                5201368.61,
                417435
            ]
        },
        {
            "name": "Продажи (по прайсу)",
            "type": "column",
            "data": [
                10391843,
                9151073,
                5341743,
                5268124,
                6440912,
                6994806,
                8042850,
                12293655,
                10168890,
                5682675,
                452027
            ]
        },
        {
            "name": "Возвраты",
            "type": "column",
            "data": [
                369886.27,
                560000.97,
                487213.95,
                405531.61,
                381064.29,
                306140.66,
                474613.55,
                352449.62,
                681393.32,
                454308.08,
                89326.87
            ]
        },
        {
            "name": "Возврат (по прайсу)",
            "type": "column",
            "data": [
                369886.27,
                560000.98,
                487213.95,
                405531.61,
                381064.29,
                306140.66,
                474613.55,
                352449.62,
                681393.32,
                454308.08,
                89326.87
            ]
        }
    ],
    "xaxis": {
        "type": "datetime",
        "labels": {
            "datetimeUTC": false
        }
    },
    "annotations": {
        "xaxis": [
            {
                "borderColor": "#008FFB",
                "fillColor": "#008FFB",
                "label": {
                    "show": true,
                    "borderColor": "#008FFB",
                    "style": {
                        "color": "#ffffff",
                        "background": "#008FFB"
                    },
                    "text": "Вс",
                    "offsetY": -40
                },
                "x": 1705784400000
            },
            {
                "borderColor": "#008FFB",
                "fillColor": "#008FFB",
                "label": {
                    "show": true,
                    "borderColor": "#008FFB",
                    "style": {
                        "color": "#ffffff",
                        "background": "#008FFB"
                    },
                    "text": "Сб",
                    "offsetY": -40
                },
                "x": 1706302800000
            },
            {
                "borderColor": "#008FFB",
                "fillColor": "#008FFB",
                "label": {
                    "show": true,
                    "borderColor": "#008FFB",
                    "style": {
                        "color": "#ffffff",
                        "background": "#008FFB"
                    },
                    "text": "Вс",
                    "offsetY": -40
                },
                "x": 1706389200000
            }
        ],
        "yaxis": []
    },
    "colors": [
        "#008ffb",
        "#6f42c1",
        "#dc3545",
        "#fd7e14",
        "#6c757d"
    ],
    "dataLabels": {
        "enabled": true,
        "enabledOnSeries": [
            4
        ]
    },
    "yaxis": {
        "labels": {
            "formatter": value => {
                return new Intl.NumberFormat("en-GB", {notation: "compact",compactDisplay: "short"}).format(value);
            }
        }
    },
    "labels": [
        "2024-01-20 GTM",
        "2024-01-21 GTM",
        "2024-01-22 GTM",
        "2024-01-23 GTM",
        "2024-01-24 GTM",
        "2024-01-25 GTM",
        "2024-01-26 GTM",
        "2024-01-27 GTM",
        "2024-01-28 GTM",
        "2024-01-29 GTM",
        "2024-01-30 GTM"
    ]
}

export const chartAvg = {
    "title": {
        "text": ""
    },
    "chart": {
        "type": "line",
        "fontFamily": "Rubik, serif",
        "toolbar": {
            "show": true,
            "tools": {
                "download": false,
                "selection": true,
                "zoom": true,
                "zoomIn": true,
                "zoomOut": true,
                "pan": true,
                "reset": true
            }
        },
        "height": 350
    },
    "stroke": {
        "width": [
            0,
            4
        ],
        "curve": "smooth"
    },
    "series": [
        {
            "name": "Средний чек",
            "data": [
                {
                    "x": "2024-01-20 GTM",
                    "y": 8141.87
                },
                {
                    "x": "2024-01-21 GTM",
                    "y": 8489.89
                },
                {
                    "x": "2024-01-22 GTM",
                    "y": 8877.83
                },
                {
                    "x": "2024-01-23 GTM",
                    "y": 8347.91
                },
                {
                    "x": "2024-01-24 GTM",
                    "y": 8470.87
                },
                {
                    "x": "2024-01-25 GTM",
                    "y": 8453.16
                },
                {
                    "x": "2024-01-26 GTM",
                    "y": 8474.31
                },
                {
                    "x": "2024-01-27 GTM",
                    "y": 8400.96
                },
                {
                    "x": "2024-01-28 GTM",
                    "y": 8585.32
                },
                {
                    "x": "2024-01-29 GTM",
                    "y": 8217.01
                },
                {
                    "x": "2024-01-30 GTM",
                    "y": 8334.83
                }
            ],
            "type": "column"
        },
        {
            "name": "Кол-во товаров в чеке",
            "data": [
                {
                    "x": "2024-01-20 GTM",
                    "y": 1.47
                },
                {
                    "x": "2024-01-21 GTM",
                    "y": 1.51
                },
                {
                    "x": "2024-01-22 GTM",
                    "y": 1.53
                },
                {
                    "x": "2024-01-23 GTM",
                    "y": 1.49
                },
                {
                    "x": "2024-01-24 GTM",
                    "y": 1.52
                },
                {
                    "x": "2024-01-25 GTM",
                    "y": 1.55
                },
                {
                    "x": "2024-01-26 GTM",
                    "y": 1.53
                },
                {
                    "x": "2024-01-27 GTM",
                    "y": 1.51
                },
                {
                    "x": "2024-01-28 GTM",
                    "y": 1.56
                },
                {
                    "x": "2024-01-29 GTM",
                    "y": 1.46
                },
                {
                    "x": "2024-01-30 GTM",
                    "y": 1.5
                }
            ],
            "type": "line"
        }
    ],
    "xaxis": {
        "type": "datetime",
        "labels": {
            "datetimeUTC": false
        }
    },
    "annotations": {
        "xaxis": [
            {
                "borderColor": "#008FFB",
                "fillColor": "#008FFB",
                "label": {
                    "show": true,
                    "borderColor": "#008FFB",
                    "style": {
                        "color": "#ffffff",
                        "background": "#008FFB"
                    },
                    "text": "Вс",
                    "offsetY": -40
                },
                "x": 1705784400000
            },
            {
                "borderColor": "#008FFB",
                "fillColor": "#008FFB",
                "label": {
                    "show": true,
                    "borderColor": "#008FFB",
                    "style": {
                        "color": "#ffffff",
                        "background": "#008FFB"
                    },
                    "text": "Сб",
                    "offsetY": -40
                },
                "x": 1706302800000
            },
            {
                "borderColor": "#008FFB",
                "fillColor": "#008FFB",
                "label": {
                    "show": true,
                    "borderColor": "#008FFB",
                    "style": {
                        "color": "#ffffff",
                        "background": "#008FFB"
                    },
                    "text": "Вс",
                    "offsetY": -40
                },
                "x": 1706389200000
            }
        ],
        "yaxis": []
    },
    "dataLabels": {
        "enabled": true,
        "enabledOnSeries": [
            1
        ]
    },
    "yaxis": [
        {
            "title": "Средний чек"
        },
        {
            "opposite": true,
            "title": "Кол-во товаров в чеке"
        }
    ]
}

export const chartActive = {
    "series": [
        {
            "name": "20:00 - 23:00",
            "data": [
                {
                    "y": 197,
                    "x": "Пн"
                },
                {
                    "y": 228,
                    "x": "Вт"
                },
                {
                    "y": 272,
                    "x": "Ср"
                },
                {
                    "y": 285,
                    "x": "Чт"
                },
                {
                    "y": 273,
                    "x": "Пт"
                },
                {
                    "y": 336,
                    "x": "Сб"
                },
                {
                    "y": 253,
                    "x": "Вс"
                }
            ]
        },
        {
            "name": "16:00 - 19:00",
            "data": [
                {
                    "y": 440,
                    "x": "Пн"
                },
                {
                    "y": 404,
                    "x": "Вт"
                },
                {
                    "y": 486,
                    "x": "Ср"
                },
                {
                    "y": 542,
                    "x": "Чт"
                },
                {
                    "y": 651,
                    "x": "Пт"
                },
                {
                    "y": 956,
                    "x": "Сб"
                },
                {
                    "y": 813,
                    "x": "Вс"
                }
            ]
        },
        {
            "name": "12:00 - 15:00",
            "data": [
                {
                    "y": 322,
                    "x": "Пн"
                },
                {
                    "y": 253,
                    "x": "Вт"
                },
                {
                    "y": 339,
                    "x": "Ср"
                },
                {
                    "y": 375,
                    "x": "Чт"
                },
                {
                    "y": 405,
                    "x": "Пт"
                },
                {
                    "y": 715,
                    "x": "Сб"
                },
                {
                    "y": 668,
                    "x": "Вс"
                }
            ]
        },
        {
            "name": "08:00 - 11:00",
            "data": [
                {
                    "y": 32,
                    "x": "Пн"
                },
                {
                    "y": 61,
                    "x": "Вт"
                },
                {
                    "y": 43,
                    "x": "Ср"
                },
                {
                    "y": 39,
                    "x": "Чт"
                },
                {
                    "y": 88,
                    "x": "Пт"
                },
                {
                    "y": 92,
                    "x": "Сб"
                },
                {
                    "y": 81,
                    "x": "Вс"
                }
            ]
        },
        {
            "name": "04:00 - 07:00",
            "data": [
                {
                    "y": 1,
                    "x": "Пн"
                },
                {
                    "y": 3,
                    "x": "Вт"
                },
                {
                    "y": 6,
                    "x": "Ср"
                },
                {
                    "y": 1,
                    "x": "Чт"
                },
                {
                    "y": 0,
                    "x": "Пт"
                },
                {
                    "y": 2,
                    "x": "Сб"
                },
                {
                    "y": 2,
                    "x": "Вс"
                }
            ]
        },
        {
            "name": "00:00 - 03:00",
            "data": [
                {
                    "y": 0,
                    "x": "Пн"
                },
                {
                    "y": 0,
                    "x": "Вт"
                },
                {
                    "y": 0,
                    "x": "Ср"
                },
                {
                    "y": 0,
                    "x": "Чт"
                },
                {
                    "y": 0,
                    "x": "Пт"
                },
                {
                    "y": 0,
                    "x": "Сб"
                },
                {
                    "y": 0,
                    "x": "Вс"
                }
            ]
        }
    ],
    "chart": {
        "height": 350,
        "type": "heatmap",
        "fontFamily": "Rubik, serif",
        "toolbar": {
            "show": false
        }
    },
    "dataLabels": {
        "enabled": false
    },
    "colors": [
        "#6610f2"
    ]
}

export const chartSegment = {
    "series": [
        351,
        160,
        77,
        113,
        60,
        93,
        35,
        31
    ],
    "labels": [
        "Платья",
        "Юбки",
        "Жакеты",
        "Брюки",
        "Блузы и Топы",
        "Свитеры и Толстовки",
        "Сапоги",
        "Украшения"
    ],
    "chart": {
        "height": 350,
        "type": "donut",
        "fontFamily": "Rubik, serif",
        "toolbar": {
            "show": false
        }
    }
}

export const chartTopSales = {
    "dr05286": {
        "total": 19,
        "chart": {
            "title": {
                "text": ""
            },
            "chart": {
                "type": "area",
                "fontFamily": "Rubik, serif",
                "toolbar": {
                    "show": false,
                    "tools": {
                        "download": false,
                        "selection": true,
                        "zoom": true,
                        "zoomIn": true,
                        "zoomOut": true,
                        "pan": true,
                        "reset": true
                    }
                },
                "height": 64,
                "sparkline": {
                    "enabled": true
                }
            },
            "stroke": {
                "width": 2
            },
            "series": [
                {
                    "data": [
                        {
                            "x": "2024-01-17 GTM",
                            "y": 4
                        },
                        {
                            "x": "2024-01-18 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-19 GTM",
                            "y": 4
                        },
                        {
                            "x": "2024-01-20 GTM",
                            "y": 3
                        },
                        {
                            "x": "2024-01-21 GTM",
                            "y": 2
                        },
                        {
                            "x": "2024-01-22 GTM",
                            "y": 2
                        },
                        {
                            "x": "2024-01-23 GTM",
                            "y": 3
                        },
                        {
                            "x": "2024-01-24 GTM",
                            "y": 0
                        }
                    ]
                }
            ],
            "xaxis": {
                "type": "datetime",
                "labels": {
                    "datetimeUTC": false
                }
            },
            "colors": [
                "#008ffb"
            ],
            "tooltip": {
                "fixed": {
                    "enabled": false
                },
                "x": {
                    "show": true
                },
                "y": {
                    "title": {
                        "formatter": {
                            "fn": "return \"\";",
                            "args": [
                                "seriesName"
                            ]
                        }
                    }
                },
                "marker": {
                    "show": false
                }
            }
        }
    },
    "hbt0010": {
        "total": 19,
        "chart": {
            "title": {
                "text": ""
            },
            "chart": {
                "type": "area",
                "fontFamily": "Rubik, serif",
                "toolbar": {
                    "show": false,
                    "tools": {
                        "download": false,
                        "selection": true,
                        "zoom": true,
                        "zoomIn": true,
                        "zoomOut": true,
                        "pan": true,
                        "reset": true
                    }
                },
                "height": 64,
                "sparkline": {
                    "enabled": true
                }
            },
            "stroke": {
                "width": 2
            },
            "series": [
                {
                    "data": [
                        {
                            "x": "2024-01-17 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-18 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-19 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-20 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-21 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-22 GTM",
                            "y": 16
                        },
                        {
                            "x": "2024-01-23 GTM",
                            "y": 2
                        },
                        {
                            "x": "2024-01-24 GTM",
                            "y": 0
                        }
                    ]
                }
            ],
            "xaxis": {
                "type": "datetime",
                "labels": {
                    "datetimeUTC": false
                }
            },
            "colors": [
                "#008ffb"
            ],
            "tooltip": {
                "fixed": {
                    "enabled": false
                },
                "x": {
                    "show": true
                },
                "y": {
                    "title": {
                        "formatter": {
                            "fn": "return \"\";",
                            "args": [
                                "seriesName"
                            ]
                        }
                    }
                },
                "marker": {
                    "show": false
                }
            }
        }
    },
    "dr05290": {
        "total": 12,
        "chart": {
            "title": {
                "text": ""
            },
            "chart": {
                "type": "area",
                "fontFamily": "Rubik, serif",
                "toolbar": {
                    "show": false,
                    "tools": {
                        "download": false,
                        "selection": true,
                        "zoom": true,
                        "zoomIn": true,
                        "zoomOut": true,
                        "pan": true,
                        "reset": true
                    }
                },
                "height": 64,
                "sparkline": {
                    "enabled": true
                }
            },
            "stroke": {
                "width": 2
            },
            "series": [
                {
                    "data": [
                        {
                            "x": "2024-01-17 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-18 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-19 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-20 GTM",
                            "y": 7
                        },
                        {
                            "x": "2024-01-21 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-22 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-23 GTM",
                            "y": 2
                        },
                        {
                            "x": "2024-01-24 GTM",
                            "y": 1
                        }
                    ]
                }
            ],
            "xaxis": {
                "type": "datetime",
                "labels": {
                    "datetimeUTC": false
                }
            },
            "colors": [
                "#008ffb"
            ],
            "tooltip": {
                "fixed": {
                    "enabled": false
                },
                "x": {
                    "show": true
                },
                "y": {
                    "title": {
                        "formatter": {
                            "fn": "return \"\";",
                            "args": [
                                "seriesName"
                            ]
                        }
                    }
                },
                "marker": {
                    "show": false
                }
            }
        }
    },
    "dr04795": {
        "total": 12,
        "chart": {
            "title": {
                "text": ""
            },
            "chart": {
                "type": "area",
                "fontFamily": "Rubik, serif",
                "toolbar": {
                    "show": false,
                    "tools": {
                        "download": false,
                        "selection": true,
                        "zoom": true,
                        "zoomIn": true,
                        "zoomOut": true,
                        "pan": true,
                        "reset": true
                    }
                },
                "height": 64,
                "sparkline": {
                    "enabled": true
                }
            },
            "stroke": {
                "width": 2
            },
            "series": [
                {
                    "data": [
                        {
                            "x": "2024-01-17 GTM",
                            "y": 2
                        },
                        {
                            "x": "2024-01-18 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-19 GTM",
                            "y": 2
                        },
                        {
                            "x": "2024-01-20 GTM",
                            "y": 2
                        },
                        {
                            "x": "2024-01-21 GTM",
                            "y": 2
                        },
                        {
                            "x": "2024-01-22 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-23 GTM",
                            "y": 2
                        },
                        {
                            "x": "2024-01-24 GTM",
                            "y": 0
                        }
                    ]
                }
            ],
            "xaxis": {
                "type": "datetime",
                "labels": {
                    "datetimeUTC": false
                }
            },
            "colors": [
                "#008ffb"
            ],
            "tooltip": {
                "fixed": {
                    "enabled": false
                },
                "x": {
                    "show": true
                },
                "y": {
                    "title": {
                        "formatter": {
                            "fn": "return \"\";",
                            "args": [
                                "seriesName"
                            ]
                        }
                    }
                },
                "marker": {
                    "show": false
                }
            }
        }
    },
    "jk00680": {
        "total": 9,
        "chart": {
            "title": {
                "text": ""
            },
            "chart": {
                "type": "area",
                "fontFamily": "Rubik, serif",
                "toolbar": {
                    "show": false,
                    "tools": {
                        "download": false,
                        "selection": true,
                        "zoom": true,
                        "zoomIn": true,
                        "zoomOut": true,
                        "pan": true,
                        "reset": true
                    }
                },
                "height": 64,
                "sparkline": {
                    "enabled": true
                }
            },
            "stroke": {
                "width": 2
            },
            "series": [
                {
                    "data": [
                        {
                            "x": "2024-01-17 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-18 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-19 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-20 GTM",
                            "y": 5
                        },
                        {
                            "x": "2024-01-21 GTM",
                            "y": 3
                        },
                        {
                            "x": "2024-01-22 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-23 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-24 GTM",
                            "y": 0
                        }
                    ]
                }
            ],
            "xaxis": {
                "type": "datetime",
                "labels": {
                    "datetimeUTC": false
                }
            },
            "colors": [
                "#008ffb"
            ],
            "tooltip": {
                "fixed": {
                    "enabled": false
                },
                "x": {
                    "show": true
                },
                "y": {
                    "title": {
                        "formatter": {
                            "fn": "return \"\";",
                            "args": [
                                "seriesName"
                            ]
                        }
                    }
                },
                "marker": {
                    "show": false
                }
            }
        }
    },
    "dr05200": {
        "total": 9,
        "chart": {
            "title": {
                "text": ""
            },
            "chart": {
                "type": "area",
                "fontFamily": "Rubik, serif",
                "toolbar": {
                    "show": false,
                    "tools": {
                        "download": false,
                        "selection": true,
                        "zoom": true,
                        "zoomIn": true,
                        "zoomOut": true,
                        "pan": true,
                        "reset": true
                    }
                },
                "height": 64,
                "sparkline": {
                    "enabled": true
                }
            },
            "stroke": {
                "width": 2
            },
            "series": [
                {
                    "data": [
                        {
                            "x": "2024-01-17 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-18 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-19 GTM",
                            "y": 2
                        },
                        {
                            "x": "2024-01-20 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-21 GTM",
                            "y": 2
                        },
                        {
                            "x": "2024-01-22 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-23 GTM",
                            "y": 3
                        },
                        {
                            "x": "2024-01-24 GTM",
                            "y": 0
                        }
                    ]
                }
            ],
            "xaxis": {
                "type": "datetime",
                "labels": {
                    "datetimeUTC": false
                }
            },
            "colors": [
                "#008ffb"
            ],
            "tooltip": {
                "fixed": {
                    "enabled": false
                },
                "x": {
                    "show": true
                },
                "y": {
                    "title": {
                        "formatter": {
                            "fn": "return \"\";",
                            "args": [
                                "seriesName"
                            ]
                        }
                    }
                },
                "marker": {
                    "show": false
                }
            }
        }
    },
    "dr05262": {
        "total": 9,
        "chart": {
            "title": {
                "text": ""
            },
            "chart": {
                "type": "area",
                "fontFamily": "Rubik, serif",
                "toolbar": {
                    "show": false,
                    "tools": {
                        "download": false,
                        "selection": true,
                        "zoom": true,
                        "zoomIn": true,
                        "zoomOut": true,
                        "pan": true,
                        "reset": true
                    }
                },
                "height": 64,
                "sparkline": {
                    "enabled": true
                }
            },
            "stroke": {
                "width": 2
            },
            "series": [
                {
                    "data": [
                        {
                            "x": "2024-01-17 GTM",
                            "y": 2
                        },
                        {
                            "x": "2024-01-18 GTM",
                            "y": 2
                        },
                        {
                            "x": "2024-01-19 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-20 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-21 GTM",
                            "y": 2
                        },
                        {
                            "x": "2024-01-22 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-23 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-24 GTM",
                            "y": 0
                        }
                    ]
                }
            ],
            "xaxis": {
                "type": "datetime",
                "labels": {
                    "datetimeUTC": false
                }
            },
            "colors": [
                "#008ffb"
            ],
            "tooltip": {
                "fixed": {
                    "enabled": false
                },
                "x": {
                    "show": true
                },
                "y": {
                    "title": {
                        "formatter": {
                            "fn": "return \"\";",
                            "args": [
                                "seriesName"
                            ]
                        }
                    }
                },
                "marker": {
                    "show": false
                }
            }
        }
    },
    "tsh0083": {
        "total": 9,
        "chart": {
            "title": {
                "text": ""
            },
            "chart": {
                "type": "area",
                "fontFamily": "Rubik, serif",
                "toolbar": {
                    "show": false,
                    "tools": {
                        "download": false,
                        "selection": true,
                        "zoom": true,
                        "zoomIn": true,
                        "zoomOut": true,
                        "pan": true,
                        "reset": true
                    }
                },
                "height": 64,
                "sparkline": {
                    "enabled": true
                }
            },
            "stroke": {
                "width": 2
            },
            "series": [
                {
                    "data": [
                        {
                            "x": "2024-01-17 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-18 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-19 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-20 GTM",
                            "y": 2
                        },
                        {
                            "x": "2024-01-21 GTM",
                            "y": 4
                        },
                        {
                            "x": "2024-01-22 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-23 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-24 GTM",
                            "y": 0
                        }
                    ]
                }
            ],
            "xaxis": {
                "type": "datetime",
                "labels": {
                    "datetimeUTC": false
                }
            },
            "colors": [
                "#008ffb"
            ],
            "tooltip": {
                "fixed": {
                    "enabled": false
                },
                "x": {
                    "show": true
                },
                "y": {
                    "title": {
                        "formatter": {
                            "fn": "return \"\";",
                            "args": [
                                "seriesName"
                            ]
                        }
                    }
                },
                "marker": {
                    "show": false
                }
            }
        }
    },
    "hdy0037": {
        "total": 9,
        "chart": {
            "title": {
                "text": ""
            },
            "chart": {
                "type": "area",
                "fontFamily": "Rubik, serif",
                "toolbar": {
                    "show": false,
                    "tools": {
                        "download": false,
                        "selection": true,
                        "zoom": true,
                        "zoomIn": true,
                        "zoomOut": true,
                        "pan": true,
                        "reset": true
                    }
                },
                "height": 64,
                "sparkline": {
                    "enabled": true
                }
            },
            "stroke": {
                "width": 2
            },
            "series": [
                {
                    "data": [
                        {
                            "x": "2024-01-17 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-18 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-19 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-20 GTM",
                            "y": 4
                        },
                        {
                            "x": "2024-01-21 GTM",
                            "y": 3
                        },
                        {
                            "x": "2024-01-22 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-23 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-24 GTM",
                            "y": 0
                        }
                    ]
                }
            ],
            "xaxis": {
                "type": "datetime",
                "labels": {
                    "datetimeUTC": false
                }
            },
            "colors": [
                "#008ffb"
            ],
            "tooltip": {
                "fixed": {
                    "enabled": false
                },
                "x": {
                    "show": true
                },
                "y": {
                    "title": {
                        "formatter": {
                            "fn": "return \"\";",
                            "args": [
                                "seriesName"
                            ]
                        }
                    }
                },
                "marker": {
                    "show": false
                }
            }
        }
    },
    "trs0416": {
        "total": 8,
        "chart": {
            "title": {
                "text": ""
            },
            "chart": {
                "type": "area",
                "fontFamily": "Rubik, serif",
                "toolbar": {
                    "show": false,
                    "tools": {
                        "download": false,
                        "selection": true,
                        "zoom": true,
                        "zoomIn": true,
                        "zoomOut": true,
                        "pan": true,
                        "reset": true
                    }
                },
                "height": 64,
                "sparkline": {
                    "enabled": true
                }
            },
            "stroke": {
                "width": 2
            },
            "series": [
                {
                    "data": [
                        {
                            "x": "2024-01-17 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-18 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-19 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-20 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-21 GTM",
                            "y": 4
                        },
                        {
                            "x": "2024-01-22 GTM",
                            "y": 2
                        },
                        {
                            "x": "2024-01-23 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-24 GTM",
                            "y": 0
                        }
                    ]
                }
            ],
            "xaxis": {
                "type": "datetime",
                "labels": {
                    "datetimeUTC": false
                }
            },
            "colors": [
                "#008ffb"
            ],
            "tooltip": {
                "fixed": {
                    "enabled": false
                },
                "x": {
                    "show": true
                },
                "y": {
                    "title": {
                        "formatter": {
                            "fn": "return ';'",
                            "args": [
                                "seriesName"
                            ]
                        }
                    }
                },
                "marker": {
                    "show": false
                }
            }
        }
    }
}

export const chartTopRefund = {
    "dr05273": {
        "total": 2,
        "chart": {
            "title": {
                "text": ""
            },
            "chart": {
                "type": "area",
                "fontFamily": "Rubik, serif",
                "toolbar": {
                    "show": false,
                    "tools": {
                        "download": false,
                        "selection": true,
                        "zoom": true,
                        "zoomIn": true,
                        "zoomOut": true,
                        "pan": true,
                        "reset": true
                    }
                },
                "height": 64,
                "sparkline": {
                    "enabled": true
                }
            },
            "stroke": {
                "width": 2
            },
            "series": [
                {
                    "data": [
                        {
                            "x": "2024-01-17 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-18 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-19 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-20 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-21 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-22 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-23 GTM",
                            "y": 2
                        },
                        {
                            "x": "2024-01-24 GTM",
                            "y": 0
                        }
                    ]
                }
            ],
            "xaxis": {
                "type": "datetime",
                "labels": {
                    "datetimeUTC": false
                }
            },
            "colors": [
                "#dc3545"
            ],
            "tooltip": {
                "fixed": {
                    "enabled": false
                },
                "x": {
                    "show": true
                },
                "y": {
                    "title": {
                        "formatter": {
                            "fn": "return \"\";",
                            "args": [
                                "seriesName"
                            ]
                        }
                    }
                },
                "marker": {
                    "show": false
                }
            }
        }
    },
    "dr04885": {
        "total": 2,
        "chart": {
            "title": {
                "text": ""
            },
            "chart": {
                "type": "area",
                "fontFamily": "Rubik, serif",
                "toolbar": {
                    "show": false,
                    "tools": {
                        "download": false,
                        "selection": true,
                        "zoom": true,
                        "zoomIn": true,
                        "zoomOut": true,
                        "pan": true,
                        "reset": true
                    }
                },
                "height": 64,
                "sparkline": {
                    "enabled": true
                }
            },
            "stroke": {
                "width": 2
            },
            "series": [
                {
                    "data": [
                        {
                            "x": "2024-01-17 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-18 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-19 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-20 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-21 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-22 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-23 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-24 GTM",
                            "y": 0
                        }
                    ]
                }
            ],
            "xaxis": {
                "type": "datetime",
                "labels": {
                    "datetimeUTC": false
                }
            },
            "colors": [
                "#dc3545"
            ],
            "tooltip": {
                "fixed": {
                    "enabled": false
                },
                "x": {
                    "show": true
                },
                "y": {
                    "title": {
                        "formatter": {
                            "fn": "return \"\";",
                            "args": [
                                "seriesName"
                            ]
                        }
                    }
                },
                "marker": {
                    "show": false
                }
            }
        }
    },
    "bls0102": {
        "total": 2,
        "chart": {
            "title": {
                "text": ""
            },
            "chart": {
                "type": "area",
                "fontFamily": "Rubik, serif",
                "toolbar": {
                    "show": false,
                    "tools": {
                        "download": false,
                        "selection": true,
                        "zoom": true,
                        "zoomIn": true,
                        "zoomOut": true,
                        "pan": true,
                        "reset": true
                    }
                },
                "height": 64,
                "sparkline": {
                    "enabled": true
                }
            },
            "stroke": {
                "width": 2
            },
            "series": [
                {
                    "data": [
                        {
                            "x": "2024-01-17 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-18 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-19 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-20 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-21 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-22 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-23 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-24 GTM",
                            "y": 0
                        }
                    ]
                }
            ],
            "xaxis": {
                "type": "datetime",
                "labels": {
                    "datetimeUTC": false
                }
            },
            "colors": [
                "#dc3545"
            ],
            "tooltip": {
                "fixed": {
                    "enabled": false
                },
                "x": {
                    "show": true
                },
                "y": {
                    "title": {
                        "formatter": {
                            "fn": "return \"\";",
                            "args": [
                                "seriesName"
                            ]
                        }
                    }
                },
                "marker": {
                    "show": false
                }
            }
        }
    },
    "hdy0039": {
        "total": 1,
        "chart": {
            "title": {
                "text": ""
            },
            "chart": {
                "type": "area",
                "fontFamily": "Rubik, serif",
                "toolbar": {
                    "show": false,
                    "tools": {
                        "download": false,
                        "selection": true,
                        "zoom": true,
                        "zoomIn": true,
                        "zoomOut": true,
                        "pan": true,
                        "reset": true
                    }
                },
                "height": 64,
                "sparkline": {
                    "enabled": true
                }
            },
            "stroke": {
                "width": 2
            },
            "series": [
                {
                    "data": [
                        {
                            "x": "2024-01-17 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-18 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-19 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-20 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-21 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-22 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-23 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-24 GTM",
                            "y": 0
                        }
                    ]
                }
            ],
            "xaxis": {
                "type": "datetime",
                "labels": {
                    "datetimeUTC": false
                }
            },
            "colors": [
                "#dc3545"
            ],
            "tooltip": {
                "fixed": {
                    "enabled": false
                },
                "x": {
                    "show": true
                },
                "y": {
                    "title": {
                        "formatter": {
                            "fn": "return \"\";",
                            "args": [
                                "seriesName"
                            ]
                        }
                    }
                },
                "marker": {
                    "show": false
                }
            }
        }
    },
    "jns0339": {
        "total": 1,
        "chart": {
            "title": {
                "text": ""
            },
            "chart": {
                "type": "area",
                "fontFamily": "Rubik, serif",
                "toolbar": {
                    "show": false,
                    "tools": {
                        "download": false,
                        "selection": true,
                        "zoom": true,
                        "zoomIn": true,
                        "zoomOut": true,
                        "pan": true,
                        "reset": true
                    }
                },
                "height": 64,
                "sparkline": {
                    "enabled": true
                }
            },
            "stroke": {
                "width": 2
            },
            "series": [
                {
                    "data": [
                        {
                            "x": "2024-01-17 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-18 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-19 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-20 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-21 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-22 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-23 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-24 GTM",
                            "y": 0
                        }
                    ]
                }
            ],
            "xaxis": {
                "type": "datetime",
                "labels": {
                    "datetimeUTC": false
                }
            },
            "colors": [
                "#dc3545"
            ],
            "tooltip": {
                "fixed": {
                    "enabled": false
                },
                "x": {
                    "show": true
                },
                "y": {
                    "title": {
                        "formatter": {
                            "fn": "return \"\";",
                            "args": [
                                "seriesName"
                            ]
                        }
                    }
                },
                "marker": {
                    "show": false
                }
            }
        }
    },
    "jk00643": {
        "total": 1,
        "chart": {
            "title": {
                "text": ""
            },
            "chart": {
                "type": "area",
                "fontFamily": "Rubik, serif",
                "toolbar": {
                    "show": false,
                    "tools": {
                        "download": false,
                        "selection": true,
                        "zoom": true,
                        "zoomIn": true,
                        "zoomOut": true,
                        "pan": true,
                        "reset": true
                    }
                },
                "height": 64,
                "sparkline": {
                    "enabled": true
                }
            },
            "stroke": {
                "width": 2
            },
            "series": [
                {
                    "data": [
                        {
                            "x": "2024-01-17 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-18 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-19 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-20 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-21 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-22 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-23 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-24 GTM",
                            "y": 0
                        }
                    ]
                }
            ],
            "xaxis": {
                "type": "datetime",
                "labels": {
                    "datetimeUTC": false
                }
            },
            "colors": [
                "#dc3545"
            ],
            "tooltip": {
                "fixed": {
                    "enabled": false
                },
                "x": {
                    "show": true
                },
                "y": {
                    "title": {
                        "formatter": {
                            "fn": "return \"\";",
                            "args": [
                                "seriesName"
                            ]
                        }
                    }
                },
                "marker": {
                    "show": false
                }
            }
        }
    },
    "jk00640": {
        "total": 1,
        "chart": {
            "title": {
                "text": ""
            },
            "chart": {
                "type": "area",
                "fontFamily": "Rubik, serif",
                "toolbar": {
                    "show": false,
                    "tools": {
                        "download": false,
                        "selection": true,
                        "zoom": true,
                        "zoomIn": true,
                        "zoomOut": true,
                        "pan": true,
                        "reset": true
                    }
                },
                "height": 64,
                "sparkline": {
                    "enabled": true
                }
            },
            "stroke": {
                "width": 2
            },
            "series": [
                {
                    "data": [
                        {
                            "x": "2024-01-17 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-18 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-19 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-20 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-21 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-22 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-23 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-24 GTM",
                            "y": 0
                        }
                    ]
                }
            ],
            "xaxis": {
                "type": "datetime",
                "labels": {
                    "datetimeUTC": false
                }
            },
            "colors": [
                "#dc3545"
            ],
            "tooltip": {
                "fixed": {
                    "enabled": false
                },
                "x": {
                    "show": true
                },
                "y": {
                    "title": {
                        "formatter": {
                            "fn": "return \"\";",
                            "args": [
                                "seriesName"
                            ]
                        }
                    }
                },
                "marker": {
                    "show": false
                }
            }
        }
    },
    "vst0033": {
        "total": 1,
        "chart": {
            "title": {
                "text": ""
            },
            "chart": {
                "type": "area",
                "fontFamily": "Rubik, serif",
                "toolbar": {
                    "show": false,
                    "tools": {
                        "download": false,
                        "selection": true,
                        "zoom": true,
                        "zoomIn": true,
                        "zoomOut": true,
                        "pan": true,
                        "reset": true
                    }
                },
                "height": 64,
                "sparkline": {
                    "enabled": true
                }
            },
            "stroke": {
                "width": 2
            },
            "series": [
                {
                    "data": [
                        {
                            "x": "2024-01-17 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-18 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-19 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-20 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-21 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-22 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-23 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-24 GTM",
                            "y": 0
                        }
                    ]
                }
            ],
            "xaxis": {
                "type": "datetime",
                "labels": {
                    "datetimeUTC": false
                }
            },
            "colors": [
                "#dc3545"
            ],
            "tooltip": {
                "fixed": {
                    "enabled": false
                },
                "x": {
                    "show": true
                },
                "y": {
                    "title": {
                        "formatter": {
                            "fn": "return \"\";",
                            "args": [
                                "seriesName"
                            ]
                        }
                    }
                },
                "marker": {
                    "show": false
                }
            }
        }
    },
    "swt0110": {
        "total": 1,
        "chart": {
            "title": {
                "text": ""
            },
            "chart": {
                "type": "area",
                "fontFamily": "Rubik, serif",
                "toolbar": {
                    "show": false,
                    "tools": {
                        "download": false,
                        "selection": true,
                        "zoom": true,
                        "zoomIn": true,
                        "zoomOut": true,
                        "pan": true,
                        "reset": true
                    }
                },
                "height": 64,
                "sparkline": {
                    "enabled": true
                }
            },
            "stroke": {
                "width": 2
            },
            "series": [
                {
                    "data": [
                        {
                            "x": "2024-01-17 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-18 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-19 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-20 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-21 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-22 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-23 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-24 GTM",
                            "y": 0
                        }
                    ]
                }
            ],
            "xaxis": {
                "type": "datetime",
                "labels": {
                    "datetimeUTC": false
                }
            },
            "colors": [
                "#dc3545"
            ],
            "tooltip": {
                "fixed": {
                    "enabled": false
                },
                "x": {
                    "show": true
                },
                "y": {
                    "title": {
                        "formatter": {
                            "fn": "return \"\";",
                            "args": [
                                "seriesName"
                            ]
                        }
                    }
                },
                "marker": {
                    "show": false
                }
            }
        }
    },
    "vst0024": {
        "total": 1,
        "chart": {
            "title": {
                "text": ""
            },
            "chart": {
                "type": "area",
                "fontFamily": "Rubik, serif",
                "toolbar": {
                    "show": false,
                    "tools": {
                        "download": false,
                        "selection": true,
                        "zoom": true,
                        "zoomIn": true,
                        "zoomOut": true,
                        "pan": true,
                        "reset": true
                    }
                },
                "height": 64,
                "sparkline": {
                    "enabled": true
                }
            },
            "stroke": {
                "width": 2
            },
            "series": [
                {
                    "data": [
                        {
                            "x": "2024-01-17 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-18 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-19 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-20 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-21 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-22 GTM",
                            "y": 0
                        },
                        {
                            "x": "2024-01-23 GTM",
                            "y": 1
                        },
                        {
                            "x": "2024-01-24 GTM",
                            "y": 0
                        }
                    ]
                }
            ],
            "xaxis": {
                "type": "datetime",
                "labels": {
                    "datetimeUTC": false
                }
            },
            "colors": [
                "#dc3545"
            ],
            "tooltip": {
                "fixed": {
                    "enabled": false
                },
                "x": {
                    "show": true
                },
                "y": {
                    "title": {
                        "formatter": {
                            "fn": "return ;",
                            "args": [
                                "seriesName"
                            ]
                        }
                    }
                },
                "marker": {
                    "show": false
                }
            }
        }
    }
}

export const chartStores = {
    "group_by": null,
    "head": {
        "store": {
            "label": "Магазин",
            "row_class": ""
        },
        "total": {
            "label": "Итого",
            "row_class": "text-center"
        },
        "sale": {
            "label": "Продаж",
            "row_class": "text-center"
        },
        "refund": {
            "label": "Возвраты",
            "row_class": "text-center"
        }
    },
    "data": [
        {
            "id": "00000000-0000-0000-0000-000000000000",
            "sale_by_price": 35951200,
            "total": 32034299.27,
            "sale": 33194740,
            "refund_by_price": 1160440.73,
            "refund": 1160440.73,
            "store": "Всего"
        },
        {
            "_id": "03e8e088-cc25-11eb-b9ce-9d7f16b71e89",
            "sale_by_price": 6043050,
            "sale": 5708498,
            "refund": 304750,
            "refund_by_price": 304750,
            "store_data": {
                "_id": "03e8e088-cc25-11eb-b9ce-9d7f16b71e89",
                "country": "КАЗАХСТАН",
                "isFranchise": false,
                "isOnlineStore": false,
                "isPoint": true,
                "name": "10. Алматы МегаПарк",
                "location": [
                    "43.264218",
                    "76.929271"
                ]
            },
            "store": "10. Алматы МегаПарк",
            "total": "5403748.00"
        },
        {
            "_id": "03e8e082-cc25-11eb-b9ce-9d7f16b71e89",
            "sale_by_price": 4816800,
            "sale": 4415208,
            "refund": 241455,
            "refund_by_price": 241455,
            "store_data": {
                "_id": "03e8e082-cc25-11eb-b9ce-9d7f16b71e89",
                "country": "КАЗАХСТАН",
                "isFranchise": false,
                "isOnlineStore": false,
                "isPoint": true,
                "name": "05. Астана, Khan Shatyr",
                "location": [
                    "51.132351",
                    "71.404150"
                ]
            },
            "store": "05. Астана, Khan Shatyr",
            "total": "4173753.00"
        },
        {
            "_id": "03e8e084-cc25-11eb-b9ce-9d7f16b71e89",
            "sale_by_price": 4192950,
            "sale": 4011039,
            "refund": 114300,
            "refund_by_price": 114300,
            "store_data": {
                "_id": "03e8e084-cc25-11eb-b9ce-9d7f16b71e89",
                "country": "КАЗАХСТАН",
                "isFranchise": false,
                "isOnlineStore": false,
                "isPoint": true,
                "name": "06. Астана Mega Silkway",
                "location": [
                    "51.089113",
                    "71.407161"
                ]
            },
            "store": "06. Астана Mega Silkway",
            "total": "3896739.00"
        },
        {
            "_id": "03e8e0ce-cc25-11eb-b9ce-9d7f16b71e89",
            "sale_by_price": 4000150,
            "sale": 3640687,
            "refund": 163266.5,
            "refund_by_price": 163266.5,
            "store_data": {
                "_id": "03e8e0ce-cc25-11eb-b9ce-9d7f16b71e89",
                "country": "КАЗАХСТАН",
                "isFranchise": false,
                "isOnlineStore": false,
                "isPoint": true,
                "name": "17. Шымкент",
                "location": [
                    "42.319266094229214",
                    "69.59622865636662"
                ]
            },
            "store": "17. Шымкент",
            "total": "3477420.50"
        },
        {
            "_id": "03e8e080-cc25-11eb-b9ce-9d7f16b71e89",
            "sale_by_price": 3894550,
            "sale": 3489106,
            "refund": 35055,
            "refund_by_price": 35055,
            "store_data": {
                "_id": "03e8e080-cc25-11eb-b9ce-9d7f16b71e89",
                "country": "КАЗАХСТАН",
                "isFranchise": false,
                "isOnlineStore": false,
                "isPoint": true,
                "name": "15. Атырау, Baizaar",
                "location": [
                    "47.108592",
                    "51.900485"
                ]
            },
            "store": "15. Атырау, Baizaar",
            "total": "3454051.00"
        },
        {
            "_id": "03e8e076-cc25-11eb-b9ce-9d7f16b71e89",
            "sale_by_price": 3478950,
            "sale": 3184587,
            "refund": 218714.22999999998,
            "refund_by_price": 218714.22999999998,
            "store_data": {
                "_id": "03e8e076-cc25-11eb-b9ce-9d7f16b71e89",
                "country": "КАЗАХСТАН",
                "isFranchise": false,
                "isOnlineStore": false,
                "isPoint": true,
                "name": "14. Актобе Keruen City ",
                "location": [
                    "50.289178",
                    "57.193260"
                ]
            },
            "store": "14. Актобе Keruen City ",
            "total": "2965872.77"
        },
        {
            "_id": "03e8e078-cc25-11eb-b9ce-9d7f16b71e89",
            "sale_by_price": 3346300,
            "sale": 3202813,
            "refund": 82900,
            "refund_by_price": 82900,
            "store_data": {
                "_id": "03e8e078-cc25-11eb-b9ce-9d7f16b71e89",
                "country": "КАЗАХСТАН",
                "isFranchise": false,
                "isOnlineStore": false,
                "isPoint": true,
                "name": "09. Mega Алматы",
                "location": [
                    "43.202540",
                    "76.892177"
                ]
            },
            "store": "09. Mega Алматы",
            "total": "3119913.00"
        },
        {
            "_id": "03e8e070-cc25-11eb-b9ce-9d7f16b71e89",
            "sale_by_price": 2921850,
            "sale": 2680038,
            "refund": 0,
            "refund_by_price": 0,
            "store_data": {
                "_id": "03e8e070-cc25-11eb-b9ce-9d7f16b71e89",
                "country": "КАЗАХСТАН",
                "isFranchise": false,
                "isOnlineStore": false,
                "isPoint": true,
                "name": "07. CityMall Караганда",
                "location": [
                    "49.800234",
                    "73.087702"
                ]
            },
            "store": "07. CityMall Караганда",
            "total": "2680038.00"
        },
        {
            "_id": "03e8e08a-cc25-11eb-b9ce-9d7f16b71e89",
            "sale_by_price": 2084000,
            "sale": 1812839,
            "refund": 0,
            "refund_by_price": 0,
            "store_data": {
                "_id": "03e8e08a-cc25-11eb-b9ce-9d7f16b71e89",
                "country": "КАЗАХСТАН",
                "isFranchise": false,
                "isOnlineStore": false,
                "isPoint": true,
                "name": "16. Костанай, Kostanay Plaza",
                "location": [
                    "53.236943",
                    "63.614445"
                ]
            },
            "store": "16. Костанай, Kostanay Plaza",
            "total": "1812839.00"
        },
        {
            "_id": "03e8e074-cc25-11eb-b9ce-9d7f16b71e89",
            "sale_by_price": 1172600,
            "sale": 1049925,
            "refund": 0,
            "refund_by_price": 0,
            "store_data": {
                "_id": "03e8e074-cc25-11eb-b9ce-9d7f16b71e89",
                "country": "КАЗАХСТАН",
                "isFranchise": false,
                "isOnlineStore": false,
                "isPoint": true,
                "name": "02. Тулпар Павлодар",
                "location": [
                    "52.285120",
                    "76.965749"
                ]
            },
            "store": "02. Тулпар Павлодар",
            "total": "1049925.00"
        }
    ],
    "onRender": {
        "total": {
            "args": [
                "row",
                "td",
                "row_index"
            ],
            "fn": "const __colors = [\"#008FFB\",\"#00E396\",\"#FEB019\",\"#FF4560\",\"#775DD0\",\"#6610f2\",\"#d63384\",\"#fd7e14\",\"#198754\",\"#20c997\",\"#0dcaf0\"]; return lui.ui.table_row_progress(row['total'], 32034299.27, __colors[row_index]);"
        },
        "sale": {
            "args": [
                "row",
                "td",
                "row_index"
            ],
            "fn": "const __colors = [\"#008FFB\",\"#00E396\",\"#FEB019\",\"#FF4560\",\"#775DD0\",\"#6610f2\",\"#d63384\",\"#fd7e14\",\"#198754\",\"#20c997\",\"#0dcaf0\"]; return lui.ui.table_row_progress(row['sale'], 32034299.27, __colors[row_index], Number(row['sale'] - row['sale_by_price']).format());"
        },
        "refund": {
            "args": [
                "row",
                "td",
                "row_index"
            ],
            "fn": "const __colors = [\"#008FFB\",\"#00E396\",\"#FEB019\",\"#FF4560\",\"#775DD0\",\"#6610f2\",\"#d63384\",\"#fd7e14\",\"#198754\",\"#20c997\",\"#0dcaf0\"]; return lui.ui.table_row_progress(row['refund'], 32034299.27, __colors[row_index], Number(row['refund'] - row['refund_by_price']).format());"
        }
    }
}
