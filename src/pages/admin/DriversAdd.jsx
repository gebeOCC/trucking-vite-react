import { useState } from "react"
import { Link } from "react-router-dom"
import Toast from "../components/Toast"
import axiosInstance from "../../axios/axiosInstance"

function DriversAdd() {
    const [loading, setLoading] = useState(false)


    const [toastMessage, setToastMessage] = useState('');
    const [successToast, setSuccessToast] = useState(false);

    const [form, setForm] = useState({
        // users
        email: '',
        password: '',
        role: 'driver',
        profile_picture: '',

        // driver info
        license_number: '',
        license_expiry_date: '',

        // users profile
        first_name: '',
        last_name: '',
        phone_number: '',

        date_of_birth: '',
        gender: '',
        // address
        barangay: '',
        city: '',
        province: '',
        zip: '',
    })

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.name === "profile_picture" ? e.target.files[0] : e.target.value,
        }));
    };

    const [invalidFields, setInvalidFields] = useState([""]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // setLoading(true)

        // console.log(form)

        const invalidFields = [];
        if (!form.email) invalidFields.push('email');
        if (!form.password) invalidFields.push('password');
        if (!form.profile_picture) invalidFields.push('profile_picture');

        if (!form.license_number) invalidFields.push('license_number');
        if (!form.license_expiry_date) invalidFields.push('license_expiry_date');

        if (!form.first_name) invalidFields.push('first_name');
        if (!form.last_name) invalidFields.push('last_name');
        if (!form.phone_number) invalidFields.push('phone_number');
        if (!form.date_of_birth) invalidFields.push('date_of_birth');
        if (!form.gender) invalidFields.push('gender');
        if (!form.barangay) invalidFields.push('barangay');
        if (!form.city) invalidFields.push('city');
        if (!form.province) invalidFields.push('province');
        if (!form.zip) invalidFields.push('zip');

        setInvalidFields(invalidFields);

        console.log(form);
        if (invalidFields.length > 0) {
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('email', form.email);
        formData.append('password', form.password);
        formData.append('role', form.role);

        formData.append('license_number', form.license_number);
        formData.append('license_expiry_date', form.license_expiry_date);

        formData.append('profile_picture', form.profile_picture);
        formData.append('first_name', form.first_name);
        formData.append('last_name', form.last_name);
        formData.append('phone_number', form.phone_number);
        formData.append('date_of_birth', form.date_of_birth);
        formData.append('gender', form.gender);
        formData.append('barangay', form.barangay);
        formData.append('city', form.city);
        formData.append('province', form.province);
        formData.append('zip', form.zip);

        await axiosInstance.post('add-driver', formData)
            .then(response => {
                console.log(response.data.message)
                if (response.data.message) {
                    setToastMessage(response.data.message)
                    setSuccessToast(true)
                    setForm({ email: '', password: '', role: 'driver', profile_picture: '', license_number: '', license_expiry_date: '', first_name: '', last_name: '', phone_number: '', date_of_birth: '', gender: '', barangay: '', city: '', province: '', zip: '', })
                }
                setLoading(false);
            })
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

            <form action="" className="flex flex-col w-full gap-6">
                {/* Driver Profile */}
                <div className="flex flex-col gap-2">
                    <div className="flex gap-4">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">First Name</span>
                            </div>
                            <input
                                type="text"
                                value={form.first_name}
                                onChange={handleChange}
                                name="first_name"
                                placeholder=""
                                className={`input w-full ${invalidFields.includes('first_name') ? 'input-error' : 'input-bordered'}`} />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Last Name</span>
                            </div>
                            <input
                                type="text"
                                value={form.last_name}
                                onChange={handleChange}
                                name="last_name"
                                placeholder=""
                                className={`input w-full ${invalidFields.includes('last_name') ? 'input-error' : 'input-bordered'}`} />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Profile picture</span>
                            </div>
                            <input
                                id="image"
                                name="profile_picture"
                                onChange={handleChange}
                                type="file"
                                // value={form.profile_picture}
                                className={`file-input file-input-bordered w-full
                                ${invalidFields.includes('profile_picture') ? 'file-input-error' : ''}`} />
                        </label>

                    </div>
                    <div className="flex gap-4">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Date of Birth</span>
                            </div>
                            <input
                                type="date"
                                value={form.date_of_birth}
                                onChange={handleChange}
                                name="date_of_birth"
                                placeholder=""
                                className={`input w-full ${invalidFields.includes('date_of_birth') ? 'input-error' : 'input-bordered'}`}
                                min="0" />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Gender</span>
                            </div>
                            <select
                                name="gender"
                                onChange={handleChange}
                                value={form.gender}
                                className={`select w-full ${invalidFields.includes('gender') ? 'select-error' : 'select-bordered'}
                            `}

                            >
                                <option value="" disabled>Choose gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Phone Number</span>
                            </div>
                            <input
                                type="number"
                                value={form.phone_number}
                                onChange={handleChange}
                                name="phone_number"
                                placeholder=""
                                className={`input w-full ${invalidFields.includes('phone_number') ? 'input-error' : 'input-bordered'}`}
                                min="0" />
                        </label>
                    </div>

                    <div className="flex gap-4">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Province</span>
                            </div>
                            <input
                                type="text"
                                value={form.province}
                                onChange={handleChange}
                                name="province"
                                placeholder=""
                                className={`input w-full ${invalidFields.includes('province') ? 'input-error' : 'input-bordered'}`} />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">City</span>
                            </div>
                            <input
                                type="text"
                                value={form.city}
                                onChange={handleChange}
                                name="city"
                                placeholder=""
                                className={`input w-full ${invalidFields.includes('city') ? 'input-error' : 'input-bordered'}`} />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Barangay</span>
                            </div>
                            <input
                                type="text"
                                value={form.barangay}
                                onChange={handleChange}
                                name="barangay"
                                placeholder=""
                                className={`input w-full ${invalidFields.includes('barangay') ? 'input-error' : 'input-bordered'}`} />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Zip code</span>
                            </div>
                            <input
                                type="text"
                                value={form.zip}
                                onChange={handleChange}
                                name="zip"
                                placeholder=""
                                className={`input w-full ${invalidFields.includes('zip') ? 'input-error' : 'input-bordered'}`} />
                        </label>
                    </div>
                </div>

                <div className="flex gap-4">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">License Number</span>
                        </div>
                        <input
                            type="text"
                            value={form.license_number}
                            onChange={handleChange}
                            name="license_number"
                            placeholder=""
                            className={`input w-full ${invalidFields.includes('license_number') ? 'input-error' : 'input-bordered'}`} />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">License expiry date</span>
                        </div>
                        <input
                            type="date"
                            value={form.license_expiry_date}
                            onChange={handleChange}
                            name="license_expiry_date"
                            placeholder=""
                            className={`input w-full ${invalidFields.includes('license_expiry_date') ? 'input-error' : 'input-bordered'}`}
                            min="0" />
                    </label>
                </div>

                {/* Credentials */}

                <div className="flex flex-col gap-2"><label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Email</span>
                    </div>
                    <input
                        type="text"
                        value={form.email}
                        onChange={handleChange}
                        name="email"
                        placeholder=""
                        className={`input w-full ${invalidFields.includes('email') ? 'input-error' : 'input-bordered'}`} />
                </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            name="password"
                            placeholder=""
                            className={`input w-full ${invalidFields.includes('password') ? 'input-error' : 'input-bordered'}`} />
                    </label>
                </div>

                <button className="btn btn-primary" type="submit" disabled={loading} onClick={handleSubmit}>Submit</button>

            </form>
            {/* Toast */}
            <Toast successToast={successToast} message={toastMessage} setSuccessToast={setSuccessToast} />
        </>
    )
}

export default DriversAdd