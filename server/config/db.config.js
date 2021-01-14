module.exports = {
  HOST:	"us-cdbr-east-03.cleardb.com",
  USER:	"bbeba1d2c4fe8b",
  PASSWORD: "12ed5500",
  DB:	"heroku_afa060b04147f9b",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};