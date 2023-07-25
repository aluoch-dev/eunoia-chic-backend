import express from "express";

let postsInfo = [
    {
        name:'ownership-001',
        likes: 0,
        comments: []
    },
    {
        name: 'success-001',
        likes: 0,
        comments: []
    },
    {
        name: 'birthday-001',
        likes: 0,
        comments: []
    }
]

const app = express();
app.use(express.json());

app.put('/api/posts/:name/like', (req, res) => {
    const { name } = req.params;
    const post = postsInfo.find(p => p.name === name);
    if(post) {
        post.likes += 1
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