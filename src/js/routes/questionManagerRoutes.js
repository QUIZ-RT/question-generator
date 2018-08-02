const templateService = require('./../services/templateParser');

module.exports = app => {

    app.get('/', function (req, res, next) {
        // document.write('this is we are loading to js');
        // alert('in JS');
        res.render('index');
    });

    app.get('/login', function (req, res, next) {
        // alert('hit route')
        res.render('login');
    });

    app.get('/api/parseTemplate', (req, res) => {
        let subjects = {}
        if(req) {
            let data = req.query.template;
            if(data) {
                subjects = templateService.retrievePotentialSubjects(data);
                if(subjects) {
                    subjects.status = 200;
                }
            }
            subjects.givenTopic = req.query.topic;
        }
        res.json(JSON.stringify(subjects));
    });
}