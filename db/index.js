const { Pool } = require('pg');

const pool = new Pool({
  database: 'listings',
});

pool.connect(() => {
  console.log('connected to PostgreSQL');
});

const getRoom = (id, callback) => {
  const query = `SELECT * FROM rooms WHERE id = ${Number(id)}`;
  pool.query(query)
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      callback(err);
    });
};

module.exports = {
  pool,
  getRoom,
};
