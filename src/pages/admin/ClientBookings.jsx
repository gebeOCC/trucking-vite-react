import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import axiosInstance from "../../axios/axiosInstance";
import { formatPrice, formatDate } from "../../Utilities/utils";
import BookingDetails from "./BookingDetails";

function ClientBookings() {
    const { id } = useParams();

    const [fetchLoading, setFetchLoading] = useState(true);
    const [clientInfo, setClientInfo] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [bookingId, setBookingId] = useState(0);
    const [selectedVehicletype, setSelectedVehivcleType] = useState('all')
    const [selectedPickupType, setSelectedPickupType] = useState('all')

    const fetchClientBookings = () => {
        axiosInstance.get(`get-client-bookings/${id}`)
            .then(response => {
                console.log(response.data);
                setClientInfo(response.data.client_info)
                setBookings(response.data.bookings)
                setVehicleTypes(response.data.vehicle_types)
            })
            .finally(() => {
                setFetchLoading(false)
            })
    }

    useEffect(() => {
        fetchClientBookings()
    }, [])

    const vehicletypesData = vehicleTypes.map((vehicletype) => (
        <option key={vehicletype.id} value={vehicletype.vehicle_type_name}>
            {vehicletype.vehicle_type_name}
        </option>
    ));

    // Add the 'Vehicle type ALL' option at the beginning of the array
    vehicletypesData.unshift(
        <option key="default" value="all">
            ALL
        </option>
    );

    let bookingsData = '';

    if (bookings.length > 0) {
        bookingsData = bookings.map((booking) => (
            <>
                {(selectedVehicletype === "all" || booking.vehicle_type_name === selectedVehicletype) &&
                    (selectedPickupType === "all" || booking.pickup_type === selectedPickupType) &&
                    <tr key={booking.id}>
                        <th>{booking.booking_status}</th>
                        <th>{booking.pickup_type}</th>
                        <th>{booking.vehicle_type_name}</th>
                        <td>{formatDate(booking.pickup_date)}</td>
                        <td>{booking.distance}km</td>
                        <td>₱{formatPrice(booking.price)}</td>
                        <td>
                            {bookingId !== booking.id ? (
                                <svg
                                    onClick={() => setBookingId(booking.id)}
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
                }
            </>
        ));
    } else {
        bookingsData = (
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
            <Link to={'/clients'}>
                <label htmlFor="add-vehicle-modal" className="btn mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                    Back
                </label>
            </Link>

            {fetchLoading ? (
                <div>
                    <span className="loading loading-ring loading-lg"></span>
                </div>
            ) : (
                <>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img src={`http://localhost:8000/profile-pictures/${clientInfo.profile_picture}`} alt="Avatar Tailwind CSS Component" />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">{clientInfo.full_name}</div>
                        </div>
                    </div>

                    {bookingId === 0 ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Status</th>
                                    <th>Pickup type<select
                                        onChange={(e) => { setSelectedPickupType(e.target.value) }}
                                        className="select p-0 w-auto ml-2">
                                        <option value="all">
                                            ALL
                                        </option>
                                        <option value="quick">
                                            Quick
                                        </option>
                                        <option value="schedule">
                                            Schedule
                                        </option>
                                    </select></th>
                                    <th>Vehicle type
                                        <select
                                            onChange={(e) => { setSelectedVehivcleType(e.target.value) }}
                                            className="select p-0 w-auto ml-2">
                                            {vehicletypesData}
                                        </select>
                                    </th>
                                    <th>Pickup date</th>
                                    <th>Distance</th>
                                    <th>Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* TBODY */}
                                {bookingsData}
                            </tbody>
                        </table>
                    ) : (
                        <BookingDetails bookingId={bookingId} setBookingId={setBookingId} />
                    )
                    }
                </>
            )
            }
        </>
    )
}

export default ClientBookings