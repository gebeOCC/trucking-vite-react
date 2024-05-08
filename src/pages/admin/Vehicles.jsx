import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../axios/axiosInstance";
import Toast from "../components/Toast";

function Vehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [fetchLoading, setFetchLoading] = useState(true);

    const [toastMessage, setToastMessage] = useState('');
    const [successToast, setSuccessToast] = useState(false);

    const fetchVehicles = async () => {
        await axiosInstance.get('get-vehicles')
            .then(response => {
                setVehicles(response.data);
                setFetchLoading(false);
            })
    }

    useEffect(() => {
        fetchVehicles();
    }, [])

    const statusClasses = {
        'active': 'text-success',
        'inactive': 'text-error',
        'in repair': 'text-warning',
    };

    const [formDelete, setFormDelete] = useState({
        id: "",
        model: "",
        plate_number: "",
        vehicle_type_name: "",
    });

    const removeVehicle = async () => {
        console.log(formDelete)
        await axiosInstance.post(`delete-vehicle/${formDelete.id}`)
        .then(response =>{
            if (response.data.message){
                setToastMessage(response.data.message)
                setSuccessToast(true)
                const deleteModal = document.getElementById('deleteModal');
                if (deleteModal) {
                    deleteModal.close();
                }
                fetchVehicles();
            }
        });
    }

    const deleteVehicle = (id, model, plate_number, vehicle_type_name) => {
        setFormDelete({
            id: id,
            model: model,
            plate_number: plate_number,
            vehicle_type_name: vehicle_type_name
        });
        document.getElementById('deleteModal').showModal()
    }

    var vehiclesData = "";

    if (fetchLoading) {
        // TBODY skeleton
        vehiclesData = Array.from({ length: 1 }).map((_, index) => (
            <tr key={index} className="skeleton">
                <th></th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="flex gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </td>
            </tr>
        ));
    } else if (vehicles.length > 0) {
        // TBODY with vehicle
        vehiclesData = vehicles.map((vehicle, index) => (
            <tr key={vehicle.id}>
                <th>{vehicle.id}</th>
                <td>{vehicle.model}</td>
                <td>{vehicle.plate_number}</td>
                <td>{vehicle.vehicle_type_name}</td>
                <td className={`${statusClasses[vehicle.vehicle_status] || ''}`}>{vehicle.vehicle_status}</td>
                <td className="flex gap-4">
                    <Link to={`./edit-vehicle/${vehicle.id}`}>
                        <svg
                            htmlFor="add-vehicle-modal"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 cursor-pointer text-primary"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </Link>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer text-error"
                        onClick={() => deleteVehicle(vehicle.id, vehicle.model, vehicle.plate_number, vehicle.vehicle_type_name)}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </td>
            </tr>
        ));
    } else {
        // TBODY empty
        vehiclesData = (
            <tr>
                <th>No data...</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="flex gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </td>
            </tr>
        );
    }

    return (
        <>
            <Link to={'./add-vehicle'}>
                <label htmlFor="add-vehicle-modal" className="btn mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Add Vehicle
                </label>
                    </Link>
                    {/* TABLE */}
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Model</th>
                                <th>Plate Number</th>
                                <th>Vehicle type</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* TBODY */}
                            {vehiclesData}
                        </tbody>
                    </table>

            <dialog id="deleteModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Delete Vehicle?</h3>
                    <p className="py-4">ID: {formDelete.id}</p>
                    <p className="py-4">Model: {formDelete.model}</p>
                    <p className="py-4">Plate Number: {formDelete.plate_number}</p>
                    <p className="py-4">Vehicle Type: {formDelete.vehicle_type_name}</p>
                    <button
                        className="btn btn-outline btn-error w-full"
                        onClick={removeVehicle}>
                        Delete
                    </button>
                    <div className="modal-action mt-2">
                        <form method="dialog" className="w-full">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn w-full" >Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <Toast successToast={successToast} message={toastMessage} setSuccessToast={setSuccessToast} />
        </>
    )
}

export default Vehicles;