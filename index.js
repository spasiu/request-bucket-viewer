const bodyParser = require('body-parser');
const express = require('express');

const payloads = {};

express()
    .use(bodyParser.json())
    .post('/:id', (req, res) => {
        if (!payloads[req.params.id]) {
            payloads[req.params.id] = [];
        }

        payloads[req.params.id].push(req.body);
        res.end();
    })
    .get('/:id', (req, res) => {
        if (payloads[req.params.id]) {
            res.send(payloads[req.params.id].reverse());
            return;
        }

        res.send('No events sent recently to POST https://request-bucket-viewer.herokuapp.com/' + req.params.id);
    })
    .get('/', (req, res) => {
        res.send(`
            <h2>What it is</h2>
            <p>View request payloads bucketed by IDs.</p>
            <h3>How to use it</h3>
            <p>Use something like <a href="https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa">JSON Formatter</a> in chrome to view formatted JSON.</p>
            <p>Point your request at <i>https://request-bucket-viewer.herokuapp.com/{your_id}</i>.</p>
            <p>When you visit <i>https://request-bucket-viewer.herokuapp.com/{your_id}</i> in the browser you will see a list of events bucketed by id.</p>
        `);
    })
    .listen(process.env.PORT || 7777);