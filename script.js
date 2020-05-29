import http from 'k6/http';
import { check } from 'k6';

const randomNumberGenerator = (min, max) => {
  const minVal = Math.ceil(min);
  const maxVal = Math.floor(max);
  return Math.floor(Math.random() * (maxVal - minVal)) + minVal;
};

export const options = {
  // thresholds: {
  //   'failed requests': ['rate<0.1'],
  //   http_req_duration: ['p(100)<2000'],
  // },

  stages: [
    { duration: '10s', target: 1000 },
  ]
};

export default () => {
  let res = http.get(`http://localhost:3333/room/?id=${randomNumberGenerator(0, 9999999)}`);
  check(res, { 'status was 200': r => r.status
 === 200 });
};
