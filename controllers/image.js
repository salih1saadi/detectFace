
const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '70a09e5088604ee9b6fd9e710d0a33d3'
});

const handleApiCall = (req,res) =>{

app.models
.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
.then(data => {
	res.json(data);
})
.catch(err => res.status(400).json('unable to work with api'))

}

//const recognizeApiCall = (req,res) =>{

//app.models
//.predict(Clarifai.CELEBRITY_MODEL, req.body.input)
//.then(data => {
//	res.json(data);
//})
//.catch(err => res.status(400).json('unable to work with api'))

//}



const handleImage = (req, res, db) =>{

const { id } = req.body;

db('users').where('id','=', id)
.increment('entries', 1)
.returning('entries')
.then(entries => {

	res.json(entries[0]);

})
.catch(err => res.status(400).json('unable to get entries'))

}
module.exports = {
	handleImage,
	handleApiCall,
	recognizeApiCall
};