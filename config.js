/*global process*/
var config = {};

config.ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
config.port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

module.exports = config;