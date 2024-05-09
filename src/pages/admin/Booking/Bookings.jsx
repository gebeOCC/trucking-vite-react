import { useState, useEffect } from "react";
import axiosInstance from "../../../axios/axiosInstance";
import { Link } from "react-router-dom";

function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [fetchLoading, setFetchLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get('get-bookings')
            .then(response => {
                setBookings(response.data);
                console.log(response.data);
                setFetchLoading(false)
            })
    }, [])

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

    var bookingsData = "";

    if (fetchLoading) {
        // TBODY skeleton
        bookingsData = Array.from({ length: 1 }).map((_, index) => (
            <tr key={index} className="skeleton">
                <th></th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        ));
    } else if (bookings.length > 0) {
        // TBODY with vehicle
        bookingsData = bookings.map((booking, index) => (
            <tr key={index}>
                <td>{booking.id}</td>
                <td>{booking.full_name}</td>
                <td>{booking.pickup_type}</td>
                <td>{formatDate(booking.pickup_date)}</td>
                <td>{convertToAMPM(booking.pickup_time)}</td>
                <td>
                    <Link to={`./assign/${booking.id}`}>
                        <button className="btn btn-active btn-accent">Assign</button>
                    </Link>
                </td>
            </tr>
        ));
    } else {
        bookingsData = Array.from({ length: 1 }).map((_, index) => (
            <tr key={index}>
                <th>No pending bookings</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        ));
    }
    

    return (
        <>
            {/* TABLE */}

            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Pickup type</th>
                        <th>Pickup date</th>
                        <th>Pickup time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bookingsData}
                </tbody>
            </table>
        </>
    )
}

export default Bookings;