const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
let LOCALHOST = '0.0.0.0'
const cors = require('cors')

var bodyParser = require('body-parser')

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(cors())

mongoose.connect('mongodb://localhost:27017/test');

const Researcher = mongoose.model
(
    'Researcher',
    {
        name: String,
        department: String,
        boss: String
    }
);


/*const researcher = new Researcher(
    {
        name: 'Max Mustermann',
        department: 'IPMT',
        boss: "Lödding"
    }
);*/

/*researcher.save().then(() => console.log('Max Mustermann is saved'));

 */

app.get('/researchers', (req, res) => {
    Researcher.find({}, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            let researchersObject = {
                researchers_root: result
            }
            res.send(researchersObject)
        }
    })
})

app.post('/addresearcher', (req, res) => {
    let name = req.body.name;
    let boss = req.body.boss;
    let department = req.body.department;

    const entry = new Researcher(
        {
            name: name,
            boss: boss,
            department: department,
        }
    );
    entry.save().then(() => console.log('Max Mustermann is saved'));
    res.send("your entry has been saved")
})

app.delete('/deleteresearcher', async (req,res) => {
    try {
        //await Researcher.deleteOne({ _id: req.body.id })
       // await Researcher.deleteOne({ name: req.body.name })
         await Researcher.deleteOne({ name: "Finn" })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Post doesn't exist!" })
    }
    console.log('Log 2: Researcher has been deleted.')
    res.send("Researcher has been deleted.")
})

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/ipmt', (req, res) => res.send('Welcome to IPMT TUHH!!'))

app.listen(port, LOCALHOST, ()=> console.log("listening at http://localhost:3000"));
