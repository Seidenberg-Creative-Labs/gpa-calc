import React, {FC, InputHTMLAttributes, SyntheticEvent, useState} from 'react';
import "./inputStyle.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    active: boolean;
    value: string;
    error: string;
    label: string;
}

class TextInput extends React.Component {
    constructor(props: InputProps) {
        super(props);

        this.state = {
            active: (props.locked && props.active) || false,
            value: props.value || "",
            error: props.error || "",
            label: props.label || "Label"
        };
    }

    changeValue(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        this.setState({ value, error: "" });
    }

    handleKeyPress(event: KeyboardEvent) {
        if (event.which === 13) {
            this.setState({ value: this.props.predicted });
        }
    }

    render() {
        const { active, value, error, label } = this.state;
        const { predicted, locked } = this.props;
        const fieldClassName = `field ${(locked ? active : active || value) &&
        "active"} ${locked && !active && "locked"}`;

        return (
            <div className={fieldClassName}>
                {active &&
                    value &&
                    predicted &&
                    predicted.includes(value) && <p className="predicted">{predicted}</p>}
                <input
                    id={1}
                    type="text"
                    value={value}
                    placeholder={label}
                    onChange={this.changeValue.bind(this)}
                    onKeyPress={this.handleKeyPress.bind(this)}
                    onFocus={() => !locked && this.setState({ active: true })}
                    onBlur={() => !locked && this.setState({ active: false })}
                />
                <label htmlFor={1} className={error && "error"}>
                    {error || label}
                </label>
            </div>
        );
    }
}

export default TextInput;
