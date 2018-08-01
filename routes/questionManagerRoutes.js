const templateService = require('./templateParser');

module.exports = (app) => {
  app.get('/', (req, res) => {
    // document.write('this is we are loading to js');
    // alert('in JS');
    res.render('index');
  });

  app.get('/login', (req, res) => {
    // alert('hit route')
    res.render('login');
  });

  app.get('/api/parseTemplate', (req, res) => {
    let subjects = {};
    if (req) {
      const data = req.query.template;
      if (data) {
        subjects = templateService.retrievePotentialSubjects(data);
        if (subjects) {
          subjects.status = 200;
        }
      }
    }
    res.json(JSON.stringify(subjects));
  });
};
