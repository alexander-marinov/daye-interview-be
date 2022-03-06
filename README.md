# Daye interview
**Backend Developer Technical Task**

Use `npm start` to run the application. It will listen to requests on port `9000`

The following endpoints are available:

#### Products
- `GET http://[host]:[port]/products` Will return a list of all available products

- `GET http://[host]:[port]/products/{id}` Will return a detailed specification for a single product

#### Materials
- `GET http://[host]:[port]/materials` Will return a list of all available materials on stock and their quantity

- `GET http://[host]:[port]/materials/{id}` Will return the quantity on stock for a specific material

#### Orders
- `POST http://[host]:[port]/orders` Sends an production order containting product IDs and quantities. When this request is executed the materials quantity is changed. The cnages can be viewed with the `/materials` endpoint.

`Request body:`

```JSON
[
	{
		"product_id": "nsp",
		"quantity": 10
	},
	{
		"product_id": "nrg",
		"quantity": 100
	}
]
```