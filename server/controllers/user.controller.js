const db = require("../models");
const User = db.user

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = async (req, res) => {
  const users = await User.findAll(
    // {
    //   attributes: ['id', 'username', 'email']
    // },
    { 
      include: 'roles'
    }
  );

  var allUsers = []
  for (let i = 0; i < users.length; i++) {
    var authorities = [];
    for (let j = 0; j < users[i].roles.length; j++) {
      authorities.push("ROLE_" + users[i].roles[j].name.toUpperCase());
    }
    allUsers.push({
      id: users[i].id,
      username: users[i].username,
      email: users[i].email,
      roles: authorities
    })
  }
  // console.log('findAll', JSON.stringify(users));
  // console.log('findAll', users[1].roles.length);
  // console.log('findAll', allUsers);
  try {
    // res.status(200).json(users);
    res.status(200).send(allUsers);
  } catch (error) {
    console.error(error)
    res.error(500).send({ message: error })    
  }
};

exports.deleteUser = (req, res) => {
  console.log('deleting user', req.params)
  User.destroy({
    where: { id : req.params.id}
  })
  .then(function(rowDeleted) {
    if (rowDeleted === 1) {
      res.status(200).send({message: 'User deleted successfully'});
    }
    }, function(err) {
      res.error(400).send({ message: error }) 
    }
  )
};

exports.driverBoard = (req, res) => {
  res.status(200).send("Driver Content.");
};

