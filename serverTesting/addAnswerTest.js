import http from 'k6/http';
import { sleep } from 'k6';
import { API_URL } from '../config.js';

export let options = {
  stages: [
    { duration: '15s', target: 1 }, // 1 RPS
    { duration: '15s', target: 10 }, // 10 RPS
    { duration: '15s', target: 100 }, // 100 RPS
    { duration: '15s', target: 1000 } // 1000 RPS
  ]
};

export default function addAnswer () {
  var payload = JSON.stringify({ name : "coolguy",
  email : "coolguy@gmail.com",
  body : "Yes factory is ethical",
  photos: "[]"});
  var params = {
    headers: {
      'Content-Type' : 'application/json'
    },
  };
  http.post(`${API_URL}/qa/questions/3518963/answers`, payload, params);

  sleep(1);
}