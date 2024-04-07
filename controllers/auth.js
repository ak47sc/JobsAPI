const { BadRequestError, UnauthenticatedError } = require("../errors");
const UserModel = require("../models/User");
const { StatusCodes } = require("http-status-codes");

//register controller
//Creates user in db and sends token
const register = async (req, res) => {
  const user = await UserModel.create({ ...req.body });
  const token = user.createToken();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

//login controller
const login = async (req, res) => {
  const { email, password } = req.body;
  //checks if email and password empty
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  //checks if user in db or else throws error
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Email not found , Please login first");
  }
  //checks if password matchs or else throws error
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new UnauthenticatedError("Invalid Password");
  }

  //if no error token is send to user
  const token = user.createToken();
  res.status(200).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
