export const commonFunctions = {
    convertDateToString
}

function convertDateToString(dateObj) {
    if (dateObj) {
        let month = (dateObj.getMonth() + 1).toString();
        month = month.length === 1 ? '0' + month : month;
        let date = dateObj.getDate().toString();
        date = date.length === 1 ? '0' + date : date;
        let year = dateObj.getFullYear().toString();
        return `${year}-${month}-${date}`;
    }
    return "";
}