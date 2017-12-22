const express = require('expres');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
	res.json({
	message: 'Welcome to the API'
})
});


const PORT = 5000
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`);)