import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import axiosInstance from "../../axios/axiosInstance";
import { formatDate, convertToAMPM } from "../../Utilities/utils";
import TravelDetails from "./TravelDetails";

function DriverTravels() {
    const { id } = useParams();
    const [travels, setTravels] = useState([]);
    const [driverInfo, setDriverInfo] = useState([]);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [travelDetails, setTravelDetails] = useState([]);
    const [travelId, setTravelId] = useState(0);

    const driverTravels = async () => {
        await axiosInstance.get(`driver-travels/${id}`)
            .then(response => {
                setTravels(response.data.travels)
                setDriverInfo(response.data.driver_info)
                console.log(response.data)
                setFetchLoading(false)
            })
    }

    useEffect(() => {
        driverTravels();
    }, [])

    const getTravelDetails = async (id) => {
        setTravelId(id)
    }

    let tavelsData = '';

    if (travels.length > 0) {
        tavelsData = travels.map((travel, index) => (
            <tr key={travel.id}>
                <th>{travel.travel_status}</th>
                <th>{travel.pickup_type}</th>
                <td>{formatDate(travel.pickup_date)}</td>
                <td>{convertToAMPM(travel.pickup_time)}</td>
                <td>{travel.client_full_name}</td>
                <td>
                    {travelId !== travel.id ? (
                        <svg
                            onClick={() => getTravelDetails(travel.id)}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-info cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>
                    )}
                </td>
            </tr>
        ));
    } else {
        tavelsData = (
            <tr>
                <th>No data...</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        );
    }

    return (
        <>
            <Link to={'/drivers'}>
                <label htmlFor="add-vehicle-modal" className="btn mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                    Back
                </label>
            </Link>
            {fetchLoading ? (
                <>
                    <div>
                        <span className="loading loading-ring loading-lg"></span>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img src={`http://localhost:8000/profile-pictures/${driverInfo.profile_picture}`} alt="Avatar Tailwind CSS Component" />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">{driverInfo.driver_full_name}</div>
                        </div>
                    </div>

                    {travelId === 0 ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Status</th>
                                    <th>Pickup type</th>
                                    <th>Pickup date</th>
                                    <th>Pickup time</th>
                                    <th>Client</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* TBODY */}
                                {tavelsData}
                            </tbody>
                        </table>
                    ) : (
                        <TravelDetails travelId={travelId} setTravelId={setTravelId} />
                    )
                    }
                </>
            )
            }
        </>
    )
}

export default DriverTravels