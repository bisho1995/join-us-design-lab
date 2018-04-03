const router = require('express').Router();
var request = require('request');


var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=5000&type=physiotherapist&key=AIzaSyDJ4HQrwh2L_J3Zc1W2jQC88K4-TU8TJws&location=';

router.get('/', (req, res, next)=>{
	res.render('clientdashboard/find_counselor');
});

router.post('/', (req, res, next)=>{

	let _url = url + getLocation(req.body.location);
	_url = _url + '&pagetoken=' + getPageToken(req.body.pagetoken);
	_url = _url + '&keyword=' + getKeyword(req.body.keyword);
	getPlacesDataFromGoogle(_url)
		.then(data=>res.json(data))
		.catch(err=>res.json(err));
	
});


function getKeyword(keyword){
	return (keyword === null || keyword === "null" || keyword === undefined || keyword === "undefined" || keyword === "") ? '' : keyword;
}

function getPageToken(token){
	return (token === null || token === "null" || token === undefined || token === "undefined" || token === "") ? '' : token;
}

function getPlacesDataFromGoogle(_url){
	return new Promise((resolve, reject)=>{
		request(_url, (err, resp, body)=>{
			if(err){
				reject(err);
			}
			else{
				resolve(JSON.parse(body));
			}
		});
	});
}


function getLocation(loc){
	return (loc === null || loc === "null" || loc === undefined || loc === "undefined" || loc === "") ? '22.530889,88.383418' : loc;
}

module.exports = router;