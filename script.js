import http from 'k6/http';
import { check } from 'k6';

const randomNumberGenerator = (min, max) => {
  const minVal = Math.ceil(min);
  const maxVal = Math.floor(max);
  return Math.floor(Math.random() * (maxVal - minVal)) + minVal;
};

export const options = {
  stages: [
    { duration: '10s', target: 100 },
    { duration: '30s', target: 500 },
    { duration: '60s', target: 1000 },
    { duration: '30s', target: 2000 },
    { duration: '90s', target: 100 },
    { duration: '60s', target: 1000 },
  ]
};

export default () => {
  let res = http.get(`http://localhost:3333/room/?id=${randomNumberGenerator(0, 9999999)}`);
  check(res, { 'status was 200': r => r.status
 === 200 });
};
