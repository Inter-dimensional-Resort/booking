const { Pool } = require('pg');

const pool = new Pool({
  database: 'listings',
});

pool.connect(() => {
  console.log('connected to PostgreSQL');
});

const getRoom = (id, callback) => {
  const query = {
    text: `SELECT * FROM rooms WHERE id = ($1)`,
    values: [id],
  };

  pool.query(query)
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      callback(err);
    });
};

const getBooking = (id, callback) => {
  const query = {
    text: `SELECT * FROM bookings JOIN rooms ON bookings.room_id = rooms.id WHERE rooms.id = ($1)`,
    values: [id],
  };

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
  getBooking,
};
