const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://trusted.cdn.com"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
    }
}));

app.get("/article=debian", (req, res) => {
    res.send("Article sur debian");
});

app.get("/article=buntu", (req, res) => {
    res.send("Article sur Ubuntu");
});

app.listen(3000, () => {
    console.log("listening on http://localhost:3000");
});
