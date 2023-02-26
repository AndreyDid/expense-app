import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/user";
import NavProfile from "./navProfile";

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    return (
        <div className="bg-light shadow-sm">
            <div className="container d-flex justify-content-between align-items-center">
                <div>
                    {isLoggedIn && (
                        <ul className="nav ">
                            <li className="nav-item">
                                <Link
                                    className="nav-link "
                                    aria-current="page"
                                    to={"/"}
                                >
                                    Главная
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link "
                                    aria-current="page"
                                    to={"/user/historyOperations"}
                                >
                                    История операций
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
                <div>{isLoggedIn && <NavProfile />}</div>
            </div>
        </div>
    );
};

export default NavBar;
