import { useParams } from "react-router-dom";
import DriversEditProfile from "./DriversEditProfile";
import DriversEditInfo from "./DriversEditInfo";
import DriversEditCredentials from "./DriversEditCredentials";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../axios/axiosInstance";
function DriversEdit() {
    const [loading, setLoading] = useState(true)
    let { id } = useParams();
    const [formProfile, setFormProfile] = useState([])
    const [formCredentials, setFormCredentials] = useState([])
    const [formInfo, setFormInfo] = useState([])

    const fetchDriverProfile = async () => {
        await axiosInstance.get(`get-driver-profile/${id}`)
            .then(response => {
                setFormProfile(response.data)
                // console.log(response.data)
            })
    }

    const fetchAddress = async () => {
        await axiosInstance.get(`get-driver-info/${id}`)
            .then(response => {
                setFormInfo(response.data)
            })
        setLoading(false)
    }

    const fetchDriverCredentials = async () => {
        await axiosInstance.get(`get-driver-credentials/${id}`)
            .then(response => {
                // console.log(response.data)
                setFormCredentials(response.data)
            })
    }

    useEffect(() => {
        setLoading(true)
        fetchDriverProfile();
        fetchDriverCredentials();
        fetchAddress();
    }, [])

    if (loading) {
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
            <Link to={'/drivers'}>
                <label htmlFor="add-vehicle-modal" className="btn mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                    Back
                </label>
            </Link>

            <div className="flex flex-col w-full gap-6">
                <DriversEditProfile formProfile={formProfile} />
                <DriversEditInfo formInfo={formInfo} />
                <DriversEditCredentials formCredentials={formCredentials} />
            </div>
        </>
    )
}

export default DriversEdit;