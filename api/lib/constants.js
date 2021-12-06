//Constant variables are declared here.
const statusCode = {
    "ok": 200,
    "error": 401,
    "warning": 404
}

const messages = {
    "ok": "OK",
    "dataRetrievedSuccess": "Data retrieved successfully",
    "errorRetreivingData": "Error in retrieving data",
}

var obj = {
    statusCode: statusCode,
    messages: messages,
};
module.exports = obj;