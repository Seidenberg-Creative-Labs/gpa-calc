import React from "react";
import {Grid} from "@mui/material";

const WebHeader = () => {
    return (
        <Grid container alignItems='center' width='100vw' justifyContent='space-between'>
            <Grid item>
                <img className="img-header" src="./Pace_SEIDENBERG.png" alt="Pace University Logo"></img>
            </Grid>
            <Grid item>
                <h1 id="gpaHeader">GPA CALCULATOR</h1>
            </Grid>
            <Grid item>
                <img className="img-header" src="./Pace-OfficeofAdmission.png" alt="Pace Univeristy Pace_University_Mascot"></img>
            </Grid>
        </Grid>
    );
}

export default WebHeader;
