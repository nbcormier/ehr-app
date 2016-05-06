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
router.post('/office/queue/update', updateQueue);
router.get('/patient/:id', getPatient);
router.get('/office/feed', getOfficeFeed);
router.post('/office/feed/update', updateFeed);
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

function getOfficeFeed(req, res, next) {
    res.status(200).send(data.officeFeed);
}

function updateQueue(req, res, next) {
    var visit = req.body;
    // remove visit from queue
    for (var key in data.officeQueue) {
        var found = false;
        // array of visits in state
        var state = data.officeQueue[key];
        for (var j = 0; j < state.length; j++) {
            var v = state[j];
            if (v.patient.id === visit.patient.id) {
                state.splice(j, 1);
                found = true;
                break;
            }
        }
        if (found) {
            data.officeQueue[key] = state;
            break;
        }
    }
    // add visit to the correct queue
    data.officeQueue[visit.status].push(visit);
    res.status(200).end();
}

function updateFeed(req, res, next) {
    var event = req.body;
    data.officeFeed.push(event);
    res.status(200).end();
}

function createPatient(req, res, next) {
    var patient = req.body;
    patient.id = data.patients.length + 1;
    data.patients.push(patient);
    res.status(200).end();
}
