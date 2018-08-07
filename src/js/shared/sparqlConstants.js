export const SparqlConstants = {
  WIKI_ENTITY_SEARCH_URL: 'https://www.wikidata.org/w/api.php?action=wbsearchentities&search=#entity&format=json&language=en&uselang=en&type=item',
  END_POINT_URL: 'https://query.wikidata.org/sparql',
  q_words: ['What is', 'Who is', 'Where is', 'Which is'],
  q_preps: ['of', 'in', 'on', 'at'],
  PROPS: {
    INSTANCE_OF: 'P31',
    PEOPLE: {
      OCCUPATION: { PID: 'P106', QUESTION_TEMPLATE: 'What profession is #ITEM famoous for?' },
      COUNTRY: { PID: 'P27', QUESTION_TEMPLATE: '#ITEM is from which country?' },
      PLACE_OF_BIRTH: { PID: 'P19', QUESTION_TEMPLATE: 'What is the place of birth of #ITEM?' },
      DATE_OF_BIRTH: { PID: 'P569', QUESTION_TEMPLATE: 'What is the date of birth of #ITEM?' },
      FATHER: { PID: 'P22', QUESTION_TEMPLATE: 'Who/\'s the father of #ITEM?' },
      SPOUSE: { PID: 'P26', QUESTION_TEMPLATE: 'Who/\'s the spouse of #ITEM?' },
      CHILD: { PID: 'P40', QUESTION_TEMPLATE: 'What one of these is #ITEM/\'s child?' },
      COLLEGE: { PID: 'P69', QUESTION_TEMPLATE: 'Which college did #ITEM go to?' },
      AWARD: { PID: 'P166', QUESTION_TEMPLATE: 'Which of the following awards has #ITEM won?' },
      IMAGE: { PID: 'P18', QUESTION_TEMPLATE: 'Which one of the following is #ITEM?' },
    },
    COUNTRY: {
      INCEPTION: 'P571',
      OFFICIAL_WEBSITE: 'P856',
      ANTHEM: 'P85',
      MOTTO: 'P1546',
      CONTINENT: 'P30',
      CAPITAL: 'P36',
      HIGHEST_POINT: 'P610',
      DEEPEST_POINT: 'P1589',
      HEAD_OF_STATE: 'P35',
      HEAD_OF_GOVERNMENT: 'P1313', // PRIME MINISTER
      CENTRAL_BANK: 'P1304',
      HIGHEST_JUDICIAL_AUTHORITY: 'P209',
      CURRENCY: 'P38',
      SHARES_BORDER_WITH: 'P47',
      MOBILE_COUNTRY_CODE: 'P2258',
      COUNTRY_CALLING_CODE: 'P474',
      EMERGENCY_PHONE_NUMBERS: 'P2852',
    },
    STATE: {
      INCEPTION: 'P571',
      OFFICIAL_WEBSITE: 'P856',
      COUNTRY: 'P17',
      CAPITAL: 'P36',
      LOCATED_IN: 'P131',
      HEAD_OF_STATE: 'P35',
      HEAD_OF_GOVERNMENT: 'P6',
      SHARES_BORDER_WITH: 'P47',
    },
    CITY: {
      INCEPTION: 'P571',
      OFFICIAL_WEBSITE: 'P856',
      COUNTRY: 'P17',
      CAPITAL_OF: 'P1376',
      POSTAL_CODE: 'P281',
      LOCAL_DIALLING_CODE: 'P473',
    },
    ORGANIZATION: {
      INCEPTION: 'P571',
      OFFICIAL_WEBSITE: 'P856',
      IMAGE: 'P18',
    },
    BUSINESS_ENTERPRISE: {
      INDUSTRY: 'P452',
      INCEPTION: 'P571',
      FOUNDER: 'P112',
      CEO: 'P169',
      MOTTO: 'P1546',
      COUNTRY: 'P17',
      AWARD: 'P166',
      PARENT_ORGANIZATION: 'P749',
      SUBSIDIARY: 'P355',
      HEADQUARTER: 'P159',
      OFFICIAL_WEBSITE: 'P856',

    },
    PUBLIC_HOLIDAY: {
      COUNTRY: 'P17',
      DATE: 'P837',
    },
    FILM: {

    },

  },
  // Values to be used as Filters for Generating Questions
  VALUES: {
    INSTANCE_OF: {
      HUMAN: 'Q5',
      CITY: 'Q515',
      COUNTRY: 'Q6256',
      STATE_OF_INDIA: 'Q13390680',
      STATE_OF_UNITED_STATES: 'Q35657',
      BUSINESS_ENTERPRISE: 'Q4830453',
      INVENTION: 'Q18119757',
      PUBLIC_HOLIDAY: 'Q1197685',
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
