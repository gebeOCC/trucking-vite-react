import { useState } from "react";

function DriversEditCredentials(props) {

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    useState(() => {
        setForm({
            email: props.formCredentials.email,
            password: '',
        })
    }, [])

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.name === "profile_picture" ? e.target.files[0] : e.target.value,
        }));
        console.log(form)
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
        </>
    );
}

export default DriversEditCredentials;