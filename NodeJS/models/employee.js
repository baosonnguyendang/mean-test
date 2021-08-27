const mongoose = require('mongoose');

var Employee = mongoose.model('Employee', {
  name: { type: String },
  position: { type: String },
  office: { type: String },
  salary: { type: Number }
})

module.exports = { Employee }

// const createUser = () => {
//   const newUser = new Employee({
//     name: "A B",
//     position: 'sep',
//     office: 'C',
//     salary: 10,
//   });
//   try {
//     newUser.save();
//   } catch (err) {
//     console.log(err);
//   }
// }
// createUser();