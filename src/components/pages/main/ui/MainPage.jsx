'use client'

import React from 'react';
import {Button} from "@/components/shared/ui/button";
import Chart from 'react-apexcharts';
import {Heading} from "@/components/shared/uikit/heading";

/**
 * @author Zholaman Zhumanov
 * @created 23.01.2024
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function MainPage(props) {
    const [options, setOptions] = React.useState({
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: ['January', 'February', 'March', 'April', 'May', 'June']
        },
        colors: ['#F44336', '#E91E63', '#9C27B0']  // Specify your colors here
    });

    const [options2, setOptions2] = React.useState({
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: ['January', 'February', 'March', 'April', 'May', 'June']
        },
        colors: ['#9C27B0']  // Specify your colors here
    });

    const [series, setSeries] = React.useState([
        {
            name: "series-1",
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
        }
    ]);

    return (
        <>
            <div className={"w-100"}>
                <Heading type={"h1"}>Overview</Heading>

                <div className={"w-100 grid 2xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3 mb-6"}>
                    <div className={"rounded p-5 border flex items-end justify-between"}>
                        <div>
                            <div className={"text-sm font-light mb-2"}>Заказы</div>
                            <div className={"text-xl font-bold mb-1"}>1250</div>
                            <div className={"text-xs text-green-400"}>+25.3434%</div>
                        </div>

                        <div>
                            <Button variant={"secondary"} className={"text-xs"}>Подробнее</Button>
                        </div>
                    </div>
                    <div className={"rounded p-5 border flex items-end justify-between"}>
                        <div>
                            <div className={"text-sm font-light mb-2"}>Возвраты</div>
                            <div className={"text-xl font-bold mb-1"}>50</div>
                            <div className={"text-xs text-red-400"}>-15.3434%</div>
                        </div>

                        <div>
                            <Button variant={"secondary"} className={"text-xs"}>Подробнее</Button>
                        </div>
                    </div>
                    <div className={"rounded p-5 border flex items-end justify-between"}>
                        <div>
                            <div className={"text-sm font-light mb-2"}>Заказы</div>
                            <div className={"text-xl font-bold mb-1"}>11250</div>
                            <div className={"text-xs text-green-400"}>+25.3434%</div>
                        </div>

                        <div>
                            <Button variant={"secondary"} className={"text-xs"}>Подробнее</Button>
                        </div>
                    </div>
                    <div className={"rounded p-5 border flex items-end justify-between"}>
                        <div>
                            <div className={"text-sm font-light mb-2"}>Заказы</div>
                            <div className={"text-xl font-bold mb-1"}>12350</div>
                            <div className={"text-xs text-red-400"}>-5.3434%</div>
                        </div>

                        <div>
                            <Button variant={"secondary"} className={"text-xs"}>Подробнее</Button>
                        </div>
                    </div>
                </div>

                <div className={"w-100 grid 2xl:grid-cols-2 grid-cols-1 gap-3 mb-6"}>
                    <div className={"rounded p-5 border"}>
                        <h3 className={"text-xl mb-1"}>Overview Orders</h3>
                        <Chart
                            options={options}
                            series={series}
                            type="line"
                            height={350}
                        />
                        <div id="html-dist"></div>
                    </div>
                    <div className={"rounded p-5 border"}>
                        <h3 className={"text-xl mb-1"}>Overview Returns</h3>
                        <Chart
                            options={options2}
                            series={series}
                            type="bar"
                            height={350}
                        />
                        <div id="html-dist"></div>
                    </div>
                </div>

                <div className={"w-100 grid grid-cols-2 gap-3 mb-6"}>
                    <div className={"rounded p-5 border"}>
                        <h3 className={"text-xl mb-1"}>Best Selling Recent</h3>
                    </div>
                    <div className={"rounded p-5 border"}>
                        <h3 className={"text-xl mb-1"}>Overview Returns</h3>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainPage;
