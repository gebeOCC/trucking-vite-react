import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axiosInstance from "../../axios/axiosInstance";

function NavBar() {
    const handleDrawerToggle = () => {
        const drawerCheckbox = document.getElementById("my-drawer-2");
        drawerCheckbox.checked = !drawerCheckbox.checked;
    };

    const [isdark, setIsdark] = useState(JSON.parse(localStorage.getItem('isdark')));

    useEffect(() => {
        localStorage.setItem('isdark', JSON.stringify(isdark));
    }, [isdark]);

    const themeClass = isdark ? 'data-theme="dark"' : 'data-theme="light"';

    const logout = () => {
        axiosInstance
            .post('logout')
            .then((response) => {
                console.log(response.data.message);
                if (response.data.message === 'success') {
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <div className="navbar bg-base-200 sticky top-0">
                <div className="flex-none">
                    {/* open drawer */}
                    <button className="btn btn-square btn-ghost lg:hidden" onClick={handleDrawerToggle}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block w-5 h-5 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div className="flex-1">
                    <div className="max-w-xxl text-sm breadcrumbs">
                        <ul>
                            {/* <li><a className="btn btn-ghost text-xl p-0">Dashboard</a></li> */}
                            {/* <li><a className="btn btn-ghost text-xl p-0">Dashboard</a></li>
                                    <li><a className="btn btn-ghost text-xl p-0">Dashboard</a></li> */}
                        </ul>
                    </div>
                </div>
                <div className="flex-none gap-2">
                    <div className="join">
                        <div>
                            <div>
                                <input className="input input-bordered join-item bg-base-200" placeholder="Search" />
                            </div>
                        </div>
                        <select className="select select-bordered join-item bg-base-200">
                            <option value={''} hidden>Filter</option>
                            <option>Sci-fi</option>
                            <option>Drama</option>
                            <option>Action</option>
                        </select>
                        <div className="indicator">
                            <button className="btn join-item select-bordered bg-base-100 ">Search</button>
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="https://static-koimoi.akamaized.net/wp-content/new-galleries/2021/05/robert-pattinson-wants-the-batman-to-have-his-multiple-love-interests-001.jpg" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a onClick={logout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
    
}

export default NavBar;