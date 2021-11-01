// const express = require("express");
// const router = express.Router();
// const { Pet, User } = require("../../models");

// router.get("/", (req, res) => {
//   Pet.findAll({
//     include: [User]
//   })
//     .then(dbPets => {
//       if (dbPets.length) {
//         res.json(dbPets);
//       } else {
//         res.status(404).json({ message: "No pets found!" });
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ message: "an error occured", err: err });
//     });
// });

// router.post("/", (req, res) => {
//   if(!req.session.user){
//     return res.status(401).send("log in first you knucklehead!")
//   }
//   Pet.create({
//     name: req.body.name,
//     species: req.body.species,
//     age: req.body.age,
//     UserId:req.session.user.id
//   })
//     .then(newPet => {
//       res.json(newPet);
//     })
//       .then(newPet => {
//         res.json(newPet);
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json({ message: "an error occured", err: err });
//       });

// });

// module.exports = router;
