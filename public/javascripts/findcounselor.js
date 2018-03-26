const data = {
	pagetoken: "",
	lat: "22.530889",
	lon: "88.383418"
}
$(document).ready(()=>{
	$('#find_counselor').on('click',searchCounselor);
	$('#next_page').on('click',searchCounselor);
	getLocation();
});

function searchCounselor(){
	let keywords = getKeywords();
	clearKeyword();
	getCounselorDataFromApi(keywords);
}

function clearKeyword(){
	$('#keywords').val("");
}

function getKeywords(){
	return $('#keywords').val();
}

function resetSearch(){
	data.pagetoken = "";
	$('#results').text("");
}

function getCounselorDataFromApi(keywords){
	if(keywords != "")
		resetSearch();

	$.post(window.location, 
		{
			'location': data.lat+','+data.lon,
	 		'pagetoken': data.pagetoken,
	 		'keyword': keywords
	 	},
	 response=>{
		displayNextButton();		
		setNextPageToken(response.next_page_token)
		response.results.map(result=>
			$('#results').append(generateHtmlCodeForResult(result))
		);
	});
}


function displayNextButton(){
	$('#next_page').css('display','block');
}

function setNextPageToken(token){
	data.pagetoken = token;
}

function formatDetailsOfResult(obj){
	let geometry = obj.geometry;
	let icon = obj.icon;
	let name = obj.name;
	let id = obj.id;
	let vicinity = obj.vicinity;
	let open_now = ( obj.opening_hours === null
		 || obj.opening_hours === "null" 
		 ||  obj.opening_hours === "undefined" 
		 ||  obj.opening_hours === undefined) ? 'Unknown' : obj.opening_hours.open_now;

	return {icon, name, id, vicinity, open_now};
}

function generateHtmlCodeForResult(data){
	let code = "<section class='container-fluid'><div class='row'>";
	code += "<div class='col-sm-12'><h3><i class='fas fa-ambulance'></i> &nbsp;"+data.name+"</h3></div>";
	code += "</div><div>";
	code += "<b>Vicinity</b><br><div>" + data.vicinity + "</div>";
	code += "</div></section><br><br>";

	return code;
}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
        	data.lat = position.coords.latitude;
        	data.lon = position.coords.longitude;
        });
    }
    else{
    	console.log('your browser does not support geolocation');
    }
}
