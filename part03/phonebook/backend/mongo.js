const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.k1qnycq.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

// const person = new Person({
//   name: process.argv[3],
//   number: process.argv[4],
// });

// person.save().then((result) => {
//   console.log(`added ${process.argv[3]} ${process.argv[4]} to phonebook`);
//   mongoose.connection.close();
// });

Person.find({}).then((res) => {
  console.log("phonebook:");
  res.forEach((person) => console.log(`${person.name} ${person.number}`));
});
