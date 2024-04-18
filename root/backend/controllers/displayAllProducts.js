const getAllProducts = (req, res) => {

    dbo.collection("test/products").find({}).toArray(function(err, result) {
        if (err) {
            // If an error occurs, send an error response
            res.status(500).send("An error occurred while fetching products.");
            return; // Exit the function to prevent further execution
        }
        console.log("Products:", result);
        // If no error occurs, send the result as a response
        res.json(result);
    });
}

module.exports = {
    getAllProducts,
}
