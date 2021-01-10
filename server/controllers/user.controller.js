const db = require("../models");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = async (req, res) => {
  const users = await db.user.findAll(
    // {
    //   attributes: ['id', 'username', 'email']
    // },
    { 
      include: 'roles'
    }
  );
  console.log('findAll', users);
  try {
    res.status(200).json(users);
  } catch (error) {
    console.error(error)
    res.error(500).send({ message: error })    
  }
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};