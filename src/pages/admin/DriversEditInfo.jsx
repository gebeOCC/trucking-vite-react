import { useState, useEffect } from "react";
import axiosInstance from "../../axios/axiosInstance";

function DriversEditInfo(props) {
    const [formChange, setFormChange] = useState(false)
    const [submiting, setSubmiting] = useState(false)

    const [editing, setEditing] = useState(false)
    const [form, setForm] = useState({
        license_number: '',
        license_expiry_date: '',
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
            license_number: props.formInfo.license_number,
            license_expiry_date: props.formInfo.license_expiry_date,
        })
    }

    useEffect(() => {
        setFormDefault();
        setInvalidFields([])
    }, [editing])

    const [invalidFields, setInvalidFields] = useState([""]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formChange) {
            console.log('didnt change something')
            setEditing(false)
            return;
        }

        const invalidFields = [];
        if (!form.license_number) invalidFields.push('license_number');
        if (!form.license_expiry_date) invalidFields.push('license_expiry_date');

        setInvalidFields(invalidFields);

        console.log(form);
        if (invalidFields.length > 0) {
            return;
        }

        setSubmiting(true)

        await axiosInstance.post(`update-driver-info/${props.formInfo.id}`, form)
            .then(response => {
                if (response.data.message === 'Driver updated successfully') {

                    console.log(response.data.message)
                    props.setFormInfo({
                        ...props.formInfo,
                        license_number: form.license_number,
                        license_expiry_date: form.license_expiry_date,
                    })
                }
            })
            .finally(() => {
                setEditing(false)
                setSubmiting(false)
                setFormChange(false)
            }
            )
    }
    return (
        <>
            <div className="flex flex-col gap-2 bg- rounded-xl p-4">
                <form action="">
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

export default DriversEditInfo;