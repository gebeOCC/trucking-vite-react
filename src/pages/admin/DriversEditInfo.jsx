import { useState } from "react";


function DriversEditInfo(props) {
    const [form, setForm] = useState({
        license_number: '',
        license_expiry_date: '',
    })

    useState(() => {
        setForm({
            license_number: props.formInfo.license_number,
            license_expiry_date: props.formInfo.license_expiry_date,
        })
    }, [])

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

        // const invalidFields = [];
        // if (!form.email) invalidFields.push('email');
        // if (!form.password) invalidFields.push('password');
        // if (!form.profile_picture) invalidFields.push('profile_picture');

        // await axiosInstance.post('add-driver', formData)
        //     .then(response => {
        //         console.log(response.data.message)
        //         if (response.data.message) {
        //             setToastMessage(response.data.message)
        //             setSuccessToast(true)
        //             setForm({ email: '', password: '', role: 'driver', profile_picture: '', license_number: '', license_expiry_date: '', first_name: '', last_name: '', phone_number: '', date_of_birth: '', gender: '', barangay: '', city: '', province: '', zip: '', })
        //         }
        //         setLoading(false);
        //     })
    }
    return (
        <>
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
        </>
    );
}

export default DriversEditInfo;