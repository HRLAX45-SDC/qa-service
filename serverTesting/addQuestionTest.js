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

export default function addQuestion () {
  var payload = JSON.stringify({ body : "Are these on trend?",
  name : "influencer",
  email: "influencer@gmail.com",
  product_id: 16058});
  var params = {
    headers: {
      'Content-Type' : 'application/json'
    },
  };
  http.post(`${API_URL}/qa/questions`, payload, params);

  sleep(1);
}
