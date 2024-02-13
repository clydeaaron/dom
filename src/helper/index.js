export function getName(firstName, middleName, lastName){
    return middleName ? `${lastName}, ${firstName} ${middleName}` : `${lastName}, ${firstName}`;
}

export function final_grade(prelim, midterm, prefi, finals) {
    return (parseFloat(prelim) + parseFloat(midterm) + parseFloat(prefi) + parseFloat(finals)) / 4;
}