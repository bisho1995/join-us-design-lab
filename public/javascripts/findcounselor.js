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
			$('#results').append(generateHtmlCodeForResult(formatDetailsOfResult(result)))
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

	return {icon, geometry, name, id, vicinity, open_now};
}

function generateHtmlCodeForResult(data){
	let code = "<section class='container-fluid block_content'><div class='row'>";
	code += "<div class='col-sm-12'><h3 class='names'><i class='fas fa-ambulance'></i> &nbsp;"+data.name+"</h3></div>";
	code += "</div><div class='row'>";
	code += "<div class='col-md-8'><br><b>Vicinity</b><br><div>" + data.vicinity + "</div></div>";
	code += "<div class='col-md-4'><img class='mapImage' src="+generateStaticMapUrl(data.geometry.location.lat, data.geometry.location.lng)+"></div>"
	code += "</div></section><br><br>";

	return code;
}

function generateStaticMapUrl(lat, long){
	return "https://maps.googleapis.com/maps/api/staticmap?center="+lat+","+long+"&zoom=13&size=300x300&maptype=roadmap&markers=color:red%7Clabel:C%7C" + lat + "," + long + "&key=AIzaSyDCWiP95dxTy4FhogPfXO4et6STcZIZIA4";	
}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position=>{
        	data.lat = position.coords.latitude;
        	data.lon = position.coords.longitude;
        },err=>{
        	 switch(err.code) {
		        case err.PERMISSION_DENIED:
		            alert('Hey we need your location to suggest you counselors near you. Shall we try again ?');
					getLocation();		            
		            break;
		        case err.POSITION_UNAVAILABLE:
		            alert('We cannot get your position for some reason, unfortunately we wont be able to provide you the best features.');
		            break;
		        case err.TIMEOUT:
		        	alert();	
		            break;
		        case err.UNKNOWN_ERROR:
		            alert('There was a problem with getting the location.');
		            break;
		    }
        });
    }
    else{
    	console.log('your browser does not support geolocation');
    }
}




//https://maps.googleapis.com/maps/api/staticmap?center=22.530889,88.383418&zoom=13&size=300x300&maptype=roadmap&markers=color:red%7Clabel:C%7C22.530889,88.383418&key=AIzaSyDCWiP95dxTy4FhogPfXO4et6STcZIZIA4