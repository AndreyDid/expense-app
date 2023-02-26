import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Account from "../account";
import Category from "../category";

const CardOperation = ({
    label,
    sumOperation,
    operationArray,
    userId,
    labelButton,
    color,
    link,
    handleClick
}) => {
    return (
        <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between border-bottom ">
                <div>
                    <p className={`m-0 fw-bold ${color}`}>{label}:</p>
                </div>
                <div>
                    <p className={`m-0 fw-bold ${color}`}>{sumOperation} р.</p>
                </div>
            </div>
            <div
                className="card-body p-1  overflow-auto "
                style={{ height: 200 }}
            >
                {operationArray.map((i) => (
                    <div key={i._id} className="card-title border-bottom">
                        <div className="d-flex justify-content-between mt-1 align-items-end">
                            <div className="m-0 d-md-block">
                                {i.type === "account" ? (
                                    <Account id={i._id} />
                                ) : (
                                    <Account id={i.account} />
                                )}
                                {i.type === "account" && (
                                    <p className="small m-0 text-secondary">
                                        {i.comment}
                                    </p>
                                )}
                                {i.type === "income" && (
                                    <Category id={i.category} type={i.type} />
                                )}
                                {i.type === "expense" && (
                                    <Category id={i.category} type={i.type} />
                                )}
                            </div>

                            <div>
                                {i.type === "account" && (
                                    <div className="d-flex justify-content-end">
                                        <i
                                            role="button"
                                            className="bi bi-pencil-square mx-1"
                                            onClick={() => handleClick(i._id)}
                                        ></i>
                                    </div>
                                )}
                                <p className="m-0">{i.sum} р.</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {labelButton && (
                <div className="d-flex mt-1 card-footer">
                    <Link
                        className="btn btn w-100 mx-auto btn-sm btn-outline-dark"
                        to={`/user/${userId}/${link}`}
                    >
                        {labelButton}
                    </Link>
                </div>
            )}
        </div>
    );
};
CardOperation.propTypes = {
    label: PropTypes.string,
    sumOperation: PropTypes.number,
    operationArray: PropTypes.array,
    userId: PropTypes.string,
    handleClick: PropTypes.func,
    labelButton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    color: PropTypes.oneOf(["text-success", "text-danger", "text-body"]),
    link: PropTypes.oneOf(["createIncome", "createExpenses", "createAccount"])
};

export default CardOperation;
