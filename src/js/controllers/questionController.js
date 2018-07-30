import  Constants  from '../shared/constants'; 
import { QuestionService } from '../services/questionService';

export class CollectionController {
  constructor() {
    this.questionService = new QuestionService(); 
  }

  searchQuestions(query, offset) {
    this.questionService
      .searchQuestions()
      .then((data) => {
        console.log(data);
        //this.displayQuestions(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
 
}
