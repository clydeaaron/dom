export function getName(firstName, middleName, lastName){
    return middleName ? `${firstName} ${middleName} ${lastName}` : `${firstName} ${lastName}`;
}

export function final_grade(prelim, midterm, prefi, finals) {
    return (parseFloat(prelim) + parseFloat(midterm) + parseFloat(prefi) + parseFloat(finals)) / 4;
}