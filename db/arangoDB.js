const arangojs = require('arangojs');
const { arangoKey } = require('./config');

const db = new arangojs.Database();

db.useDatabase('rooms');
db.useBasicAuth('root', `${arangoKey}`);
