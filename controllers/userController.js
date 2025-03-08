import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/User.js";
import signJWT from "../utils/signJWT.js";

export async function signup(req, res) {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exist" });
    }

    const hashedPassword = await hashPassword(password);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = await User.create(userData);
    let token = signJWT(newUser._id);

    res.status(200).json({
      success: true,
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({ success: false, message: "Some error occurred" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(409)
      .json({ success: false, message: "Incorrect Email or Password" });
  }

  const isSame = await comparePassword(password, user.password);

  if (isSame) {
    let token = signJWT(user._id);

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } else {
    res
      .status(409)
      .json({ success: false, message: "Incorrect Email or Password" });
  }
}

export const verifyJWTToken = async (req, res, next) => {
  let authorization = req.headers.authorization ?? "";
  let token = authorization.split(" ")[1];

  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = payload.id;
    next();
  } catch (err) {
    res.status(409).json({ success: false, message: "Invalid Token" });
  }
};

async function hashPassword(password) {
  const saltRounds = 10;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return hashedPassword;
}

async function comparePassword(password, encryptedPassword) {
  const isSame = await new Promise((resolve, reject) => {
    bcrypt.compare(password, encryptedPassword, function (err, same) {
      if (err) reject(err);
      resolve(same);
    });
  });

  return isSame;
}
