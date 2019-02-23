'use strict';

const path = require('path');

const gulp = require('gulp');
const ts = require('gulp-typescript');
const wrap = require('gulp-wrap');
const rename = require("gulp-rename");

const templateFilePath = path.join(__dirname, 'templates');

function buildRule(rule) {
    return gulp.src('src/Cognition.ts')
        .pipe(ts({
            // noImplicitAny: true,
            target: "es5",
            module: "none"
        }))
        .pipe(wrap({src: path.join(templateFilePath, rule.templateFile)}))
        .pipe(rename(rule.outputFile))
        .pipe(gulp.dest('rules'));
}

function buildAutoDecision() {
    return buildRule({
        name: 'AutoDecision',
        task: 'build:autoDecision',
        templateFile: 'autoDecision.js',
        outputFile: 'autoDecision.js'
    });
}

buildAutoDecision.description = 'Rule for allowing auto decision by Cognition SDK';
exports.buildAutoDecision = buildAutoDecision;

function buildDecision() {
    return buildRule({
        name: 'Decision',
        task: 'build:decision',
        templateFile: 'decision.js',
        outputFile: 'decision.js'
    });

}

buildDecision.description = 'Rule allowing the override of the auth decision Cognition SDK';
exports.buildDecision = buildDecision;

exports.default = gulp.parallel([
    buildAutoDecision,
    buildDecision
]);
