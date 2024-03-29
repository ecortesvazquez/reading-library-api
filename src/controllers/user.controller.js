"use strict";

const { User } = require("../models/user");
const { UserType } = require("../models/userType");
const { NotFound } = require("../common/errors");
const constants = require("../common/constants");

async function index(req, res, next) {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      include: UserType,
    });
    res.json({
      status: "success",
      data: users,
    });
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    if (user === null) {
      throw new NotFound("Record not found");
    }
    res.json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const user = await User.create(req.body);
    delete user.dataValues.password;
    res.json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const [numberAffectedRows, affectedRows] = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
      individualHooks: true,
    });
    delete affectedRows[0].dataValues.password;
    res.json({
      status: "success",
      data: affectedRows[0],
    });
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const [numberAffectedRows, affectedRows] = await User.update(
      { status: constants.STATUS_CODE_INACTIVE },
      {
        where: {
          id: req.params.id,
        },
        individualHooks: true,
      }
    );
    delete affectedRows[0].dataValues.password;
    res.json({
      status: "success",
      data: affectedRows[0],
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  remove,
};
