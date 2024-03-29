"use strict";

const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Category = db.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      name: "id",
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(150),
      field: "name",
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "The name cannot be null",
        },
        notEmpty: {
          msg: "The name is required",
        },
        len: {
          args: [0, 150],
          msg: "The name must be maximun 150 characters",
        },
      },
    },
    status: {
      type: DataTypes.INTEGER,
      field: "status",
      allowNull: false,
      defaultValue: 1,
      validate: {
        isIn: {
          args: [[0, 1]],
          msg: "The status must be only 0 or 1",
        },
      },
    },
    createdBy: {
      type: DataTypes.STRING(50),
      field: "created_by",
      allowNull: false,
      defaultValue: "admin",
      validate: {
        len: {
          args: [0, 50],
          msg: "The created_by must be maximun 50 characters",
        },
      },
    },
    updatedBy: {
      type: DataTypes.STRING(50),
      field: "updated_by",
      allowNull: false,
      defaultValue: "admin",
      validate: {
        len: {
          args: [0, 50],
          msg: "The updated_by must be maximun 50 characters",
        },
      },
    },
  },
  {
    tableName: "Categories",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = {
  Category,
};
