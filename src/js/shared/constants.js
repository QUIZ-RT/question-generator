class Constants {
  static get WIKI_API_BASE() {
    return 'https://wikipedia.org/api/';
  }

  static get QUIZ_GENX_API_BASE() {
    return '/api';
  }

  static get FCM_TOKEN_UPDATE() {
    return 'FcmTokenUpdate';
  }

  static get ADMIN_ACCESS_REQUEST() {
    return 'AdminAccessRequest';
  }

  static get GRANT_ACCESS_REQUEST() {
    return 'GrantAccessRequest';
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
    return { q_words: ['What is', 'Who is', 'Where is', 'Which is'], q_preps: ['of', 'in', 'on', 'at'] };
  }

  static get TOPIC_PAGING_LIMIT() {
    return 5;
  }
}

export default Constants;
