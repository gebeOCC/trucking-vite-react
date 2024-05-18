import { useEffect, useState } from "react"
import axiosInstance from "../../axios/axiosInstance";
import { formatDate, convertToAMPM, formatPrice } from "../../Utilities/utils";
import config from "../../config";
function BookingDetails({ bookingId, setBookingId }) {
    const [bookingDetails, setBookingDetails] = useState(null);

    const fetchBookingDetails = () => {
        axiosInstance.get(`booking-details/${bookingId}`)
            .then(response => {
                setBookingDetails(response.data)
            })
    }

    useEffect(() => {
        fetchBookingDetails();
    }, [])
    if (!bookingDetails) {
        return <h1 className="text-center text-xl">Loading...</h1>;
    }

    return (
        <div className="p-6 space-y-6  text-black">
            <label onClick={() => { setBookingId(0) }} htmlFor="add-vehicle-modal" className="btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>
                return
            </label>
            {bookingDetails.booking_status !== 'pending' ? (
                <div className="bg-white rounded-lg shadow-md p-4 text-center">
                    <div className={`inline-block ${bookingDetails.travel_status === 'delivered' ? 'text-green-500' : 'text-blue-500'}`}>
                        <h1 className="text-2xl font-bold">{bookingDetails.travel_status === 'delivered' ? 'Delivered' : bookingDetails.travel_status}</h1>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md p-4 text-center">
                    <div className={`inline-block text-sky-500`}>
                        <h1 className="text-2xl font-bold">{bookingDetails.booking_status}</h1>
                    </div>
                </div>
            )
            }

            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold">{formatDate(bookingDetails.pickup_date)}</h3>
                        <h3 className="text-lg font-semibold">{convertToAMPM(bookingDetails.pickup_time)}</h3>
                        <h3 className="text-lg">Amount to pay: ₱{formatPrice(bookingDetails.price)}</h3>
                        {bookingDetails.booking_status !== 'pending' &&
                            <>
                                <h3 className="text-lg">Vehicle: {bookingDetails.model}</h3>
                                <h3 className="text-lg">Plate number: {bookingDetails.plate_number}</h3>
                                <h3 className="text-lg">Driver: {bookingDetails.driver_full_name}</h3>
                                <div className="mask mask-squircle w-12 h-12">
                                    <img src={`http://localhost:8000/profile-pictures/${bookingDetails.profile_picture}`} alt="Avatar Tailwind CSS Component" />
                                </div>
                            </>
                        }
                    </div>
                    <div>
                        <img
                            src={`${config.hostname}${config.paths.goodsPhoto}/${bookingDetails.goods_photo}`}
                            alt="Goods"
                            className="w-full rounded-lg"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-xl font-bold">Pickup</h2>
                        <p>{bookingDetails.pickup_location_address}</p>
                        <p>{bookingDetails.sender_name}</p>
                        <p>{bookingDetails.sender_contact_number}</p>
                        <p>{bookingDetails.pickup_location_details}</p>
                        {bookingDetails.booking_status !== 'pending' &&
                            <>
                                {bookingDetails.travel_status !== 'in progress' && (
                                    <p>Pickup time: {convertToAMPM(bookingDetails.travel_pickup_time)}</p>
                                )}
                            </>
                        }

                    </div>

                    {bookingDetails.booking_status !== 'pending' &&
                        <>
                            {bookingDetails.travel_status !== 'in progress' && (
                                <div>
                                    <img
                                        src={`${config.hostname}${config.paths.goodsPhoto}/${bookingDetails.pickup_goods_photo}`}
                                        alt="Pickup Goods"
                                        className="w-full rounded-lg"
                                    />
                                </div>
                            )}
                        </>
                    }

                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-xl font-bold">Dropoff</h2>
                        <p>{bookingDetails.dropoff_location_address}</p>
                        <p>{bookingDetails.recipient_name}</p>
                        <p>{bookingDetails.recipient_contact_number}</p>
                        <p>{bookingDetails.dropoff_location_details}</p>
                        {bookingDetails.travel_status === 'delivered' && (
                            <p>Dropoff time: {convertToAMPM(bookingDetails.dropoff_time)}</p>
                        )}
                    </div>
                    {bookingDetails.travel_status === 'delivered' && (
                        <div>
                            <img
                                src={`${config.hostname}${config.paths.goodsPhoto}/${bookingDetails.dropoff_goods_photo}`}
                                alt="Dropoff Goods"
                                className="w-full rounded-lg"
                            />
                        </div>
                    )}
                </div>
            </div>

            {bookingDetails.travel_status === 'delivered' && (
                <div className="bg-white rounded-lg shadow-md p-4 text-center">
                    <img
                        src={`${config.hostname}${config.paths.signature}/${bookingDetails.signature_image}`}
                        alt="Signature"
                        className="w-1/2 mx-auto rounded-lg"
                    />
                </div>
            )}
        </div>
    )
}

export default BookingDetails