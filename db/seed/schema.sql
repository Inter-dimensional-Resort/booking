DROP DATABASE IF EXISTS listings;

CREATE DATABASE listings;

CREATE TABLE rooms (
  id SERIAL,
  description VARCHAR(255) NOT NULL,
  price INT,
  cleaning_fee INT,
  service_fee INT,
  tax INT,
  max_adults INT,
  max_children INT,
  max_infants INT,
  min_night INT,
  max_night INT,
  ratings INT,
  num_reviews INT,
  PRIMARY KEY (id)
);

CREATE TABLE bookings (
  id SERIAL,
  room_id INT,
  check_in DATE,
  check_out DATE,
  createdAt DATE,
  email VARCHAR(255),
  adults INT,
  children INT,
  infants INT,
  updatedAt DATE,
  PRIMARY KEY (id),
  FOREIGN KEY (room_id)
    REFERENCES rooms(id)
);

\COPY rooms FROM './db/seed/rooms.csv' DELIMITER ',' CSV HEADER;
\COPY bookings FROM './db/seed/bookings.csv' DELIMITER ',' CSV HEADER;