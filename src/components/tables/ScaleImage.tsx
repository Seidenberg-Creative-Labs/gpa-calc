import { getScale } from "../dropdown/GpaDrop"


const ScaleImage = () => {

        if(getScale == "5 Point Scale"){
            return <img src="./5scale.png" width={"500px"} />;
        } else if(getScale == "4 Point Scale"){
            return <img src="./4scale.png" width={"500px"} />;
        } else if(getScale === "Most Common Scale"){
            return <img src="./mostCommon.png" width={"500px"} />;
        } else if(getScale === "Letter Grade Scale"){
            return <img src="./letterGrade.png" width={"500px"} />
        } else if(getScale === "10 Point Scale") {
            return <img src="./10scale.png" width={"500px"} />
        } 
        
        else {
            return null;
        }

}

export default ScaleImage;