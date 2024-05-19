import { useEffect } from "react";
import { formatDate } from "../../Utilities/utils";

function DeliveryGraph({ chartData }) {

    console.log(chartData)
    const options = {
        chart: {
            height: "100%",
            maxWidth: "100%",
            type: "line",
            fontFamily: "Inter, sans-serif",
            dropShadow: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        tooltip: {
            enabled: true,
            x: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 6,
        },
        grid: {
            show: true,
            strokeDashArray: 4,
            padding: {
                left: 2,
                right: 2,
                top: -26
            },
        },
        series: [
            {
                name: "Bookings",
                data: chartData.map(data => data.count),
                color: "#1A56DB",
            },
        ],
        legend: {
            show: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: chartData.map(data => formatDate(data.date).slice(0, -6)),
            labels: {
                show: true,
                style: {
                    fontFamily: "Inter, sans-serif",
                    cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
                }
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: true,
            labels: {
                show: true,
                style: {
                    fontFamily: "Inter, sans-serif",
                    cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
                },
                formatter: function (value) {
                    return value;
                }
            }
        },
    };


    useEffect(() => {
        if (document.getElementById("line-chart") && typeof ApexCharts !== 'undefined') {
            const chart = new ApexCharts(document.getElementById("line-chart"), options);
            chart.render();

            return () => {
                chart.destroy();
            };
        }
    }, [chartData]);

    return (

        <div class="max-w-xl w-screen bg-white rounded-lg shadow p-4 md:p-6">
            <div class="flex justify-between mb-5">
                <div class="grid gap-4 grid-cols-2">
                    <div>
                        <p class="text-primary text-2xl leading-none font-bold">Deliveries</p>
                    </div>
                </div>
            </div>
            <div id="line-chart"></div>
        </div>

    )
}

export default DeliveryGraph