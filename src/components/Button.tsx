import React, {FC} from 'react';

interface Props {
    border?: string;
    radius?: number;
    color: string;
    text: string;
    width: string;
    height: string;
    onClick: () => void;
}

const Button: FC<Props> = ({
    border,
    radius,
    color,
    text,
    width,
    height,
    onClick
}) => {
    return (
        <button
            onClick={onClick}
            style={{
                backgroundColor: color,
                border,
                borderRadius: radius,
                height,
                width
            }}
        >
            {text}
        </button>
    );
};

export default Button;
