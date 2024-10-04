const express = require('express');
const app = express();
const userRoutes = require('./user.routes');

app.use(express.json());
app.use('/api', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});