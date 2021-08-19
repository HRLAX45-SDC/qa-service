var db = require('../../db');

module.exports = {
  getQuestions: function (req, res) {
    console.log(req.query.product_id);
    var product_id = req.query.product_id;
    var count = req.query.count;
    var sql = `select * from schema1.questions_1
    where product_id = ${product_id} and reported = 0
    limit ${count}`
    console.log('sql', sql);
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send(err);
      } else {
        res.status(200).send(result.rows);
      }
    })
  },

  addHelpful: function (req, res) {
    var question_id = req.params.question_id;
    var sql = `update schema1.questions_1
    set question_helpfulness = question_helpfulness + 1
    where question_id = ${question_id}`
    console.log(sql);
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(`Updated ${question_id} helpfulness`)
      }
    })
  },

  report: function (req, res) {
    var question_id = req.params.question_id;
    var sql = `update schema1.questions_1
    set reported = reported + 1
    where question_id = ${question_id}`
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(`Reported ${question_id}`)
      }
    })
  },

  addQuestion: function (req, res) {
    var question_body = req.body.body;
    var name = req.body.asker_name;
    var email = req.body.email;
    var product_id = req.body.product_id;
    var sql = `insert into schema1.questions_1 (product_id, question_body, asker_name, asker_email, reported, question_helpfulness)
    values (${product_id}, '${question_body}', '${name}', '${email}', 0, 0)`
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send('Question added')
      }
    })
  }

}
