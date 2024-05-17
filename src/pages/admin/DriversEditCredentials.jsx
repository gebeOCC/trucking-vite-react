import { useState, useEffect } from "react";
import axiosInstance from "../../axios/axiosInstance";

function DriversEditCredentials(props) {
    const [formChange, setFormChange] = useState(false)
    const [submiting, setSubmiting] = useState(false)
    const [emailExist, setEmailExist] = useState(false);

    const [editing, setEditing] = useState(false)
    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        if (editing) {
            setForm((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        }
        setFormChange(true)
    };

    const setFormDefault = () => {
        setForm({
            email: props.formCredentials.email,
            password: '',
        })
    }

    useEffect(() => {
        setFormDefault();
        setInvalidFields([])
        setEmailExist(false)
    }, [editing])

    const [invalidFields, setInvalidFields] = useState([""]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formChange) {
            console.log('didnt change something')
            return;
        }

        const invalidFields = [];
        if (!form.email) invalidFields.push('email');
        if (!form.password) invalidFields.push('password');

        setInvalidFields(invalidFields);

        console.log(form);
        if (invalidFields.length > 0) {
            return;
        }

        console.log(props.formCredentials)

        setSubmiting(true)

        await axiosInstance.post(`update-driver-credentials/${props.formCredentials.id}`, form)
            .then(response => {
                if (response.data.message === 'Driver updated successfully') {
                    console.log(response.data.message)
                    props.setFormCredentials({
                        ...props.formCredentials,
                        email: form.email,
                        password: '',
                    })
                    setEditing(false)
                } else if (response.data.message === 'Email exist'){
                    console.log(response.data.message)
                    setEmailExist(true)
                }
            })
            .finally(() => {
                setSubmiting(false)
                setFormChange(false)
            }
            )
    }

    return (
        <>
            <div className="flex flex-col gap-2 bg- rounded-xl p-4">
                <form action="">
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
                        {emailExist &&
                            <p style={{ color: 'red' }}>Email already exist</p>
                        }
                    </div>
                    {editing &&
                        <div className="flex gap-2 mt-2">
                            <button type="submit" disabled={submiting} className="btn btn-primary w-full" onClick={handleSubmit}>Submit</button>
                        </div>
                    }
                </form>
                {!editing ?
                    <button className="btn btn-ghost mt-2" onClick={() => { setEditing(!editing) }}>Edit</button>
                    :
                    <button className="btn btn-secondary" onClick={() => { setEditing(!editing), setFormDefault() }}>Cancel</button>
                }
            </div>
        </>
    );
}

export default DriversEditCredentials;