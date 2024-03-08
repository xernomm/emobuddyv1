import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const VerificationCode = db.define("verification_code", {
    
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    expiry_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
})

export default VerificationCode;