const { body } = require("express-validator")
const moment = require("moment");
const { DATE_FORMAT } = require("./constants");

const userCreationValidator = [
    body('firstName', 'First name cannot be empty').not().isEmpty(),
    body('lastName', 'Last name cannot be empty').not().isEmpty(),
    body('email', 'Email cannot be empty').not().isEmpty(),
    body('email', 'Email not valid').isEmail(),
    body('password', 'Password should be at least 8 characters').isLength({ min: 8 }),
    body('password', 'Password should contain at least an uppercase character').matches(/\^*[A-Z]/),
    body('password', 'Password should contain at least a lowercase character').matches(/\^*[a-z]/),
    body('password', 'Password should contain at least a number').matches(/\^*[0-9]/),
    body('phoneNumber', 'Phone number cannot be empty').not().isEmpty(),
    body('phoneNumber', 'Phone number not valid').matches(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4,6})$/),

]

const validateDateRange = (startDate, endDate) => {
    let errors = {};

    //Check if dates are valid
    if (!isValidDate(startDate)) {
        errors["startDate"] = `Start date [${startDate}] is not a valid date`;
    }
    if (!isValidDate(endDate)) {
        errors["endDate"] = `End date [${endDate}] is not a valid date`;
    }

    if (Object.keys(errors).length > 0) {
        return errors
    }

    ///// Check if the range is valid

    // Start date should not be later than end date
    if (moment(startDate, DATE_FORMAT).isAfter(moment(endDate, DATE_FORMAT))) {
        errors["startDate"] = `Start date [${startDate}] should not be later than the End date [${endDate}]`;
    }

    // Stert date should not be later than today
    if (moment(startDate, DATE_FORMAT).isAfter(moment(new Date(), DATE_FORMAT))) {
        errors["startDate"] = `Start date [${endDate}] should not be in the future.`;
    }
    // End date should not be later than today
    if (moment(endDate, DATE_FORMAT).isAfter(moment(new Date(), DATE_FORMAT))) {
        errors["endDate"] = `End date [${endDate}] should not be in the future.`;
    }

    console.log("Here too ============= ")

    return errors

}

const isValidDate = (date) => {
    const d = moment(date);
    return d.isValid()
}

module.exports = { userCreationValidator, validateDateRange, isValidDate }