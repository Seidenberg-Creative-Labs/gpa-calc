import React from 'react';
import Popup from "reactjs-popup";
import {IoInformationCircleOutline} from "react-icons/io5";
import 'reactjs-popup/dist/index.css';

// Tool tip info
const InfoTooltip = (props: any) => {
    const textChina = "Select the Five-Point Scale at all times unless your transcript has different grade ranges published on your documents."

    const textIndia = "If your documents use marks as a reference to your performance, then select the \"Most Common\" grading scale. Enter Maximum Marks as credits and the percentage of maximum marks awarded as the grade.\n" +
        "\n" +
        "If your documents use a 10-point grading scale based on the UGC Choice Based Credit System Reforms, then select the “UGC 10-point Grading Scale” and enter the point value (1-10) of each grade received."

    return (
        <div
            style={{padding: '20px 2%', display: 'flex', flexWrap: 'wrap'}}
            className="tooltipBoundary"
        >
            <Popup
                trigger={
                    <div>
                        <IoInformationCircleOutline size={20} color='black' />
                    </div>
                }
                position='right center'
                on={['hover', 'focus']}
                closeOnDocumentClick
            >
                <span style={{color: '#000000'}}>{props.country === "China" ? textChina : textIndia}</span>
            </Popup>
        </div>
    );
};

export default InfoTooltip;
