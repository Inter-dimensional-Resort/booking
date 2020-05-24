const faker = require('faker');
const Path = require('path');
const Fs = require('fs');
const { Readable } = require('stream');

const roomsWritable = Fs.createWriteStream(Path.resolve(__dirname, 'rooms.csv'));
const bookingsWritable = Fs.createWriteStream(Path.resolve(__dirname, 'bookings.csv'));

const randomNumberGenerator = (min, max) => {
  const minVal = Math.ceil(min);
  const maxVal = Math.floor(max);
  return Math.floor(Math.random() * (maxVal - minVal)) + minVal;
};

const checkInOutGenerator = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  let date = new Date().getDate();
  date += randomNumberGenerator(1, 60);
  const checkIn = new Date(year, month, date);
  date += randomNumberGenerator(2, 6);
  const checkOut = new Date(year, month, date);
  return { checkIn, checkOut };
};

const roomNameAppendix = ['\'s Apartment', '\'s House', '\'s Loft', '\'s Condo'];

class RoomStream extends Readable {
  constructor(options) {
    super(options);

    this.count = 1;
  }

  _read() {
    if (this.count === 1E7) {
      console.log('Rooms: writes complete');
      return;
    }

    const room = {
      id: this.count.toString(),
      description: faker.name.findName()
          + roomNameAppendix[randomNumberGenerator(0, roomNameAppendix.length - 1)],
      price: randomNumberGenerator(50, 200),
      cleaning_fee: randomNumberGenerator(20, 100),
      service_fee: randomNumberGenerator(10, 50),
      tax: randomNumberGenerator(5, 20),
      max_adults: randomNumberGenerator(1, 6),
      max_children: randomNumberGenerator(0, 4),
      max_infants: randomNumberGenerator(0, 2),
      min_night: randomNumberGenerator(1, 5),
      max_night: randomNumberGenerator(5, 20),
      ratings: randomNumberGenerator(1, 5),
      num_reviews: randomNumberGenerator(1, 100),
    };
    if (this.count === 1) {
      this.push(`${Object.keys(room).toString()}\n`);
    }
    this.push(`${room.id},${room.description},${room.price},${room.cleaning_fee},${room.service_fee},${room.tax},${room.max_adults},${room.max_children},${room.max_infants},${room.max_night},${room.min_night},${room.num_reviews}\n`);
    this.count += 1;
  }
}

class BookingStream extends Readable {
  constructor(options) {
    super(options);

    this.count = 1;
  }

  _read() {
    if (this.count === 1E7) {
      console.log('Bookings: Writes complete');
      return;
    }
    const { checkIn, checkOut } = checkInOutGenerator();
    const booking = {
      id: this.count.toString(),
      check_in: checkIn,
      check_out: checkOut,
      createdAt: faker.date.past(),
      email: faker.internet.email(),
      adults: randomNumberGenerator(1, 6),
      children: randomNumberGenerator(0, 4),
      infants: randomNumberGenerator(0, 2),
      roomId: this.count.toString(),
      updatedAt: faker.date.past(),
    };
    if (this.count === 1) {
      this.push(`${Object.keys(booking).toString()}\n`);
    }
    this.push(`${booking.id},${booking.check_in},${booking.check_out},${booking.createdAt},${booking.email},${booking.adults},${booking.children},${booking.infants},${booking.roomId},${booking.updatedAt}\n`);
    this.count += 1;
  }
}

const roomStream = new RoomStream();
roomStream.pipe(roomsWritable);

const bookingStream = new BookingStream();
bookingStream.pipe(bookingsWritable);
