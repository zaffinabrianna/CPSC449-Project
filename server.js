const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static("front-end"));

const DATABASE_FILE = "cats.json";


function readFromDatabase() 
{
  const data = fs.readFileSync(DATABASE_FILE);
  return JSON.parse(data);
}


function writeToDatabase(data) 
{
  fs.writeFileSync(DATABASE_FILE, JSON.stringify(data, null, 2));
}


/* Get all cats */
app.get("/cats", (req, res) => 
{
  const cats = readFromDatabase();
  res.json(cats);
});


/* Search cat by name */
app.get("/cats/search/:name", (req, res) => 
{
  const cats = readFromDatabase();

  const filteredCats = cats.filter(cat =>
    cat.name.toLowerCase() === req.params.name.toLowerCase()
  );

  res.json(filteredCats);
});


/* Add new cat */
app.post("/cats", (req, res) => {

  const cats = readFromDatabase();

  const newCat = 
  {
    name: req.body.name,
    age: req.body.age,
    color: req.body.color
  };

  cats.push(newCat);

  writeToDatabase(cats);

  res.json({ message: "Cat added successfully!" });

});


app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});