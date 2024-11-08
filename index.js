import express from "express";
const app = express();
const port = 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

// add a new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

// get all teas
app.get("/teas", (req, res) => {
  res.send(teaData);
});

// get a specific tea
app.get("/teas/:id", (req, res) => {
  const { id } = req.params;
  const tea = teaData.find((t) => t.id === Number(id));
  if (tea) {
    res.status(200).send(tea);
  } else {
    res.status(404).send("Tea not found");
  }
});

// update a specific tea
app.put("/teas/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const tea = teaData.findIndex((t) => t.id === Number(id));
  if (tea !== -1) {
    const updatedTea = { id: Number(id), name, price };
    teaData[tea] = updatedTea;
    res.status(200).send(updatedTea);
  } else {
    res.status(404).send("Tea not found");
  }
});

// delete a specific tea
app.delete("/teas/:id", (req, res) => {
  const { id } = req.params;
  const tea = teaData.findIndex((t) => t.id === Number(id));
  if (tea !== -1) {
    teaData.splice(tea, 1);
    res.status(200).send("Tea deleted");
  } else {
    res.status(404).send("Tea not found");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
