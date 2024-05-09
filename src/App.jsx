import Login from './pages/guest/Login'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axiosInstance from './axios/axiosInstance';
import Layout from './pages/components/Layout';
import Dashboard from './pages/admin/Dashboard';
import Bookings from './pages/admin/Booking/Bookings';
import Vehicles from './pages/admin/Vehicles';
import Drivers from './pages/admin/Drivers';
import Clients from './pages/admin/Clients';
import VehicleTypes from './pages/admin/Vehicletypes';
import VehiclesAdd from './pages/admin/VehiclesAdd';
import VehiclesEdit from './pages/admin/VehiclesEdit';
import DriversAdd from './pages/admin/DriversAdd';
import DriversEdit from './pages/admin/DriversEdit';
import BookingAssign from './pages/admin/Booking/BookingAssign'; 


function App() {
    const [role, setRole] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            axiosInstance
                .get('user')
                .then((response) => {
                    if (response.data === 'admin') {
                        setRole(response.data);

                    } else {
                        setRole('guest');
                    }
                })
                .catch((error) => {
                    setRole('guest');
                })
                .finally(() => {
                    setIsLoading(false)
                }
                );
        };
        fetchUser();
    }, []);

    if (isLoading) {
        return (
            <div className='flex justify-center'>

                <span className="loading loading-dots loading-lg"></span>
            </div>
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                {role === 'admin' ?
                    // Admin route 
                    <Route path="/" element={< Layout />}>
                        <Route path="/dashboard" element={<Dashboard />} />

                        <Route path="/bookings" element={<Bookings />} />
                        <Route path="/bookings/assign/:id" element={<BookingAssign />} />

                        <Route path="/vehicles/" element={<Vehicles />} />
                        <Route path="/vehicles/add-vehicle" element={<VehiclesAdd />} />
                        <Route path="/vehicles/edit-vehicle/:id" element={<VehiclesEdit />} />

                        <Route path="/vehicle-types" element={<VehicleTypes />} />

                        <Route path="/drivers" element={<Drivers />} />
                        <Route path="/drivers/add-driver" element={<DriversAdd />} />
                        <Route path="/drivers/edit-driver/:id" element={<DriversEdit />} />

                        <Route path="/clients" element={<Clients />} />

                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="/*" element={<Navigate to="/dashboard" />} />
                    </Route>
                    :
                    // Guest route
                    <Route path="/">
                        <Route path="/login" element={<Login />} />
                        <Route path="/*" element={<Navigate to="/login" />} />
                    </Route>
                }
            </Routes>
        </BrowserRouter>
    );
}

export default App
