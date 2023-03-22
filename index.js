import express, { response } from 'express'
import cors from 'cors'
import axios from 'axios'
const app = express()

const port = process.env.PORT || 8080

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
}
app.use(cors(corsOptions))

app.get('/', (req, res) => {
    res.send('Hello')
})

app.get("/:name", (req, res) => {
    axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${req.params.name}`)
        .then((response) => {
            if (response?.data?.length !== 0) {
                res.send(response.data[0].meanings[0].definitions[0])
            } else {
                res.send('Meaning not found')
            }
        })
        .catch((error) => {
            console.log(error)
        })
})

app.listen(port, () => {
    console.log(`zback is running on port: ${port}`)
})