import { useEffect, useState } from "react";
import axiosInstance from "../../axios/axiosInstance";
import Toast from "../components/Toast";
function DriversEditProfile(props) {
    const [editing, setEditing] = useState(false)

    const [loading, setLoading] = useState(false)

    const [toastMessage, setToastMessage] = useState('');
    const [successToast, setSuccessToast] = useState(false);

    const [form, setForm] = useState({
        // users profile
        first_name: '',
        last_name: '',
        phone_number: '',

        profile_picture: '',

        date_of_birth: '',
        gender: '',

        // address
        barangay: '',
        city: '',
        province: '',
        zip: '',
    })


    const setFormDefault = () => {
        setForm({
            ...form,
            first_name: props.formProfile.first_name,
            last_name: props.formProfile.last_name,
            phone_number: props.formProfile.phone_number,

            date_of_birth: props.formProfile.date_of_birth,
            gender: props.formProfile.gender,

            // address
            barangay: props.formProfile.barangay,
            city: props.formProfile.city,
            province: props.formProfile.province,
            zip: props.formProfile.zip,
        })
    }

    useEffect(() => {
        setFormDefault();
    }, [])

    const [invalidFields, setInvalidFields] = useState([""]);

    const handleChange = (e) => {
        if (editing) {
            setForm((prev) => ({
                ...prev,
                [e.target.name]: e.target.name === "profile_picture" ? e.target.files[0] : e.target.value,
            }));
        }
    };

    const edit = () => {
        setEditing(!editing)
        setFormDefault()
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const invalidFields = [];
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

        console.log(formData)

        await axiosInstance.post(`update-driver-profile/${props.formProfile.id}`, formData)
            .then(response => {
                if (response.data.message) {
                    console.log(response.data.message)
                    setSuccessToast(true)
                }
                setLoading(false);
            })
    }

    return (
        <>
            <div className="flex flex-col gap-2 bg- rounded-xl p-4">
                <form action="">
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
                    {editing &&
                        <div className="flex gap-2 mt-2">
                            <button type="submit" className="btn btn-primary w-full" onClick={handleSubmit}>Submit</button>
                        </div>
                    }
                </form>
                {!editing ?
                    <button className="btn btn-ghost mt-2" onClick={edit}>Edit</button>
                    :
                    <button className="btn btn-secondary" onClick={edit}>Cancel</button>
                }
            </div>

            {/* Toast */}
            <Toast successToast={successToast} message={toastMessage} setSuccessToast={setSuccessToast} />
        </>
    );
}

export default DriversEditProfile;