import React, { useCallback, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import "./style.css";
import useClickOutside from "../../hooks/useClickOutside";
import PropTypes from "prop-types";

export const PickerColor = ({ color, onChange }) => {
    const popover = useRef();
    const [isOpen, toggle] = useState(false);
    const close = useCallback(() => toggle(false), []);
    useClickOutside(popover, close);
    return (
        <div className="picker">
            <div
                className="swatch"
                style={{ backgroundColor: color }}
                onClick={() => toggle(true)}
            />

            {isOpen && (
                <div className="popover" ref={popover}>
                    <HexColorPicker color={color} onChange={onChange} />
                </div>
            )}
        </div>
    );
};
PickerColor.propTypes = {
    color: PropTypes.string,
    onChange: PropTypes.func
};
