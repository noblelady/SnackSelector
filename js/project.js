//checks if the browser is old
if( document.getElementById && document.attachEvent)
{
  //modern IE
  var b='modernIE';
}else if(document.getElementById){
  var b='gecko';
}else{
  alert("Update your browser!!!");
  window.location="firefox.com";
}


var data = new Object();
data['init']=["Sweet","Salty"];
data['Sweet']=['Crunchy','Soft'];
data['Salty']=['Healthy','Junk Food'];
data["Crunchy"]=["Roasted","Raw"];
data["Soft"]=["Liquid","Solid"];
data["Healthy"]=["Low-calorie","Low-sodium"];
data["Junk Food"]=["Heavy","Light"];

var result=new Object();
result["Roasted"]=["Honey Roasted Nuts"];
result["Raw"]=["Apple"];
result["Liquid"]=["Yogurt"];
result["Solid"]=["Jello"];
result["Low-calorie"]=["Popcorn"];
result["Low-sodium"]=["Trailmix"];
result["Heavy"]=["French Fries"];
result["Light"]=["Potato Chips"];

// var data = {
// "sweet":["crunchy","soft"],
// "salty":["healthy','junk food"],
//   "crunchy":["roasted","mild"],
//   "soft":["liquid","solid"],
//   "healthy":["low-calorie","low-sugar"],
//   "junk food":["heavy","light"]
// }
//crunchy, soft, healthy, junk food, cold, warm, room temp,

//dom returns option tag entirely
//dom.value returns the option's value
function createSelection(dom){
  //checks if there is more than 1 option within the dataset cause if there
  //is then it means that it is at the end of the datasets
  if(dom=='init'){
    var hold=data[dom];
    //first run
  }else{
    var hold=data[dom.value];
    //all others
    //removal code here...
    //removes the first option if it is the "Select One!"
    if(dom.firstChild.value == "selectOne"){
      dom.removeChild(dom.firstChild);
    }
    while(dom.parentNode != dom.parentNode.parentNode.lastChild){
      dom.parentNode.parentNode.removeChild(dom.parentNode.parentNode.lastChild);
    }
  }

  if(hold != undefined){
    //removes any other drop downs from the div container
    //console.log(dom.parentNode);
    var container = document.getElementById('selects');
    //create div for prettiness
    var selDiv = document.createElement('div');
    selDiv.setAttribute('class','selection');
    selDiv.setAttribute('onload','moveDown(this)');
    var choiceSel = document.createElement('select');
    choiceSel.setAttribute('class','selectionIn');
    //onchange is going to fail in IE7
    //second arg can NOT be a string...
    choiceSel.setAttribute('onchange','createSelection(this)');
    //the first option is always Select one so that the on change can work and it acts like the title.
    var optS = document.createElement('option');
    optS.setAttribute('value','selectOne');
    optS.appendChild(document.createTextNode("Select One Below!"));
    choiceSel.appendChild(optS);

    //adding in the other options
    for(var i=0;i<hold.length;i++){
      var opt = document.createElement('option');
      var oVal = hold[i];
      //console.log(oVal);
      opt.setAttribute('value', oVal);
      opt.setAttribute('id', oVal);
      opt.appendChild(document.createTextNode(oVal));
      choiceSel.appendChild(opt);
    }
    //put in div
    selDiv.appendChild(choiceSel);
    //keeps it hidden then has it move??
    //put on page
    container.appendChild(selDiv);
    //selDiv.style.display = "none";
  }else{
    //console.log(hold);
    showForm();
    finalSelection(result[dom.value]);
  }
}
function checkCookieStorage(dom){
  if(window.localStorage){
    saveToStorage();
  }else{
    saveToCookie();
  }
}

function saveToStorage(dom1,dom2){
  //get the current selections from the page and save them to local storage
  if(window.localStorage){ //check to see if browser understands local storage
    for(var key in localStorage)
    {
      console.log(key + " | " + localStorage[key]);
    }
    if(dom1 || dom2)
    {
      localStorage.setItem('fname',dom1);
      localStorage.setItem('lname',dom2);
    }
    if(localStorage.getItem('fname')){
      document.getElementById('fname').value = localStorage.getItem('fname');
    }
    if(localStorage.getItem('lname')){
      document.getElementById('lname').value = localStorage.getItem('lname');
    }
  }
}
function showForm(){
  //alert("showing the form.");
  document.getElementById("form").style.display = "block";
  //use this to get all selections
  var finalSelects = document.getElementsByTagName("select");
  //this string holds the selction info
  var strInfo = "";
  for(var i=0;i<finalSelects.length;i++){
    //console.log(finalSelects[i]);
    var tempStr = finalSelects[i].options[finalSelects[i].selectedIndex].value +" ";
    strInfo = strInfo + tempStr;
    //console.log("newString: "+strInfo);
  }
  document.getElementById('finResults').appendChild(document.createTextNode("You want something "+strInfo));
}
function finalSelection(choice){
  var resultSel = document.createElement('h2');
  resultSel.setAttribute("id","finalResult");
  resultSel.appendChild(document.createTextNode(choice+""));

  var oneInForm = document.getElementById("finResults");
  insertAfter(resultSel, oneInForm);
}
function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
//these take in an element to move.
function validateName(){
  var fname = document.getElementById("fname");
  var lname = document.getElementById("lname");
  var ret=true;

  if(fname.value == "")
  {
    //alert("Please enter your name!");
    fname.style.backgroundColor="red";
    ret=false;
  }else{
    //turn fname back from red
    fname.style.backgroundColor="";
  }
  if(lname.value == "")
  {
    //turn lname red
    lname.style.backgroundColor="red";
    ret=false;
  }else{
    lname.style.backgroundColor="";
  }
  //console.log(fname.value+lname.value);
  saveToStorage(fname.value,lname.value);
  saveToCookie(fname.value,lname.value);
  return ret;
}
function saveToCookie(dom1,dom2){
  if(dom1 || dom2)
  {
    SetCookie("fname",dom1);
    SetCookie("lname",dom2);
  }
  if(GetCookie("fname")){
    document.getElementById('fname').value = GetCookie("fname");
  }
  if(GetCookie('lname')){
    document.getElementById('lname').value = GetCookie('lname');
  }
}
var today = new Date();
//expires in a year....
var expiry = new Date(today.getTime() + 365 * 24 * 60 * 60 * 1000);

function getCookieVal (offset) {
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1) { endstr = document.cookie.length; }
	return unescape(document.cookie.substring(offset, endstr));
}

function GetCookie (name) {
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen) {
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg) {
			return getCookieVal (j);
			}
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) break;
		}
	return null;
}

function DeleteCookie (name,path,domain) {
	if (GetCookie(name)) {
		document.cookie = name + "=" +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		"; expires=Thu, 01-Jan-70 00:00:01 GMT";
		}
}

function SetCookie (name,value,expires,path,domain,secure) {
  document.cookie = name + "=" + escape (value) +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : "");
}
