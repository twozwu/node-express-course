const express = require('express');
const app = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//middleware
app.use(express.static('./public'))
app.use(express.json())

//routes
app.get('/hello', (req, res) => {
    res.send('task manager')
})

app.use('/api/v1/tasks', tasks)
app.use(notFound) //要放在api後面，否則會先進入notFound
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI) //連線DB成功之後才啟動服務器
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        })
    }catch(err) {
        console.log(err);
    }
}

start()