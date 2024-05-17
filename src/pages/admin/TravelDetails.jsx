import { useEffect, useState } from "react";
import axiosInstance from "../../axios/axiosInstance";
import { formatDate, convertToAMPM } from "../../Utilities/utils";
import config from "../../config";

function TravelDetails({ travelId, setTravelId }) {
    const [travelDetails, setTravelDetails] = useState(null);

    const getTravelDetails = async () => {
        try {
            const response = await axiosInstance.get(`travel-details/${travelId}`);
            setTravelDetails(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching travel details:", error);
        }
    };

    useEffect(() => {
        getTravelDetails();
    }, [travelId]);

    if (!travelDetails) {
        return <h1 className="text-center text-xl">Loading...</h1>;
    }

    return (
        <div className="p-6 space-y-6  text-black">
            <label onClick={() => { setTravelId(0) }} htmlFor="add-vehicle-modal" className="btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>
                return
            </label>
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
                <div className={`inline-block ${travelDetails.travel_status === 'delivered' ? 'text-green-500' : 'text-blue-500'}`}>
                    <h1 className="text-2xl font-bold">{travelDetails.travel_status === 'delivered' ? 'Delivered' : travelDetails.travel_status}</h1>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold">{formatDate(travelDetails.pickup_date)}</h3>
                        <h3 className="text-lg font-semibold">{convertToAMPM(travelDetails.pickup_time)}</h3>
                        <h3 className="text-lg">Amount to pay: {travelDetails.price}</h3>
                        <h3 className="text-lg">Vehicle: {travelDetails.model}</h3>
                        <h3 className="text-lg">Plate number: {travelDetails.plate_number}</h3>
                        <h3 className="text-lg">Client: {travelDetails.client_full_name}</h3>
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={`http://localhost:8000/profile-pictures/${travelDetails.profile_picture}`} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <img
                            src={`${config.hostname}${config.paths.goodsPhoto}/${travelDetails.goods_photo}`}
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
                        <p>{travelDetails.pickup_location_address}</p>
                        <p>{travelDetails.sender_name}</p>
                        <p>{travelDetails.sender_contact_number}</p>
                        <p>{travelDetails.pickup_location_details}</p>
                        {travelDetails.travel_status !== 'in progress' && (
                            <p>Pickup time: {convertToAMPM(travelDetails.travel_pickup_time)}</p>
                        )}
                    </div>
                    {travelDetails.travel_status !== 'in progress' && (
                        <div>
                            <img
                                src={`${config.hostname}${config.paths.goodsPhoto}/${travelDetails.pickup_goods_photo}`}
                                alt="Pickup Goods"
                                className="w-full rounded-lg"
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-xl font-bold">Dropoff</h2>
                        <p>{travelDetails.dropoff_location_address}</p>
                        <p>{travelDetails.recipient_name}</p>
                        <p>{travelDetails.recipient_contact_number}</p>
                        <p>{travelDetails.dropoff_location_details}</p>
                        {travelDetails.travel_status === 'delivered' && (
                            <p>Dropoff time: {convertToAMPM(travelDetails.dropoff_time)}</p>
                        )}
                    </div>
                    {travelDetails.travel_status === 'delivered' && (
                        <div>
                            <img
                                src={`${config.hostname}${config.paths.goodsPhoto}/${travelDetails.dropoff_goods_photo}`}
                                alt="Dropoff Goods"
                                className="w-full rounded-lg"
                            />
                        </div>
                    )}
                </div>
            </div>

            {travelDetails.travel_status === 'delivered' && (
                <div className="bg-white rounded-lg shadow-md p-4 text-center">
                    <img
                        src={`${config.hostname}${config.paths.signature}/${travelDetails.signature_image}`}
                        alt="Signature"
                        className="w-1/2 mx-auto rounded-lg"
                    />
                </div>
            )}
        </div>
    );
}

export default TravelDetails;
