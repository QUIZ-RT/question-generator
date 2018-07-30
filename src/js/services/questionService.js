import Constants  from '../shared/constants';
import { DataService } from './dataService';

class QuestionService {
  constructor() {
    this.dataService = new DataService(Constants.WIKI_AUTH_KEY);
  }

  searchQuestions(query, offset) {
    this.dataService.fetchOptions.method = 'GET';
    let searchUrl = Constants.WIKI_API_BASE;
    searchUrl += queryParams;
    return this.dataService.getJSON(searchUrl);
  }

  getQuestionDetail(id) {
    const url = `${Constants.WIKI_API_BASE}question/${id}`;
    return this.dataService.getJSON(url);
  }
}

export default QuestionService;
