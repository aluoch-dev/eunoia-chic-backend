import express from "express";
import { db, connectToDb }  from './db.js'

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors(), express.json());

app.get('/api/posts/:name', async(req, res) => {
    const { name } = req.params;

    const post = await db.collection('posts').findOne({name});

    if(post) {
        res.json(post);
    } else {
        res.sendStatus(404);
    }
});


app.put('/api/posts/:name/like', async(req, res) => {
    const { name } = req.params;

    await db.collection('posts').updateOne({ name }, {
        $inc: { likes: 1 }
    });

    const post = await db.collection('posts').findOne({ name });
    
    if(post) {
        res.send(`The ${name} post now has ${ post.likes} likes!!!`)
    } else {
        res.send(`The post ${name} does not exist!`)
    } 
});

app.post('/api/posts/:name/comments', async(req, res) => {
    const { name } = req.params;
    const { postedBy, commentText } = req.body;

    await db.collection('posts').updateOne({ name }, {
        $push: { comments: { postedBy, commentText }}
    });

    const post = await db.collection('posts').findOne({ name });

    if(post) {
        res.send(post.comments);
    } else {
        res.send(`The post ${name} does not exist!`)
    }
}
);

connectToDb(() => {
    console.log("Successfully connected to db")
    app.listen(8000, () => {
        console.log('Server listening on port 8000');
    })
});
