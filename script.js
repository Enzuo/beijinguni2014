function initialize(){
	initializeMap();
	initializeSchools();
}

var map = false;
function initializeMap() {
    var map_canvas = document.getElementById('map-canvas');
    var map_options = {
        center: new google.maps.LatLng(39.9283, 116.411106),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true
    }
    map = new google.maps.Map(map_canvas, map_options);

}
google.maps.event.addDomListener(window, 'load', initialize);

function initializeSchools(){

	var BIT = new School("Beijing Institute of Technology", "BIT", "bitlogo.png",{lat: 39.959524, lng: 116.316866});
	var BUPT = new School("Beijing University of Posts and Telecommunications", "BUPT", "buptlogo.gif",{lat: 39.962131, lng: 116.357992});
	var BFU = new School("Beijing Forestry University", "BFU", "bfulogo.gif",{lat:40.001279, lng: 116.345461});
	var BITC = new School("Beijing Information Technology College", "BITC", "bitclogo.png",{lat:39.973609, lng:116.482296});
	var CUC = new School("Communication University of China", "CUC", "cuclogo.png",{lat:39.91311, lng: 116.556612},"https://plus.google.com/104717094684201459661/about");
	var BISU = new School("Beijing International Studies University", "BISU", "bisulogo.png",{lat:39.912452, lng:116.562685},"https://plus.google.com/102742676636400139809/about");
	
	var USTB = new School("University of Science and Technology Beijing", "USTB", "ustblogo.png",{lat:39.990208, lng:116.357035},"https://plus.google.com/106221393108419175898/about");
	var BUU = new School("Beijing Union University", "BUU", "buulogo.png",{lat:39.989944, lng: 116.427309});
	var BLCU = new School("Beijing Language and Culture University", "BLCU", "blculogo.png",{lat:39.994589, lng:116.349912});
	var BFSU = new School("Beijing Foreign Studies University", "BFSU", "bfsulogo.png",{lat:39.955527, lng:116.310429},"https://plus.google.com/103497966168044307390/about");
	var CUPL = new School("China University of Political Science and Law", "CUPL", "cupllogo.png",{lat:39.965773, lng:116.35167},"https://plus.google.com/u/0/117639860542490325485/posts","http://www.lawschoolchina.com/");
	var RUC = new School("Renmin University of China", "RUC", "ruclogo.png",{lat:39.969967, lng:116.318518});
	var UIBE = new School("University of International Business and Economics", "UIBE", "uibelogo.png",{lat:39.980409, lng:116.427566});
	var BJUT = new School("Beijing University of Technology", "BJUT", "bjutlogo.png",{lat:39.871688, lng:116.479429});
	var BNU = new School("Beijing Normal University", "BNU", "bnulogo.gif",{lat:39.962188, lng:116.365553});
	var PKU = new School("Peking University", "PKU", "pkulogo.gif",{lat:39.986919, lng: 116.305858});
	var BUAA = new School("Beijing University of Aeronautics and Astronautics", "BUAA", "buaalogo.gif",{lat:39.98322, lng:116.347314});
	var THU = new School("Tsinghua University", "THU", "thulogo.gif",{lat:39.999668, lng:116.326427});
	var CNU = new School("Capital Normal University", "CNU", "cnulogo.gif",{lat:39.930455, lng:116.307661});

}

var selectedSchool = false;
function School(name, shortname, logo, pos){

	this.name = name;
	this.shortname = shortname;
	this.logo = logo;
	this.pos = pos;
	
	this.defaultZIndex = 0;


	this.markerIcon = {
		url: "logo/" + logo,
		scaledSize: new google.maps.Size(48, 48),
		anchor: new google.maps.Point(24, 24)
	};
	
	this.marker = new google.maps.Marker({
		position: new google.maps.LatLng(pos.lat, pos.lng),
		map: map,
		icon : this.markerIcon,
		zIndex : this.defaultZIndex,
		//icon: "logo/" + logo,
		// icon : new google.maps.Icon({
			// size : new google.maps.Size(32,32),
			// url : "logo/" + logo,
		// }),
	});
	//Listener on the marker
	var object = this;
	google.maps.event.addListener(this.marker, 'click', function() {
		object.select();
	});
	
	//Add school in the school list ( school plate )
	this.schoolPlate = new SchoolPlate(this,name,shortname,logo);

}
School.prototype.changeMarker = function( img ){
	if(img)
	{
		this.marker.setIcon(img);
		this.marker.setZIndex(10);
	}
	//No param, reset to default
	else
	{
		this.marker.setIcon(this.markerIcon);
		this.marker.setZIndex(this.defaultZIndex);
	}
}
School.prototype.showLegend = function(){
	var schoolLegend = document.getElementById('school-legend');
	schoolLegend.innerHTML = '<img src="logo/'+this.logo+'"/>';
	schoolLegend.innerHTML += '<h2>'+this.shortname+'</h2>';
	schoolLegend.innerHTML += '<h3>'+this.name+'</h3>';
}
School.prototype.select = function(){
	if(selectedSchool) //Already a selected school, deselect it first
	{	
		selectedSchool.schoolPlate.selected(false);
		selectedSchool.defaultZIndex = 0;
		selectedSchool.marker.setZIndex(0);
	}
	
	this.defaultZIndex = 5;
	this.marker.setZIndex(this.defaultZIndex);
	this.showLegend();
	this.schoolPlate.selected(true);
	selectedSchool = this;
}

var SchoolPlate = function(school, name, shortname, logo){
	var schoolList = document.getElementById('school-list');
	
	this.school = school;
	
	this.plate = document.createElement('DIV'); 
	this.plate.className = "school-plate";
	this.plate.innerHTML = '<img src="logo/'+logo+'"/>';
	this.plate.innerHTML += '<h2>'+shortname+'</h2>';
	this.plate.innerHTML += '<h3>'+name+'</h3>';
	
	schoolList.appendChild(this.plate);
	
	this.eventsSystem();
}
SchoolPlate.prototype.eventsSystem = function(){
	var hoverClass = "active";
	var element = this.plate;
	var object = this;
	this.plate.onmouseover = function(){
		//addClass
		element.className += " "+hoverClass;
		
		//New icon
		var newIcon = {
			url: object.school.markerIcon.url
			};
		newIcon.size = new google.maps.Size(72, 72);
		newIcon.scaledSize = new google.maps.Size(72, 72);
		newIcon.anchor = new google.maps.Point(36, 36)
		object.school.changeMarker(newIcon);
	};
	this.plate.onmouseout = function(){
	
		//removeClass
		element.className =
		   element.className.replace
			  ( /(?:^|\s)active(?!\S)/g , '' )
	
		//Reset icon
		object.school.changeMarker();
	};
	this.plate.onclick = function(){
		//addClass
		object.school.select();
		//element.className += " "+"selected";
	}

}
//TODO transfer Selection system in the school object
//School plate is just a view it's just hilighted or not, when we click on it it's the school we select
SchoolPlate.prototype.selected = function( selected ){
	var schoolList = document.getElementById('school-list');
	
	if(selected){
		this.plate.className += " "+"selected";
		
		//Scroll
		//schoolList.scrollTop(schoolList.scrollTop() + (this.plate.position().top - schoolList.position().top) - (schoolList.height()/2) + (this.plate.height()/2) )
		//this.plate.scrollIntoView(false);
		//schoolList.scrollTo(500,0);
	}
	else
	{
		this.plate.className = this.plate.className.replace( /(?:^|\s)selected(?!\S)/g , '' );
	}
}