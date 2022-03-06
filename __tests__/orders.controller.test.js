const OrdersController = require('../orders/controllers/orders.controller.js');
const db = require('../common/database.js');

jest.mock('../common/database.js');

beforeAll(() => {

  let cotton = { "quantity": 10000, "measure": "g", "material": "cotton", "_id": "MEGbR8VBozWmWFEF" };
  let tampon = {
    "id": "nsp", "name": "Naked Super Tampons", "_id": "8gBVL9XU6x8rQxUF",
    "specification": [{ "material": "cotton", "quantity": 200 }],
  }

  db.materials.asyncFind.mockResolvedValue( [cotton] );
  db.materials.asyncFindOne.mockResolvedValue( cotton );
  db.products.asyncFindOne.mockResolvedValue( tampon );
});

test('WHEN: Enough materials on stock, THEN: Order is fulfilled', async () => {
  //Given
  const req = {
    body: [
      {
        "product_id": "nsp",
        "quantity": 10
      }
    ]
  };
  let res = { send: jest.fn() };
  //When
  await OrdersController.execute(req, res);
  //Then
  expect(res.send.mock.calls[0][0]).toEqual({ status: "ок" });
});

test('WHEN: NOT enough materials on stock, THEN: Order is NOT fulfilled', async () => {
  //Given
  const req = {
    body: [
      {
        "product_id": "nsp",
        "quantity": 60
      }
    ]
  };
  let res = { send: jest.fn() };
  //When
  await OrdersController.execute(req, res);
  //Then
  expect(res.send.mock.calls[0][0]).toEqual({ status: "not enough materials on stock" });
});