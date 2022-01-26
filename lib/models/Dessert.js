const pool = require('../utils/pool');

module.exports = class Dessert {
  id;
  item;
  calories;
  
  constructor(row) {
    this.id = row.id;
    this.item = row.item;
    this.calories = row.calories;
  }

  static async insert({ item, calories }) {
    const { rows } = await pool.query('INSERT INTO desserts (item, calories) VALUES ($1, $2) RETURNING *', [item, calories]
    );
    console.log(rows);
    return new Dessert(rows[0]);
  } 
  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM desserts WHERE id=$1', [id]);
    console.log(rows);
    if (!rows[0]) return null;
    return new Dessert(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM desserts');
    return rows.map((row) => new Dessert(row));
  }
  static async updateById(id, attributes) {
    const result = await pool.query('SELECT * FROM desserts WHERE id=$1', [id]);

    const existingDessert = result.rows[0];
    if(!existingDessert) {
      const error = new Error(`Dessert ${id} not found`);
      error.status = 404;
      throw error;
    }
    const item = attributes.item ?? existingDessert.item;
    const calories = attributes.calories ?? existingDessert.calories;

    const { rows } = await pool.query('UPDATE desserts SET item=$2, calories=$3 WHERE id=$1 RETURNING *', [id, item, calories]);

    return new Dessert(rows[0]);
  }
  static async deleteById(id) {
    const { rows } = await pool.query('DELETE FROM desserts WHERE id=$1 RETURNING *', [id]);

    if (!rows[0]) return null;
    return new Dessert(rows[0]);
  }
};
