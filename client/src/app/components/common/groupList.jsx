import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ items, selectedItem, onItemSelect, label }) => {
    return (
        <div className="dropdown m-1">
            <button
                className="btn btn-light dropdown-toggle shadow-sm"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {label}
            </button>
            <ul className="dropdown-menu">
                {items.map((item) => (
                    <li
                        key={item._id}
                        className={
                            " dropdown-item" +
                            (item === selectedItem ? " active" : "")
                        }
                        onClick={() => onItemSelect(item._id)}
                        role=""
                    >
                        {item.type === "account" ? (
                            <p className="m-0">{item.account}</p>
                        ) : (
                            <p className="m-0">{item.account}</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};
GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    label: PropTypes.string,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object
};

export default GroupList;
