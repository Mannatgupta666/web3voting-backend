const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;  // Railway might use a dynamic port

app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Keep it alive
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
