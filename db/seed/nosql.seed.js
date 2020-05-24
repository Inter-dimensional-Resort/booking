const Path = require('path');
const Fs = require('fs');
const { Readable } = require('stream');
const faker = require('faker');

const writableFile = Fs.createWriteStream(Path.resolve(__dirname, 'rooms.json'));

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

class ReadableStream extends Readable {
  constructor(options) {
    super(options);

    this.count = 0;
  }

  _read() {
    if (this.count === 1E7) {
      console.log('Documents: writes complete');
      return;
    }
    const { checkIn, checkOut } = checkInOutGenerator();
    const room = {
      _key: this.count.toString(),
      description: faker.name.findName()
          + roomNameAppendix[randomNumberGenerator(0, roomNameAppendix.length - 1)],
      price: randomNumberGenerator(50, 200),
      cleaning_fee: randomNumberGenerator(20, 100),
      service_fee: randomNumberGenerator(10, 50),
      tax: randomNumberGenerator(5, 20),
      max_guest: {
        adults: randomNumberGenerator(1, 6),
        children: randomNumberGenerator(0, 4),
        infants: randomNumberGenerator(0, 2),
      },
      min_night: randomNumberGenerator(1, 5),
      max_night: randomNumberGenerator(5, 20),
      ratings: randomNumberGenerator(1, 5),
      num_reviews: randomNumberGenerator(1, 100),
      booking: [
        {
          check_in: checkIn,
          check_out: checkOut,
          createdAt: faker.date.past(),
          email: faker.internet.email(),
          guests: {
            adults: randomNumberGenerator(1, 6),
            children: randomNumberGenerator(0, 4),
            infants: randomNumberGenerator(0, 2),
          },
          roomId: this.count.toString(),
          updatedAt: Date.now(),
        },
      ],
    };
    this.push(`${JSON.stringify(room)}\n`);
    this.count += 1;
  }
}

const roomStream = new ReadableStream();
roomStream.pipe(writableFile);
