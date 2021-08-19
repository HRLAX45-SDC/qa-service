var db = require('../../db');

module.exports = {
  getAnswers: function (req, res) {
    var question_id = req.params.question_id;
    console.log(question_id);
    var count = req.query.count;
    console.log(count);
    var sql = `select *
               from schema1.answer_photos_combined
               where question_id = ${question_id} and reported = 0
               limit ${count}`
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(result.rows);
      }
    })
  },

  addAnswer: function (req, res) {
    var question_id = req.params.question_id;
    var body = req.body.body;
    var name = req.body.name;
    var email = req.body.email;
    var photos = req.body.photos;
    var sql = `insert into schema1.answer_photos_combined (question_id, body, answerer_name, answer_email, photos, reported, helpfulness)
    values (${question_id}, '${body}', '${name}', '${email}', '${photos}', 0, 0)`
    console.log(sql);
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send('Answer added!');
      }
    })
  },

  addHelpful: function (req, res) {
    var answer_id = req.params.answer_id;
    var sql = `update schema1.answer_photos_combined
    set helpfulness = helpfulness + 1
    where answer_id = ${answer_id}`
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(`Updated ${answer_id} helpfulness!`)
      }
    })
  },

  report: function (req, res) {
    var answer_id = req.params.answer_id;
    console.log('answer_id', answer_id);
    var sql = `update schema1.answer_photos_combined
    set reported = reported + 1 where answer_id = ${answer_id}`
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(`Reported ${answer_id}`)
      }
    })
  }

}


