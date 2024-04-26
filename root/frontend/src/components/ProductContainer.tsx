import {
  Card,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";

const ProductContainer = ({ imageUrl, name, price, quantity }) => {
  return (
    <div className="max-w-xs p-6">
      <Card className="bg-gray-300">
        <CardHeader>
          <div className="justify-center flex w-full h-full">
            <img src={imageUrl} alt={name} />
          </div>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <div className="mt-4 -mb-2">
            <h3 className="text-left font-bold mb-2">{name}</h3>
            <div className="flex">
              <p style={{ fontSize: '30px' }} className="mr-4 text-">${price}</p>
              <p className="mt-2 mb-2 mr-2">Quantity: {quantity}</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductContainer;