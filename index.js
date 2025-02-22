const express = require('express')
const json = require('./data.json')
const app = express()
app.use(express.json())
const port = 3000
let a=0;

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
            if(query.latitude != "NA"){
                k.push(json.records[a].officename+": https://www.google.com/maps/search/?api=1&query="+json.records[a].latitude+","+json.records[a].longitude)   
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
    console.log(`Indian Pincode API app listening on port ${3000}`)
})