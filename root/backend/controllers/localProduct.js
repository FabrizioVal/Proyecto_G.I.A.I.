const product = require('../models/product')

// API route to add a book
const LocalProduct = async (req, res) => {

  const { productName, productPrice, productQuantity, file } = req.body;

  try {
    const newProduct = new product({ name: productName, quantity: productQuantity, price: productPrice, imageUrl: file, });
    await newProduct.save(); //muere aca, salta al error al no recibir los datos, pero si ser accionado
    console.log('Producto añadido');
    res.status(200).send({ message: 'Producto añadido exitosamente' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: 'No se ha podido añadir el producto' });
  }

}

//Exportacion de funciones
module.exports = {
    LocalProduct,
}