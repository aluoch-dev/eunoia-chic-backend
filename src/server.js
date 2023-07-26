import express from "express";
import { MongoClient } from "mongodb";

const app = express();
app.use(express.json());

app.get('/api/posts/:name', async (req, res) => {
    const { name } = req.params;

    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('eunoia-chic-db')

    const post = await db.collection('posts').findOne({name});

    if(post) {
        res.json(post);
    } else {
        res.sendStatus(404);
    }
});


app.put('/api/posts/:name/like', async (req, res) => {
    const { name } = req.params;

    const client = new MongoClient("mongodb://127.0.0.1:27017");
    await client.connect();

    const db = client.db('eunoia-chic-db');
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

app.post('/api/posts/:name/comments', (req, res) => {
    const { name } = req.params;
    const { postedBy, commentText } = req.body;

    const post = postsInfo.find(p => p.name === name)

    if(post) {
        post.comments.push( { postedBy, commentText })
        res.send(post.comments);
    } else {
        res.send(`The post ${name} does not exist!`)
    }
}
);


app.listen(8000, () => {
    console.log('Server listening on port 8000');
})