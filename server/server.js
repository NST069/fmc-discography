const express = require('express');
const app = express();

const cors = require('cors');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const discography = require('./routes/discography');
app.use("/discography", discography);

app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`);
});