const express = require('express')
require("dotenv").config();
const json = require('./data.json')
const app = express()
app.use(express.json())
const port = process.env.PORT || 3000;
let c=0;

app.get("/", (req, res) => {
    res.send(
`
<pre>
Docs

Base URL: pincode.gkp.hackclub.app

GET /latitude&longitude
Retrieves a record by latitude and longitude of the place.
Query params: lat,long (required)

GET /pincode
Retrieves a record by pincode.
Query params: pin (required)


GET /office
Retrieves a list of offices by pincode.
Query params: pin (required)


GET /location
Retrieves Google Maps URLs for offices by pincode and latitude.

Query params: pin (required)

POST /location
Retrieves a record by office name.

Request Body: { "officename": "office_name" }

POST /office
Retrieves the delivery status of the office by the office name.

Request Body: { "officename":"office_name" }
</pre>
`
    )
})

app.get('/latitude&longitude',(req,res)=>{
    let query = req.query;
    console.log(query.lat,query.long)
    for(a=0;a<165298;a++){
        if(typeof(query.lat)!=number||typeof(query.long)!=number){
            res.json("The data entered is incorrect please input the correct type of data")
            c++;
            break;
        }
        if(query.lat.tofixed(3)==json.records[a].latitude.tofixed(3) && query.long.tofixed(3)==json.records[a].longitutde.tofixed(3)){
            res.json(json.records[a])
            c++;
            break;
        }
    }
    if(c==0){
        res.json("No records for this place place found please try different latitude and longitude")
    }
})

app.get('/pincode', (req, res) => {
    let query = req.query;
    console.log(query.pin)
    for(a=0;a<165298;a++){
        if(typeof(query.pin)!=number){
            res.json("Wrong data input please input the correct data and Try Again")
            break;
        }
        if(query.pin == json.records[a].pincode){
            res.json(json.records[a])
            break;
        }
    }
})

app.get('/office', (req, res) => {
    let query = req.query;
    console.log(query.pin)
    if(typeof(query.pin)!=number){
        res.json("The type of data netered is wrong please input correct data and Try Again")
    }
    else{
    const result=json.records.filter(record=>record.pincode==query.pin)
    res.json(result)
    }
})

app.get('/location', (req, res) => {
    let query = req.query;
    console.log(query.pin)
    let k=[];
    for(a=0;a<165298;a++){
        if(typeof(query.pin)!=number){
            k.push("The type of data entered is incorrect please enter correct data and Try Again")
            break;
        }
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


app.post('/location', (req, res) => {
     for(a=0;a<165298;a++){
            if(typeof(req.body.officename) != string){
                res.json("The type of input is wrong please correct the type of input and Try Again")
                break;
            }
             if(req.body.officename == json.records[a].officename){
                res.json(json.records[a])
                break;
             }
}
})

app.post('/office',(req,res)=>{
    for(a=0;a<165298;a++){
        if(typeof(req.body.officename) != string){
            res.json("The type of data entered is wrong please input correct data and Try Again");
            break;
        }
        if(req.body.officename == json.records[a].officename){
            res.json(json.records[a].delivery)
        }
    }
})

app.listen(port, () => {
    console.log(`Indian Pincode API app listening on port ${port}`)
})