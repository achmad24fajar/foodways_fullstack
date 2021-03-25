const express = require('express')

const router = require('./src/route')

const app = express();

const PORT = process.env.PORT || 5000

app.use(express.json())

app.use('/api/v1', router)

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))