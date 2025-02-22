const express = require('express')
require("dotenv").config();
const json = require('./data.json')
const app = express()
app.use(express.json())
const port = process.env.PORT || 3000;
let a=0;

app.get("/", (req, res) => {
    res.send(
`
<pre>
Docs

Base URL: pincode.gkp.hackclub.app

GET /pincode
Retrieves a record by pincode.
Query params: pin (required)


GET /office
Retrieves a list of offices by pincode.
Query params: pin (required)


GET /location
Retrieves Google Maps URLs for offices by pincode and latitude.

Query params: pin (required)

POST /office
Retrieves a record by office name.

Request Body: { "officename": "office_name" }
</pre>
`
    )
})

app.get('/pincode', (req, res) => {
    let query = req.query;
    console.log(query.pin)
    for(a=0;a<165298;a++){
        if(query.pin == json.records[a].pincode){
            res.json(json.records[a])
            break;
        }
    }
})

app.get('/office', (req, res) => {
    let query = req.query;
    console.log(query.pin)
    const result=json.records.filter(record=>record.pincode==query.pin)
    res.json(result)
})

app.get('/location', (req, res) => {
    let query = req.query;
    console.log(query.pin)
    let k=[];
    for(a=0;a<165298;a++){
        if(query.pin == json.records[a].pincode){
            if(json.records[a].latitude != "NA"){
                k.push(json.records[a].officename+": https://www.google.com/maps/search/?api=1&query="+json.records[a].latitude+","+json.records[a].longitude)   
            }
            else{
                k.push("Location record not found")
            }
        }
    }
    res.json(k);
})


app.post('/office', (req, res) => {
     for(a=0;a<165298;a++){
             if(req.body.officename == json.records[a].officename){
                res.json(json.records[a])
                break;
             }
}
})

app.listen(port, () => {
    console.log(`Indian Pincode API app listening on port ${port}`)
})