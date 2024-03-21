const EMAIL_ALREADY_EXISTS = (email) => {
    return `User with email - ${email} - already exists.`
}

const DATE_FORMAT = "DD-MM-YYYY"


module.exports = { EMAIL_ALREADY_EXISTS , DATE_FORMAT}