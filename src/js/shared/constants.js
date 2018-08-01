class Constants {
  static get WIKI_API_BASE() {
    return 'https://wikipedia.org/api/';
  }

  static get WIKI_AUTH_KEY() {
    return '###';
  }

  static get PAGING_COUNT() {
    return 8;
  }

  static get END_POINT_URL() {
    return 'https://query.wikidata.org/sparql';
  }

  static get Q_CONSTRUCTORS() {
    return { 'q_words': ["What is", "Who is", "Where is", "Which is"], 'q_preps': ['of', 'in', 'on', 'at'] }
  }
}

export default Constants;
