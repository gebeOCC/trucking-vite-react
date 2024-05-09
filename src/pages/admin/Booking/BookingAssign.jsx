import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../../axios/axiosInstance";
import BookingDriver from "./BookingDriver";
import BookingVehicle from "./BookingVehicle";

function BookingAssign() {
    let { id } = useParams();
    const [booking, setBooking] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [showComponent, setShowComponent] = useState('vehicle');
    const [success, setSuccess] = useState(false);

    const [form, setForm] = useState({
        booking_id: id,
        driver_id: '',
        vehicle_id: '',
    })

    const getBooking = async () => {
        await axiosInstance.get(`get-booking/${id}`)
            .then(response => {
                setBooking(response.data.booking);
                setVehicles(response.data.vehicle)
                setDrivers(response.data.driver)
                console.log(response.data);
                setFetchLoading(false)
            });
    };

    useEffect(() => {
        getBooking();
    }, []);


    if (booking.booking_status === 'approved') {
        return <>
            <Link to={'/bookings'}>
                <label htmlFor="add-vehicle-modal" className="btn mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                    Back
                </label>
            </Link>
            <h1>Booking Alreadry approved</h1></>
    }

    const selectedVehicle = vehicles.find(vehicle => vehicle.id === form.vehicle_id);
    const selectedDriver = drivers.find(driver => driver.id === form.driver_id);

    const handleSubmit = async () => {
        await axiosInstance.post('add-travel', form)
            .then(response => {
                console.log(response.data.message)
                if (response.data.message === 'success') {
                    setSuccess(true);
                }
            })
    }

    if (fetchLoading) {
        return (
            <div className="flex flex-col">
                <Link to={'/bookings'}>
                    <label htmlFor="add-vehicle-modal" className="btn mb-5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>
                        Back
                    </label>
                </Link>
                <span className="loading loading-ring loading-lg"></span>
            </div>
        )
    }

    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleString('en-US', options);
    };

    function convertToAMPM(time) {
        // Create a new Date object from the input time string
        const date = new Date(`2000-01-01T${time}`);

        // Get the hours and minutes components
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');

        // Convert hours to 12-hour format
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // Handle 0 (midnight) as 12 AM

        // Format the time string
        const formattedTime = `${hours}:${minutes} ${ampm}`;

        return formattedTime;
    }


    return (
        <>
            <Link to={'/bookings'}>
                <label htmlFor="add-vehicle-modal" className="btn mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                    Back
                </label>
            </Link>
            <div className="flex gap-2 h-screen">
                {/* Booking */}
                <div className="w-3/6 bg-white rounded-md shadow-md p-6 h-4/6">
                    <h1 className="text-2xl font-semibold mb-4 text-black">Booking Details</h1>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Name:</span>
                            <span className="font-semibold text-accent">{booking.full_name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Pickup Date:</span>
                            <span className="font-semibold text-accent">{formatDate(booking.pickup_date)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Pickup Time:</span>
                            <span className="font-semibold text-accent">{convertToAMPM(booking.pickup_time)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Distance:</span>
                            <span className="font-semibold text-accent">{booking.distance} km</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Price:</span>
                            <span className="font-semibold text-accent">₱{booking.price}</span>
                        </div>
                        <div className="divider"></div>
                        <div className="flex justify-between">
                            <div className="w-3/5">
                                <span className="text-lg font-bold text-gray-600">Vehicle:</span>
                                {form.vehicle_id && selectedVehicle ? (
                                    <>
                                        <p className="text-accent">{selectedVehicle.model}</p>
                                        <p className="text-accent">{selectedVehicle.plate_number}</p>
                                    </>
                                ) : (
                                    <></>
                                )
                                }
                            </div>
                            <div className="w-3/5">
                                <span className="text-lg font-bold text-gray-600">Driver:</span>
                                {form.driver_id && selectedDriver ? (
                                    <>
                                        <p className="text-accent">{selectedDriver.full_name}</p>
                                        <p className="text-accent">{selectedDriver.license_expiry_date}</p>
                                    </>
                                ) : (
                                    <></>
                                )
                                }
                            </div>
                        </div>
                        {form.vehicle_id && form.driver_id ? (
                            <>
                                <button
                                    onClick={handleSubmit}
                                    className="btn btn-primary ">
                                    Submit
                                </button>
                            </>
                        ) : (
                            <></>
                        )
                        }
                    </div>
                </div>

                {/* Assign Driver and Vehicle to booking */}
                <div
                    className="w-3/6 h-4/6">
                    <div
                        className="flex">
                        <button
                            className={`w-3/6 px-4 py-2 rounded-tl-md ${showComponent === 'vehicle'
                                ? 'bg-neutral text-white'
                                : 'bg-neutral bg-opacity-30 '
                                }`}
                            onClick={() => setShowComponent('vehicle')}
                        >
                            Vehicle
                        </button>
                        <button
                            className={`w-3/6 px-4 py-2 rounded-tr-md  ${showComponent === 'driver'
                                ? 'bg-neutral text-white'
                                : 'bg-neutral bg-opacity-30 '
                                }`}
                            onClick={() => setShowComponent('driver')}
                        >
                            Driver
                        </button>
                    </div>
                    <div style={{ height: '90%', maxHeight: '90%' }}
                        className="p-4 rounded-b-md bg-neutral text-white overflow-y-auto">
                        {showComponent === 'vehicle' ?
                            <BookingVehicle vehicles={vehicles} form={form} setForm={setForm} formatDate={formatDate} convertToAMPM={convertToAMPM} />
                            :
                            <BookingDriver drivers={drivers} form={form} setForm={setForm} formatDate={formatDate} convertToAMPM={convertToAMPM} />
                        }
                    </div>
                </div>

                <input type="checkbox" checked={success} id="my_modal_6" className="modal-toggle" />
                <div className="modal" role="dialog">
                    <div className="modal-box center">
                        <h3
                            className="font-bold text-lg flex gap-2 items-center mb-5">
                            Vehicle and Driver assigned successfully
                            <svg xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-success">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </h3>
                        <Link to={'/bookings'}>
                            <label htmlFor="add-vehicle-modal" className="btn btn-secondary w-full">
                                Back to bookings
                            </label>
                        </Link>
                    </div>
                </div>
            </div>

        </>
    );
}

export default BookingAssign;