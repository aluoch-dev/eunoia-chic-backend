import express from "express";

let postsInfo = [
    {
        name:'ownership-001',
        likes: 0
    },
    {
        name: 'success-001',
        likes: 0
    },
    {
        name: 'birthday-001',
        likes: 0
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


app.listen(8000, () => {
    console.log('Server listening on port 8000');
})