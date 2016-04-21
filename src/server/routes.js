var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var router = express.Router();
var four0four = require('./utils/404')();
var data = require('./data');


router.get('/patients', getPatients);
router.post('/patients/create', createPatient);
router.get('/office/queue', getOfficeQueue);
router.post('/office/queue/add', addOfficeQueue);
router.get('/patient/:id', getPatient);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

function getPatients(req, res, next) {
    res.status(200).send(data.patients);
}

function getPatient(req, res, next) {
    var id = +req.params.id;
    var patient = data.patients.filter(function (p) {
        return p.id === id;
    })[0];

    if (patient) {
        res.status(200).send(patient);
    } else {
        four0four.send404(req, res, 'patient ' + id + ' not found');
    }
}

function getOfficeQueue(req, res, next) {
    res.status(200).send(data.officeQueue);
}

function addOfficeQueue(req, res, next) {
    var patient = req.body;
    data.officeQueue.push(patient);
    res.status(200).end();
}

function createPatient(req, res, next) {
    var patient = req.body;
    patient.id = data.patients.length + 1;
    data.patients.push(patient);
    res.status(200).end();
}
