import axiosInstance from "../../axios/axiosInstance";
import DeliveryGraph from "../components/DeliveryGraph";
import { useState, useEffect } from "react";
function Dashboard() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        axiosInstance.get('get-dashboard-data')
            .then(response => {
                setChartData(response.data.chartDelivery)
            })
    }, [])

    return (
        <>
            <DeliveryGraph chartData={chartData} />
        </>
    )
}

export default Dashboard;