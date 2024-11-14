const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 

const userRouter = require('./router/userRouter');
const todoRouter = require('./router/todoRouter');

const app = express();
app.use(express.json());
app.use(cors());


const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('DB Connected!');
})
.catch((err) => {
    console.error('Database connection error:', err);
});

app.use('/api', userRouter);
app.use('/api/tasks', todoRouter);

const PORT = process.env.PORT || 8000;  
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
}); 