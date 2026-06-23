const validator = require("validator");

const validatorUserRegsiter = ({ userName, email, password }) => {
  if (!userName || !email || !password) {
    return "All input validate need to fill";
  }

  if (!validator.isEmail(email)) {
    return "Invalid eamil fooramt";
  }

  return null;
};

module.exports = validatorUserRegsiter;
