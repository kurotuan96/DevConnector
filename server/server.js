const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path')

const userRoute = require('./routes/api/user');
const authRoute = require('./routes/api/auth');
const profileRoute = require('./routes/api/profile');
const postRoute = require('./routes/api/post');

const app = express();

// Connect Database
connectDB();

app.use(cors());

// Init Middleware
app.use(express.json({ extended: false }));


// Define Routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/profile', profileRoute);
app.use('/api/posts', postRoute);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client-vue/dist'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client-vue', 'dist', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports.handler = app
