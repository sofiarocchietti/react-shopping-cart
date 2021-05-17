const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json()); //Usamos el json para que pase  el body como json content.

mongoose.connect("mongodb://localhost/react-shopping-cart-db", { //Configuracion para mongodb;
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
});

const Product = mongoose.model("products", new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
   
})
); //Crear un model


app.get("/api/products", async (req, res) => {
    const products = await Product.find({}) //No hay una condicion, devolveme todos los productos.
    res.send(products); 
});

app.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body); //Crea un nuevo producto;
    const savedProduct = await newProduct.save() //Lo guarda en la base de datos;
    res.send(savedProduct); 
});

app.delete("/api/products/:id", async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
  });

const port = process.env.PORT || 5000; 
app.listen(port, () => console.log("server at http://localhost:5000")); 