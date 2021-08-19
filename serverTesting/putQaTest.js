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

export default function () {
    ['PUT',
      `${API_URL}/qa/questions/3518963/helpful`,
      {},
      { tags: {name: 'Update Question Helpfulness'}},
    ],
    ['PUT',
      `${API_URL}/qa/questions/3518963/report`,
      {},
      { tags: {name: 'Report Question'}},
    ],
    ['PUT',
      `${API_URL}/qa/answers/6879306/helpful`,
      {},
      { tags: { name: 'Update Answer Helpfulness' } }
    ],
    ['PUT',
      `${API_URL}/qa/answers/6879306/report`,
      {},
      { tags: { name: 'Report answer'}}
    ]
}