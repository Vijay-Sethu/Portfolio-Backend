const commonMethod = {
    ERROR_CODE: {
        1000: "Users Not Found",
        1001: "Error in Saving",
        1002: "User Not Exists",
        1003: "Incorrect Password",
        1004: "Server Error",
        1005: "Email Id is Not Exists",
        1006: "Special Characters are not allowed",
        1007: "Please enter a valid Email address",

        // CRUD
        1008: "Table Not Found",
        1009: "Data Not Found",
    },
    INFO_CODE: {
        2000: "User Already Exists",
        2001: "Logged in Successfully",
        2002: "Password Should be Minimum 6 Character",
        2003: "Password Reset Successfully"
    }, 
    regexSpecialChar: /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/,
    regexEmail: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

}

module.exports = commonMethod;