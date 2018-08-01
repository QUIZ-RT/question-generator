import QuestionService from '../services/questionService';

class QuestionController {
  constructor() {
    this.questionService = new QuestionService();
  }

  searchQuestions(query, offset) {
    console.log(query + offset);
    this.questionService
      .searchQuestions()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
export default QuestionController;
