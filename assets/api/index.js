const express = require('express');
const app = express();
const userRoutes = require('./routes/users');

app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Serving at http://192.168.1.200:${PORT}`));