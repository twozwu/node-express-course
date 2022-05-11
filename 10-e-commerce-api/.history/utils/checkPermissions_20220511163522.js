const CustomError = require('../errors')

const checkPermission = ( requestUser, resourceUserId ) => {
    console.log(requestUser);
    console.log(resourceUserId);
    console.log(typeof resourceUserId);
}

module.exports = checkPermission