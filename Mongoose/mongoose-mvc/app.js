const express = require('express');
const api = require('./controller/api');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('./static'));

app.get('/', api.insert);
app.get('/draft', api.draftInsert);
app.get('/find', api.draftFind);
app.get('/update', api.draftUpdate);

app.listen('3000', '127.0.0.1');

