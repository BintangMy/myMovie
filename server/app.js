const express = require('express')
const app = express()
const port = 3000
const routes = require("./routes/index")
const cors = require('cors')
let {handleError} = require("./middlewares/handleError")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', routes)
app.use(handleError)




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})