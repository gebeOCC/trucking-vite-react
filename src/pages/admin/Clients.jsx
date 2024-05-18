import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../axios/axiosInstance";

function Clients() {
    const [clients, setClients] = useState([]);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [searchBar, setSearchBar] = useState('')

    const getDriver = async () => {
        await axiosInstance.get('get-clients')
            .then(response => {
                setClients(response.data);
                console.log(response.data);
                setFetchLoading(false);
            })
    }

    useEffect(() => {
        getDriver();
    }, [])

    let clientsData = '';

    if (fetchLoading) {
        // TBODY skeleton
        clientsData = Array.from({ length: 1 }).map((_, index) => (
            <tr key={index} className="skeleton">
                <th></th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="flex gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>
                </td>
            </tr>
        ));
    } else if (clients.length > 0) {
        // TBODY with vehicle
        clientsData = clients.map((client) => (
            <>
                {(searchBar === "" || client.full_name.toLowerCase().includes(searchBar.toLowerCase())) &&
                    (
                        <tr key={client.id}>
                            <th>{client.id}</th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={`http://localhost:8000/profile-pictures/${client.profile_picture}`} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{client.full_name}</div>
                                    </div>
                                </div>
                            </td>
                            {/* <td>{driver.full_name}</td> */}
                            <td>{client.email}</td>
                            <td>{client.phone_number}</td>
                            <td>{client.total_bookings}</td>
                            <td>
                                <Link to={`./client-bookings/${client.id}`}>
                                    <svg
                                        className="w-6 h-6 text-info cursor-pointer"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                                    </svg>
                                </Link>
                            </td>
                        </tr>
                    )
                }
            </>
        ));
    } else {
        // TBODY empty
        clientsData = (
            <tr>
                <th>No data...</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="flex gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>
                </td>
            </tr>
        );
    }
    return (
        <div className="overflow-x-auto">
            <input className="input input-bordered join-item bg-base-200 w-2/4" onChange={(e) => { setSearchBar(e.target.value) }} placeholder="Search name" />
            {/* TABLE */}
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Bookings</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* TBODY */}
                    {clientsData}
                </tbody>
            </table>
            {searchBar}
        </div>
    )
}

export default Clients; 