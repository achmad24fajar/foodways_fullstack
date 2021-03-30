const express = require('express')

const router = require('./src/route')
const cors = require("cors");
var bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/v1', router)
app.use("/uploads", express.static("uploads"));
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))