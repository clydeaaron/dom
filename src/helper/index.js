export function getName(firstName, middleName, lastName){
    return middleName ? `${firstName} ${middleName} ${lastName}` : `${firstName} ${lastName}`;
}