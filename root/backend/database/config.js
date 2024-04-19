const mongoose = require('mongoose');

// Conectar a MongoDB

const ConnectDB = async () => {

    mongoose.set('strictQuery', true);
  
    try {
  
      await mongoose.connect('mongodb+srv://fabri:fabripassword@giaiweb.teni6je.mongodb.net/')
  
  
      // Si se conecto exitosamente
  
      console.log('DB online');
  
    } catch (error) {
  
      // Si no se conecto exitosamente
  
      console.log(error);
      throw new Error('Error connecting to DB')
  
    }

    
  };



  

  module.exports = {
    ConnectDB,
  }