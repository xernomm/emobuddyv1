import { Sequelize  } from "sequelize";

const hostServer = process.env.HOST;

const db = new Sequelize('emobuddy','root','rich0505',{
    host: hostServer,
    dialect: 'mysql'
})

export default db;