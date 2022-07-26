// @ts-nocheck
import {toast} from "react-toastify";
// Convert International Grades to US GPA
const convertGPA = (scale:string, data:string[][]) => {

    var letter_gpa:string[] = [];
    var number_gpa:GLfloat[] = [];

    switch (scale){

        case "5 Point Scale":
            for(const element of data) {
                if (+element[2] <= 100 && +element[2] >= 90) {
                    number_gpa.push(4.0);
                } else if (+element[2] <= 89.99 && +element[2] >= 80) {
                    number_gpa.push(3.0);
                } else if (+element[2] <= 79.99 && +element[2] >= 70) {
                    number_gpa.push(2.0);
                } else if (+element[2] <= 69.99 && +element[2] >= 60) {
                    number_gpa.push(1.0); 
                }
                else {
                    number_gpa.push(0.0); 
                }
            }
        break;

        case "4 Point Scale":
            for(const element of data) {
                if (+element[2] <= 100 && +element[2] >= 85) {
                    number_gpa.push(4.0);
                } else if (+element[2] <= 84.99 && +element[2] >= 75) {
                    number_gpa.push(3.0);
                } else if (+element[2] <= 74.99 && +element[2] >= 60) {
                    number_gpa.push(2.0); 
                }
                else {
                    number_gpa.push(0.0); 
                }
            }
        break;

        case "Most Common Scale":
            for(const element of data) {
                if (+element[2] <= 100 && +element[2] >= 70) {
                    number_gpa.push(4.0);
                } else if (+element[2] <= 69.99 && +element[2] >= 60) {
                    number_gpa.push(3.7);
                } else if (+element[2] <= 59.99 && +element[2] >= 45) {
                    number_gpa.push(3.0); 
                } else if(+element[2] <= 44 && +element[2] >= 35) {
                    number_gpa.push(2.0);
                } else {
                    number_gpa.push(0.0); 
                }
            }
        break;

        case "Letter Grade Scale":
            for(const element of data) {
                if (+element[2] <= 10 && +element[2] >= 9) {
                    number_gpa.push(4.0);
                } else if (+element[2] <= 8.99 && +element[2] >= 8) {
                    number_gpa.push(3.3);
                } else if (+element[2] <= 7.99 && +element[2] >= 7) {
                    number_gpa.push(3.0);
                } else if (+element[2] <= 6.99 && +element[2] >= 6) {
                    number_gpa.push(2.7);
                } else if (+element[2] <= 5.99 && +element[2] >= 4) {
                    number_gpa.push(2.0); 
                }
                else {
                    number_gpa.push(0.0); 
                }
            }
        break;

        case "IIT Scale":
            for(const element of data) {
                if (+element[2] == 10) {
                    number_gpa.push(4.0);
                } else if (+element[2] == 9) {
                    number_gpa.push(3.7);
                } else if (+element[2] == 8) {
                    number_gpa.push(3.3);
                } else if (+element[2] == 7) {
                    number_gpa.push(3.0);
                } else if (+element[2] == 6) {
                    number_gpa.push(2.7); 
                } else if (+element[2] <= 5 && +element[2] > 2) {
                    number_gpa.push(2.0)
                } else {
                    number_gpa.push(0.0); 
                }

                // Ask bayu decimal grade scale. Ex. 6.5 or 4.0 etc.
            }
        break;

        case "Choice Based System":
            for(const element of data) {
                if (+element[2] == 10 || +element[2] == 9 || +element[2] == 8) {
                    number_gpa.push(4.0);
                } else if (+element[2] == 7) {
                    number_gpa.push(3.7);
                } else if (+element[2] == 6) {
                    number_gpa.push(3.0);
                } else if (+element[2] == 5 || +element[2] == 4) {
                    number_gpa.push(2.0);
                } else {
                    number_gpa.push(0.0); 
                }
                
                //Ask bayu decimal grade scale. Ex. 6.5 or 4.0 etc.
            }
        break;
        

    }
    return number_gpa;
}


// Calculating GPA
export const calcGpa = (scale:string,data:string[][]) => {
    var gpa = convertGPA(scale,data);
    
    var qpa_:number[] = [];
    var total_QPA:number = 0;
    var total_credits:number = 0;
    for (let i = 0; i < data.length; i++){
        total_credits += +data[i][1];
        total_QPA += +data[i][1] * gpa[i];
    }

    let avg_gpa = Math.round((total_QPA/total_credits) * 100) / 100
    
    return [gpa, avg_gpa];
};

// Exporting Grades
export const getGradeOutput = (scale:string, data:string[][]) => {
    const courseOutput = data.map(arr => {
        return arr.slice();
    });
    const gpaResult = calcGpa(scale, data);

    courseOutput.forEach((arr, idx) => {
        arr.push(getLetterGrade(gpaResult[0][idx]));
        arr.push(gpaResult[0][idx]);
    });

    console.log(courseOutput);
    return courseOutput;
}

// Converting to US Letter Grade
const getLetterGrade = (grade: number) => {
    if (grade >= 4.0) {
        return "A";
    } else if (grade >= 3.7) {
        return "A-";
    } else if (grade >= 3.3) {
        return "B+";
    } else if (grade >= 3.0) {
        return "B";
    } else if (grade >= 2.7) {
        return "B-";
    } else if (grade >= 2.3) {
        return "C+";
    } else if (grade >= 2.0) {
        return "C";
    } else if (grade >= 1.7) {
        return "C-";
    } else if (grade >= 1.3) {
        return "D+";
    } else if (grade >= 1.0) {
        return "D";
    } else if (grade >= 0.7) {
        return "D-";
    } else {
        return "F";
    }
};

// Delete row(s) & corresponding data from TableCourseInput
export const deleteRowData = (arr, data) => {
    let newData = [];

    arr.forEach(row => {
        data[row.index] = -1
    })

    data.forEach(element => {
        if(element !== -1)
            newData.push(element)
    });

    return newData;
};

// CSS Pop-up
export const displayToast = text => {
    toast.error(text, {
        position: toast.POSITION.BOTTOM_CENTER,
    });
};
