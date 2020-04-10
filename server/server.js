//loading express
const express = require('express');

//creating instance of express
const app = express();

//loading path
const path = require('path')

//creating port variable for heroku
const port = process.env.PORT || 3000;

//we need to tell express where our app lives and serve that up
const publicPath = path.join(__dirname, '..','public');
console.log(publicPath)
app.use(express.static(publicPath));

//serving index.html for all 404 paths
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath,'index.html'))
})

//start up the server
app.listen(port, ()=>{
    console.log('server is up !!')
})