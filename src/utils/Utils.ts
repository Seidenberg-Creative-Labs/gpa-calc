
"5 Point Scale"

function convert_GPA(scale:string, data:string[][]){

    var letter_gpa:string[] = [];
    var number_gpa:number[] = [];

    switch (scale){

        case "5 Point Scale":
            for(let i = 0; i < data.length; i++){
                if (+data[i][2] <= 100 && +data[i][2] >= 90) {
                    number_gpa.push(4.0); 
                }
                else if(+data[i][2] <= 89.99 && +data[i][2] >= 80) {
                    number_gpa.push(3.0); 
                }
                else if(+data[i][2] <= 79.99 && +data[i][2] >= 70) {
                    number_gpa.push(2.0); 
                }
                else if(+data[i][2] <= 69.99 && +data[i][2] >= 60) {
                    number_gpa.push(1.0); 
                }
                else {
                    number_gpa.push(0.0); 
                }
            }
        break;

        case "4 Point Scale":
            for(let i = 0; i < data.length; i++){
                if (+data[i][2] <= 100 && +data[i][2] >= 85) {
                    number_gpa.push(4.0); 
                }
                else if(+data[i][2] <= 84.99 && +data[i][2] >= 75) {
                    number_gpa.push(3.0); 
                }
                else if(+data[i][2] <= 74.99 && +data[i][2] >= 60) {
                    number_gpa.push(2.0); 
                }
                else {
                    number_gpa.push(0.0); 
                }
            }
        break;

        case "Most Common Scale":
            for(let i = 0; i < data.length; i++){
                if (+data[i][2] <= 100 && +data[i][2] >= 60) {
                    number_gpa.push(4.0); 
                }
                else if(+data[i][2] <= 59.99 && +data[i][2] >= 50) {
                    number_gpa.push(3.0); 
                }
                else if(+data[i][2] <= 49.99 && +data[i][2] >= 30) {
                    number_gpa.push(2.0); 
                }
                else {
                    number_gpa.push(1.0); 
                }
            }
        break;

        case "Latter Grade Scale" || "10 Point Scale":
            for(let i = 0; i < data.length; i++){
                if(+data[i][2] <= 10 && +data[i][2] >= 9) {
                    number_gpa.push(4.0); 
                }
                else if(+data[i][2] <= 8.99 && +data[i][2] >= 8) {
                    number_gpa.push(3.3); 
                }
                else if(+data[i][2] <= 7.99 && +data[i][2] >= 7) {
                    number_gpa.push(3.0); 
                }
                else if(+data[i][2] <= 6.99 && +data[i][2] >= 6) {
                    number_gpa.push(2.7); 
                }
                else if(+data[i][2] <= 5.99 && +data[i][2] >= 4) {
                    number_gpa.push(2.0); 
                }
                else {
                    number_gpa.push(0.0); 
                }
            }
        break;

        case "10 Point Scale":
            for(let i = 0; i < data.length; i++){
                if(+data[i][2] <= 10 && +data[i][2] >= 9) {
                    number_gpa.push(4.0); 
                }
                else if(+data[i][2] <= 8.99 && +data[i][2] >= 8) {
                    number_gpa.push(3.3); 
                }
                else if(+data[i][2] <= 7.99 && +data[i][2] >= 7) {
                    number_gpa.push(3.0); 
                }
                else if(+data[i][2] <= 6.99 && +data[i][2] >= 6) {
                    number_gpa.push(2.7); 
                }
                else if(+data[i][2] <= 5.99 && +data[i][2] >= 4) {
                    number_gpa.push(2.0); 
                }
                else {
                    number_gpa.push(0.0); 
                }
            }
        break;
        

    }
    return number_gpa;
}



function calc_gpa(scale:string,data:string[][]){
    var gpa = convert_GPA(scale,data);
    
    var qpa_:number[] = [];
    var total_QPA:number = 0;
    var total_credits:number = 0;
    for (let i = 0; i < data.length; i++){
        total_credits += +data[i][1];
        total_QPA += +data[i][1] * gpa[i];
    }

    let avg_gpa = Math.round((total_QPA/total_credits) * 100) / 100
    
    console.log(avg_gpa);
    //return [gpa, avg_gpa];
}

export {calc_gpa};