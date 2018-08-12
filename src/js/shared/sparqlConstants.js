export const SparqlConstants = {
  WIKI_ENTITY_SEARCH_URL: 'https://www.wikidata.org/w/api.php?action=wbsearchentities&search=#entity&format=json&language=en&uselang=en&type=item',
  END_POINT_URL: 'https://query.wikidata.org/sparql',
  q_words: ['What is', 'Who is', 'Where is', 'Which is'],
  q_preps: ['of', 'in', 'on', 'at'],
  PROPS: {
    INSTANCE_OF: 'P31',
    LANGUAGE_OF_WORK: 'P364',
    PEOPLE: {
      OCCUPATION: { PID: 'P106', QUESTION_TEMPLATE: 'What profession is #ITEM famous for?' },
      COUNTRY: { PID: 'P27', QUESTION_TEMPLATE: '#ITEM is from which country?' },
      PLACE_OF_BIRTH: { PID: 'P19', QUESTION_TEMPLATE: 'What is the place of birth of #ITEM?' },
      DATE_OF_BIRTH: { PID: 'P569', QUESTION_TEMPLATE: 'What is the date of birth of #ITEM?', IS_DATE: true },
      FATHER: { PID: 'P22', QUESTION_TEMPLATE: 'Who is the father of #ITEM?' },
      SPOUSE: { PID: 'P26', QUESTION_TEMPLATE: 'Who is the spouse of #ITEM?' },
      CHILD: { PID: 'P40', QUESTION_TEMPLATE: 'Which one of these is the child of #ITEM?' },
      COLLEGE: { PID: 'P69', QUESTION_TEMPLATE: 'Which college did #ITEM go to?' },
      AWARD: { PID: 'P166', QUESTION_TEMPLATE: 'Which of the following awards has #ITEM claimed?' },
      // IMAGE: { PID: 'P18', QUESTION_TEMPLATE: 'Which one of the following is #ITEM?' },
    },
    COUNTRY: {
      INCEPTION: { PID: 'P571', QUESTION_TEMPLATE: 'When was #ITEM incepted?', IS_DATE: true },
      OFFICIAL_WEBSITE: { PID: 'P856', QUESTION_TEMPLATE: 'What is the official Website of #ITEM?' },
      ANTHEM: { PID:'P85', QUESTION_TEMPLATE: 'What is the national anthem of #ITEM?' },
      MOTTO: { PID:'P1546', QUESTION_TEMPLATE: 'What is the motto of #ITEM?' },
      CONTINENT: {PID:'P30', QUESTION_TEMPLATE: '#ITEM is in which continent?' },
      CAPITAL: { PID:'P36', QUESTION_TEMPLATE: 'What is the capital of #ITEM?' },
      HIGHEST_POINT: { PID:'P610', QUESTION_TEMPLATE: 'What is the highest altitude of #ITEM?' },
      DEEPEST_POINT: {PID: 'P1589', QUESTION_TEMPLATE: 'What is the deepest point of #ITEM?' },
      HEAD_OF_STATE: { PID:'P35', QUESTION_TEMPLATE: 'Who is the current Head of State of #ITEM?' },
      HEAD_OF_GOVERNMENT: { PID:'P1313',  QUESTION_TEMPLATE: 'Who is currently Head of Government of #ITEM?' },// PRIME MINISTER
      CENTRAL_BANK: { PID:'P1304', QUESTION_TEMPLATE: 'Which of the following is the Central bank of #ITEM?' },
      HIGHEST_JUDICIAL_AUTHORITY: { PID:'P209', QUESTION_TEMPLATE: 'What is the highest judicial authority of #ITEM?' },
      CURRENCY: { PID:'P38', QUESTION_TEMPLATE: 'What is the currency of #ITEM?' },
      SHARES_BORDER_WITH: { PID:'P47', QUESTION_TEMPLATE: 'With which of the following does #ITEM shares the borders?' },
      MOBILE_COUNTRY_CODE: { PID:'P2258', QUESTION_TEMPLATE: 'What is the mobile country code of #ITEM?' },
      COUNTRY_CALLING_CODE: { PID:'P474', QUESTION_TEMPLATE: 'What is the country calling code of #ITEM?' },
      EMERGENCY_PHONE_NUMBERS: { PID: 'P2852', QUESTION_TEMPLATE: 'Which of the following is an emergency number used in #ITEM?' }
    },
    STATE_OF_INDIA: {
      INCEPTION: { PID: 'P571', QUESTION_TEMPLATE: 'When was #ITEM incepted?', IS_DATE: true },
      OFFICIAL_WEBSITE: { PID: 'P856', QUESTION_TEMPLATE: 'What is the official Website of #ITEM?' },
      COUNTRY: { PID: 'P17', QUESTION_TEMPLATE: 'Which country does #ITEM fall in?' },
      CAPITAL: { PID: 'P36', QUESTION_TEMPLATE: 'What is the capital of #ITEM?' },
      LOCATED_IN: { PID: 'P131', QUESTION_TEMPLATE: 'What is the administrative territorial entity of #ITEM?' },
      HEAD_OF_STATE: { PID: 'P35', QUESTION_TEMPLATE: 'Who is currently the head of state of #ITEM?' },
      HEAD_OF_GOVERNMENT: { PID: 'P6',  QUESTION_TEMPLATE: 'Who is the current head of government of #ITEM?' },
      SHARES_BORDER_WITH: { PID: 'P47', QUESTION_TEMPLATE: 'With which of the following does #ITEM shares the borders?' },
    },
    STATE_OF_UNITED_STATES: {
      INCEPTION: { PID: 'P571', QUESTION_TEMPLATE: 'When was #ITEM incepted?', IS_DATE: true },
      OFFICIAL_WEBSITE: { PID: 'P856', QUESTION_TEMPLATE: 'What is the official Website of #ITEM?' },
      COUNTRY: { PID: 'P17', QUESTION_TEMPLATE: 'Which country does #ITEM fall in?' },
      CAPITAL: { PID: 'P36', QUESTION_TEMPLATE: 'What is the capital of #ITEM?' },
      LOCATED_IN: { PID: 'P131', QUESTION_TEMPLATE: 'What is the administrative territorial entity of #ITEM?' },
      HEAD_OF_STATE: { PID: 'P35', QUESTION_TEMPLATE: 'Who is currently the head of state of #ITEM?' },
      HEAD_OF_GOVERNMENT: { PID: 'P6',  QUESTION_TEMPLATE: 'Who is the current head of government of #ITEM?' },
      SHARES_BORDER_WITH: { PID: 'P47', QUESTION_TEMPLATE: 'With which of the following does #ITEM shares the borders?' },
    },
    CITY: {
      INCEPTION: { PID: 'P571', QUESTION_TEMPLATE: 'When was #ITEM incepted?', IS_DATE: true },
      OFFICIAL_WEBSITE: { PID: 'P856', QUESTION_TEMPLATE: 'What is the official Website of #ITEM?' },
      COUNTRY: { PID: 'P17', QUESTION_TEMPLATE: 'Which country does #ITEM fall in?' },
      CAPITAL_OF: { PID: 'P1376', QUESTION_TEMPLATE: '#ITEM is capital of which of the following?' },
      POSTAL_CODE: { PID: 'P281', QUESTION_TEMPLATE: 'What is the postal code of #ITEM?' },
      LOCAL_DIALLING_CODE: { PID: 'P473', QUESTION_TEMPLATE: 'What is the local dialling code of #ITEM?' }
    },
    ORGANIZATION: {
      INCEPTION: { PID: 'P571', QUESTION_TEMPLATE: 'When was #ITEM incepted?', IS_DATE: true },
      OFFICIAL_WEBSITE: { PID: 'P856', QUESTION_TEMPLATE: 'What is the official Website of #ITEM?' },
      // IMAGE: 'P18',
    },
    BUSINESS_ENTERPRISE: {
      INDUSTRY: { PID: 'P452', QUESTION_TEMPLATE: 'Which is one of the industries that #ITEM is involved in?' },
      INCEPTION: { PID: 'P571', QUESTION_TEMPLATE: 'When was #ITEM incepted?', IS_DATE: true },
      FOUNDER: { PID: 'P112', QUESTION_TEMPLATE: 'Who is the founder of #ITEM?' },
      CEO: { PID: 'P169', QUESTION_TEMPLATE: 'Who is the CEO of #ITEM?' },
      MOTTO: { PID:'P1546', QUESTION_TEMPLATE: 'What is the motto of #ITEM?' },
      COUNTRY: { PID: 'P17', QUESTION_TEMPLATE: 'Which country is #ITEM located?' },
      AWARD: { PID: 'P166', QUESTION_TEMPLATE: 'Which of the following awards has been claimed by #ITEM?' },
      PARENT_ORGANIZATION: { PID: 'P749', QUESTION_TEMPLATE: 'Which of the following is the parent organization of #ITEM?' },
      SUBSIDIARY: { PID: 'P355', QUESTION_TEMPLATE: 'Which of the following is a subsidiary of #ITEM?' },
      HEADQUARTER: { PID: 'P159', QUESTION_TEMPLATE: 'Where is #ITEM headquartered?'},
      OFFICIAL_WEBSITE: { PID: 'P856', QUESTION_TEMPLATE: 'What is the official Website of #ITEM?' },

    },
    PUBLIC_HOLIDAY: {
      COUNTRY: { PID: 'P17', QUESTION_TEMPLATE: '#ITEM is primarily celebrated in which of the following countries?' },
      DATE: { PID: 'P837', QUESTION_TEMPLATE: 'When is #ITEM celebrated/observed?', IS_DATE: true }
    },
    FESTIVAL: {

    },
    FILM: {
      DIRECTOR: { PID: 'P57', QUESTION_TEMPLATE: 'Who directed the movie #ITEM?'},
      COMPOSER: { PID: 'P86', QUESTION_TEMPLATE: 'Who composed music in the movie #ITEM?'},
      PRODUCER: { PID: 'P162', QUESTION_TEMPLATE: 'Who was the producer of the movie #ITEM?'},
      PRODUCTION_COMPANY: { PID: 'P272', QUESTION_TEMPLATE: '#ITEM was produced under which production banner?'},
      AWARD: { PID: 'P166', QUESTION_TEMPLATE: 'Which of the following awards has been claimed by #ITEM?' },
      PUBLICATION_DATE: { PID: 'P577', QUESTION_TEMPLATE: 'When was the movie #ITEM released?', IS_DATE: true }
    },
    INVENTION: {
      INCEPTION: { PID: 'P571', QUESTION_TEMPLATE: 'When was #ITEM incepted?', IS_DATE: true },
    }
  },
  // Values to be used as Filters for Generating Questions
  VALUES: {
    LANGUAGE_OF_WORK: {
      ENGLISH: 'Q1860',
      HINDI: 'Q1568',
    },
    INSTANCE_OF: {
      HUMAN: 'Q5',
      CITY: 'Q515',
      COUNTRY: 'Q6256',
      STATE_OF_INDIA: 'Q13390680',
      STATE_OF_UNITED_STATES: 'Q35657',
      BUSINESS_ENTERPRISE: 'Q4830453',
      INVENTION: 'Q18119757',
      PUBLIC_HOLIDAY: 'Q1197685',
      FESTIVAL: 'Q132241',
      ORGANIZATION: 'Q484562',
      FILM: 'Q11424',
    },
    PEOPLE: {
      OCCUPATION: {
        ACTOR: 'Q33999',
        CRICKETER: 'Q12299841',
        PRODUCER: 'Q3282637',
        DIRECTOR: 'Q2526255',
        MODEL: 'Q4610556',
        ENTERPRENEUR: 'Q131524',
      },
    },
    CITY: {

    },

  },
};
