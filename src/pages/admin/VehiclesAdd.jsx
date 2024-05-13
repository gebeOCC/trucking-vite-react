import { useState, useEffect } from "react";
import axiosInstance from "../../axios/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

function VehiclesAdd(props) {
    let id = props.id

    const [vehicletypes, setVehivcleTypes] = useState([])
    const [loading, setLoading] = useState(false)

    const [toastMessage, setToastMessage] = useState('');
    const [successToast, setSuccessToast] = useState(false);

    const navigate = useNavigate();

    const [form, setForm] = useState({
        model: "",
        plate_number: "",
        vehicle_type_id: "",
        vehicle_status: "active",
    });

    useEffect(() => {
        axiosInstance.get('get-vehicle-types')
            .then(response => {
                setVehivcleTypes(response.data)
                console.log(response.data)
            })

        if (id) {
            axiosInstance.get(`get-vehicle/${id}`)
                .then(response => {
                    setForm(response.data)
                    console.log(response.data)
                })
        }
    }, [])

    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const [invalidFields, setInvalidFields] = useState([""]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true)

        console.log(form)

        const invalidFields = [];
        if (!form.model) invalidFields.push('model');
        if (!form.plate_number) invalidFields.push('plate_number');
        if (!form.vehicle_type_id) invalidFields.push('vehicle_type_id');
        if (!form.vehicle_status) invalidFields.push('vehicle_status');

        setInvalidFields(invalidFields);

        if (invalidFields.length > 0) {
            setLoading(false);
            return;
        }

        let route = 'add-vehicle'

        if (id) {
            route = `update-vehicle/${id}`
        }

        await axiosInstance.post(route, form)
            .then(response => {
                console.log(response.data.message)
                if (response.data.message === 'success') {
                    navigate('/vehicles')
                }
                // if (response.data.message) {
                //     setToastMessage(response.data.message)
                //     setSuccessToast()
                //     setForm({
                //         model: "", plate_number: "", vehicle_type_id: "", vehicle_status: "active",
                //     })
                // }
                setLoading(false);
            })
    }

    const vehicletypesData = vehicletypes.map((vehicletype) => (
        <option key={vehicletype.id} value={vehicletype.id}>
            {vehicletype.vehicle_type_name}
        </option>
    ));

    // Add the initial "Choose Vehicle type" option
    vehicletypesData.unshift(
        <option key="default" disabled value="">
            Choose Vehicle type
        </option>
    );

    const fetchLoading = () => {
        if (id) {
            if (vehicletypes.length > 0 && form.model) {
                return true;
            }
        } else {
            if (vehicletypes.length > 0) {
                return true;
            }
        }
    }

    if (!fetchLoading()) {
        return <>
            <Link to={'/drivers'}>
                <label htmlFor="add-vehicle-modal" className="btn mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                    Back
                </label>
            </Link>
            <div>

                <span className="loading loading-ring loading-lg"></span>
            </div>
        </>

    }

    return (
        <>
            <Link to={'/vehicles'}>
                <label htmlFor="add-vehicle-modal" className="btn mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                    Back
                </label>
            </Link>

            <form action="" className="flex flex-col w-full gap-4">
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Model</span>
                    </div>
                    <input
                        type="text"
                        value={form.model}
                        onChange={handleChange}
                        name="model"
                        placeholder=""
                        className={`input w-full 
                    ${invalidFields.includes('model') ? 'input-error' : 'input-bordered'}`} />
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Plate number</span>
                    </div>
                    <input
                        type="text"
                        value={form.plate_number}
                        onChange={handleChange}
                        name="plate_number"
                        placeholder=""
                        className={`input w-full 
                    ${invalidFields.includes('plate_number') ? 'input-error' : 'input-bordered'}`} />
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Vehicle type</span>
                    </div>
                    <select

                        value={form.vehicle_type_id}
                        name="vehicle_type_id"
                        onChange={handleChange}
                        className={`select w-full
                    ${invalidFields.includes('vehicle_type_id') ? 'select-error' : 'select-bordered'}`}>
                        {vehicletypesData}
                    </select>
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Status</span>
                    </div>
                    <select
                        name="vehicle_status"
                        onChange={handleChange}
                        value={form.vehicle_status}
                        className={`select w-full ${invalidFields.includes('vehicle_status') ? 'select-error' : 'select-bordered'
                            }`}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="in repair">In repair</option>
                    </select>
                </label>

                <button className="btn btn-primary" type="submit" disabled={loading} onClick={handleSubmit}>Submit</button>
            </form>

            {/* Toast */}
            <Toast successToast={successToast} message={toastMessage} setSuccessToast={setSuccessToast} />
        </>
    )
}

export default VehiclesAdd