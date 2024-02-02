export function getName(firstName, middleName, lastName){
    return middleName ? `${firstName} ${middleName} ${lastName}` : `${firstName} ${lastName}`;
}

export function gradeSum(prelim, midterm, prefi, finals) {
    return (parseInt(prelim) + parseInt(midterm) + parseInt(prefi) + parseInt(finals)) / 4;
}

export function GWA(prelim, midterm, prefi, finals, unit) {
    const sum = gradeSum(prelim, midterm, prefi, finals);

    return (sum * unit) / unit;
}