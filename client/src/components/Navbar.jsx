import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="dark:bg-gray-900 dark:border-gray-600 fixed w-full z-20 top-0 border-b shadow-xl">
            <div className="flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3">
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="h-8"
                        alt="Flowbite Logo"
                    />
                    <span className="self-center text-2xl font-semibold dark:text-white">
                        Flowbite
                    </span>
                </Link>

                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto"
                    id="navbar-sticky"
                >
                    <ul className="flex flex-col mt-4 font-light font-sans rounded-lg md:flex-row md:space-x-8 md:mt-0">
                        <li>
                            <Link
                                to="/"
                                className="block py-2 px-3 text-white hover:font-medium "
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/upload"
                                className="block py-2 px-3 text-white hover:font-medium "
                            >
                                Upload
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/documents"
                                className="block py-2 px-3 text-white hover:font-medium "
                            >
                                Documents
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/risk_reports"
                                className="block py-2 px-3 text-white hover:font-medium "
                            >
                                Risk Reports
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="flex space-x-3">
                    <Link to='/upload'>
                        <button
                        type="button"
                        className="cursor-pointer text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-xl text-sm px-4 py-2"
                    >
                        Get started
                    </button>
                    </Link>


                </div>
            </div>
        </nav>
    );
}

export default Navbar;
