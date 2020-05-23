const Path = require('path');
const Fs = require('fs');
const { Readable } = require('stream');
const faker = require('faker');
// const moment = require('moment');

const writableFile = Fs.createWriteStream(Path.resolve(__dirname, 'rooms.json'));

const randomNumberGenerator = (min, max) => {
  const minVal = Math.ceil(min);
  const maxVal = Math.floor(max);
  return Math.floor(Math.random() * (maxVal - minVal)) + minVal;
};
const roomNameAppendix = ['\'s Apartment', '\'s House', '\'s Loft', '\'s Condo'];

class RoomObjStream extends Readable {
  constructor(options) {
    super(options);

    this.count = 0;
  }

  _read() {
    if (this.count === 1E7) {
      console.log('Writes complete');
      return;
    }
    const room = {
      id: this.count,
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
    };
    this.push(`${JSON.stringify(room)}\n`);
    this.count += 1;
  }
}

const roomObjs = new RoomObjStream();
roomObjs.pipe(writableFile);
