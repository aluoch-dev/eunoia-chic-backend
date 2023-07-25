import express from "express";

const app = express();
app.use(express.json());

app.get('/hello', (req, res) => {
    res.send('Hello!');
})

app.post('/hello-name', (req, res) => {
    res.send(`Hello ${req.body.name}!`);
})

app.listen(8000, () => {
    console.log('Server listening on port 8000');
})