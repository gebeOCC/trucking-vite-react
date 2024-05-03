import axiosInstance from "../../axios/axiosInstance"
import { useState, useEffect } from "react";
import Toast from "../components/Toast";

function VehicleTypes() {
    // form data
    const [form, setForm] = useState({
        vehicle_type_name: "",
        vehicle_type_image: null,
        weight_limit: "",
        price: "",
    });

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.name === "vehicle_type_image" ? e.target.files[0] : e.target.value,
        }));
    };

    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [fetchLoading, setFetchLoading] = useState(true);

    const [idDeleteUpdate, setId] = useState('');

    const [invalidFields, setInvalidFields] = useState([""]);
    const [toastMessage, setToastMessage] = useState('');
    const [successToast, setSuccessToast] = useState(false);

    const [addVehicleTypeLoading, setAddVehicleTypeLoading] = useState(false);

    const [editing, setEditing] = useState(false)

    // Fetch Vehile types
    const fetchVehicleTypes = async () => {
        await axiosInstance.get('get-vehicle-types')
            .then(response => {
                // setTimeout(() => {
                setVehicleTypes(response.data)
                setFetchLoading(false);
                // }, 1000);
            })
    }

    // useeffect to fetch vehicle types
    useEffect(() => {
        fetchVehicleTypes();
        // console.log(vehicleTypes)
    }, [])

    const emptyForm = () => {
        setForm({
            vehicle_type_name: "", vehicle_type_image: null, weight_limit: "", price: "",
        })
        setEditing(false)
    }

    const getVehicletype = async (id) => {
        setEditing(true)
        await axiosInstance.get(`get-vehicle-type/${id}`)
            .then(response => {
                // console.log(response.data)
                setForm({
                    vehicle_type_name: response.data.vehicle_type_name,
                    vehicle_type_image: response.data.vehicle_type_image,
                    weight_limit: response.data.weight_limit,
                    price: response.data.price,
                })
                console.log(response.data)
            })
    }

    const editVehicleType = (id) => {
        setId(id);
        getVehicletype(id)
        const editModal = document.getElementById("add-vehicle-modal");
        editModal.checked = !editModal.checked;
    }

    const deleteVehicleType = (id) => {
        setId(id)
        getVehicletype(id)
        document.getElementById('deleteModal').showModal()
    }

    const removeVehicleType = async () => {
        await axiosInstance.post(`delete-vehicle-type/${idDeleteUpdate}`)
            .then(response => {
                console.log(response.data.message);
                setToastMessage(response.data.message);
                setSuccessToast(true);
                emptyForm();
                fetchVehicleTypes();
                const deleteModal = document.getElementById('deleteModal');
                if (deleteModal) {
                    deleteModal.close();
                }
            })
    }
    // vehicle types storage
    var vehicleTypesData = "";

    if (fetchLoading) {
        // TBODY skeleton
        vehicleTypesData = Array.from({ length: 1 }).map((_, index) => (
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
    } else if (vehicleTypes.length > 0) {
        // TBODY with vehicle types
        vehicleTypesData = vehicleTypes.map((vehicleType, index) => (
            <tr key={vehicleType.id}>
                <th>{vehicleType.id}</th>
                <td>{vehicleType.vehicle_type_name}</td>
                <td>
                    <div className="w-16">
                        <img src={`http://localhost:8000/vehicle-type-images/${vehicleType.vehicle_type_image}`} alt="" />
                    </div>
                </td>
                <td>{vehicleType.weight_limit}kg</td>
                <td>{vehicleType.price}</td>
                <td className="flex gap-4">
                    <svg
                        htmlFor="add-vehicle-modal"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer text-primary"
                        onClick={() => editVehicleType(vehicleType.id)}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer text-error"
                        onClick={() => deleteVehicleType(vehicleType.id)}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </td>
            </tr>
        ));
    } else {
        // TBODY empty
        vehicleTypesData = (
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


    // SUBMIT DATA
    const handleSubmit = async (event) => {
        event.preventDefault();

        setAddVehicleTypeLoading(true);

        const formData = new FormData();
        formData.append('vehicle_type_name', form.vehicle_type_name);
        formData.append('vehicle_type_image', form.vehicle_type_image);
        formData.append('weight_limit', form.weight_limit);
        formData.append('price', form.price);

        const invalidFields = [];
        if (!form.vehicle_type_name) invalidFields.push('vehicle_type_name');
        if (!editing) {
            if (!form.vehicle_type_image) invalidFields.push('vehicle_type_image');
        }
        if (!form.weight_limit) invalidFields.push('weight_limit');
        if (!form.price) invalidFields.push('price');

        setInvalidFields(invalidFields);

        if (invalidFields.length > 0) {
            setAddVehicleTypeLoading(false);
            return;
        }

        var route = 'add-vehicle-type';

        if (editing) {
            route = `update-vehicle-type/${idDeleteUpdate}`
        }

        await axiosInstance.post(route, formData)
            .then(response => {
                console.log(response.data.message);
                if (response.data.message === "Vehicle type addedd successfully" || response.data.message === "Vehicle type updated successfully") {
                    setToastMessage(response.data.message);
                    setSuccessToast(true);
                    emptyForm();
                    fetchVehicleTypes();
                    const modalCheckbox = document.getElementById("add-vehicle-modal");
                    if (modalCheckbox) {
                        modalCheckbox.checked = false;
                    }
                }
            })
            .catch(error => {
                console.log(error)
                setAddVehicleTypeLoading(false)
            });

        setAddVehicleTypeLoading(false);
    };

    return (
        <div className="overflow-x-auto">
            {/* BUTTON TO OPEN MODAL */}
            <label htmlFor="add-vehicle-modal" className="btn mb-5">
                Add vehicle type<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </label>

            {/* TABLE */}
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Weight limit</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* TBODY */}
                    {vehicleTypesData}
                </tbody>
            </table>

            {/* MODAL FORM*/}
            <input type="checkbox" id="add-vehicle-modal" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl mb-6">{editing ? 'Editing vehicle' : 'Add vehicle type'}</h3>
                    <form action="" className="flex flex-col w-full gap-4">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Name</span>
                            </div>
                            <input
                                type="text"
                                value={form.vehicle_type_name}
                                onChange={handleChange}
                                name="vehicle_type_name"
                                placeholder=""
                                className={`input w-full
                                ${invalidFields.includes('vehicle_type_name') ? 'input-error' : 'input-bordered'}`} />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Image</span>
                            </div>
                            <input
                                id="image"
                                name="vehicle_type_image"
                                onChange={handleChange}
                                type="file"
                                // value={form.vehicle_type_image}
                                className={`file-input file-input-bordered w-full
                                ${invalidFields.includes('vehicle_type_image') ? 'file-input-error' : ''}`} />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Weight limit (kg)</span>
                            </div>
                            <input
                                type="number"
                                value={form.weight_limit}
                                name="weight_limit"
                                onChange={handleChange}
                                placeholder=""
                                className={`input w-full
                                ${invalidFields.includes('weight_limit') ? 'input-error' : 'input-bordered'}`}
                                min="0" />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Price</span>
                            </div>
                            <input
                                type="number"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                placeholder=""
                                className={`input w-full
                                ${invalidFields.includes('price') ? 'input-error' : 'input-bordered'}`}
                                min="0" />
                        </label>
                        <button className="btn btn-primary" type="submit" disabled={addVehicleTypeLoading} onClick={handleSubmit}>Submit</button>
                    </form>

                    <div className="modal-action mt-4">
                        <label htmlFor="add-vehicle-modal" className="btn w-full" onClick={() => emptyForm()}>Cancel</label>
                    </div>
                </div>
            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="deleteModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Delete Vehicle Type?</h3>
                    <p className="py-4">Id: {idDeleteUpdate}</p>
                    <p className="py-4">Name: {form.vehicle_type_name}</p>
                    <p className="py-4">Weight limit: {form.weight_limit}</p>
                    <p className="py-4">Price: {form.price}</p>
                    <button
                        className="btn btn-outline btn-error w-full"
                        onClick={removeVehicleType}>
                        Delete
                    </button>
                    <div className="modal-action mt-2">
                        <form method="dialog" className="w-full">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn w-full" onClick={() => emptyForm()}>Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>

            {/* Toast */}
            <Toast successToast={successToast} message={toastMessage} setSuccessToast={setSuccessToast} />
        </div>
    )
}

export default VehicleTypes