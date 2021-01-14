module.exports = {
  HOST: "localhost",
  USER: "day40",
  PASSWORD: "day40@123",
  DB: "booking",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};