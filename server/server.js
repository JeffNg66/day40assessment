const express = require("express");
const cors = require("cors");
const morgan = require('morgan')

const app = express();

app.use(cors());
app.use(morgan('combined'))

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// deploy client front
// app.use(express.static(__dirname + '/dist/client'))

// database
const db = require("./models");
const Role = db.role;

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;

(async () => {

  await db.sequelize.sync();

// force: true will drop the table if it already exists
  // await db.sequelize.sync({force: true}).then(() => {
  //   console.log('Drop and Resync Database with { force: true }');
  //   initial();
  // });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} at ${new Date()}.`);
  });
  
})();

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "driver"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}