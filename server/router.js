var questionsController = require('./controllers/questions.js');
var answerController = require('./controllers/answers.js');
var router = require('express').Router();


console.log(questionsController.getQuestions);

// Connect router methods to their corresponding routes
router
.get('/qa/questions', questionsController.getQuestions)
.put('/qa/questions/:question_id/helpful', questionsController.addHelpful)
.put('/qa/questions/:question_id/report', questionsController.report)
.post('/qa/questions', questionsController.addQuestion)
.get('/qa/questions/:question_id/answers', answerController.getAnswers)
.post('/qa/questions/:question_id/answers', answerController.addAnswer)
.put('/qa/answers/:answer_id/helpful', answerController.addHelpful)
.put('/qa/answers/:answer_id/report', answerController.report)

module.exports = router;



