import { useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../axios/axiosInstance';

function Login() {
    const [invalidFields, setInvalidFields] = useState([]);
    const [loading, setLoading] = useState(false);
    const [invalidPass, setInvalidPass] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const submit = async (event) => {
        event.preventDefault()

        setLoading(true);

        const invalidFields = [];
        if (!form.email) invalidFields.push('email');
        if (!form.password) invalidFields.push('password');
        setInvalidFields(invalidFields);

        if (invalidFields.length > 0) {
            setLoading(false);
            return;
        }

        try {
            await axiosInstance.post('login', form
            )
            .then(response => {
                console.log(response.data);
                if (response.data.message === 'Password is incorrect') {
                    setInvalidEmail(false);
                    setInvalidPass(true);
                } else if (response.data.message === 'Email does not exist') {
                    setInvalidEmail(true);
                } else if (response.data.message === 'success') {
                    setInvalidEmail(false);
                    setInvalidPass(false);
                    setForm({
                        email: '',
                        password: ''
                    })
                    window.location.reload();
                }
            });
        } catch (error) {
            console.log(error)
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className='h-screen w-screen flex justify-center items-center text-center p-8'>
            <form>
                <div className='flex flex-col gap-2 w-90'>
                    <label className={`input input-bordered flex items-center gap-2 ${invalidFields.includes('email') ? 'input-error' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input
                            value={form.email}
                            onChange={handleChange}
                            name="email"
                            type="text"
                            className="grow"
                            placeholder="Email"
                        />
                    </label>
                    <p className='text-red-500'>{invalidEmail ? "Email doesn't exist" : ''}</p>
                    <label className={`input input-bordered flex items-center gap-2 ${invalidFields.includes('password') ? 'input-error' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            name="password"
                            placeholder="Password"
                            className="grow" />
                    </label>
                    <p className='text-red-500'>{invalidPass ? 'Wrong password' : ''}</p>
                    <button onClick={submit} disabled={loading} className="btn btn-primary">
                        {loading ? 'Login' : 'Login'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
