const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Dessert = require('../lib/models/Dessert');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should be able to create a dessert', async () => {
    const res = await request(app)
      .post('/desserts')
      .send({ item: 'carrot cake', calories: 300 });

    expect(res.body).toEqual({
      id: expect.any(String), item: 'carrot cake', calories: 300 
    });
  });

  it('should be able to list a dessert by id', async () => {
    const dessert = await Dessert.insert({
      item: 'cheesecake',
      calories: 300,
    });

    const res = await request(app)
      .get(`/desserts/${dessert.id}`);

    expect(res.body).toEqual(dessert);
  });

  it('should list all desserts', async () => {
    await Dessert.insert({ 
      item: 'pound cake',
      calories: 150,
    });
    await Dessert.insert({
      item: 'ice cream sunday',
      calories: 400,
    });

    const res = await request(app)
      .get('/desserts');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        item: 'pound cake',
        calories: 150
      },
      {
        id: expect.any(String),
        item: 'ice cream sunday',
        calories: 400
      }
    ]);
  });

  it('should update a dessert', async () => {
    const dessert = await Dessert.insert({
      item: 'fruit tart',
      calories: 200,
    });

    const res = await request(app)
      .patch(`/desserts/${dessert.id}`)
      .send({ item: 'cookie dough' });

    const expected = {
      id: expect.any(String),
      item: 'cookie dough',
      calories: 200,
    };

    expect(res.body).toEqual(expected);
  });

  it('should delete a dessert', async () => {
    const dessert = await Dessert.insert({
      item: 'vanilla sunday',
      calories: 400,
    });

    const res = await request(app)
      .delete(`/desserts/${dessert.id}`);

    expect(res.body).toEqual(dessert);
    expect(await Dessert.getById(dessert.id)).toBeNull();
  });
});
