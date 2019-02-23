'use strict';

const _ = require('lodash');

const request = jest.genMockFromModule('request');

const body = {
    "decision": "allow",
    "score": _.random(-200, 200),
    "confidence": _.random(0, 100),
    "signals": [
        "test",
        "test2"
    ]
};

const res = {
    statusCode: 200
};

request.__UPDATE_RESPONSE = (code) => {
    res.statusCode = code;
};
request.__UPDATE_BODY = (decision) => {
    body.decision = decision;
};

request.post = jest.fn((options, cb) => cb(null, res, body));

module.exports = request;