
var indexAreasL   = [ [ "indexHeader", 0,0,550,50 ], [ "indexContent", 0,50,550,270 ] ]
var indexAreasP   = [ [ "indexHeader", 0,0,320,50 ], [ "indexContent", 0,50,320,430 ] ]
var indexFontSizes= [ [ "h1", 30 ], [ "td", 18 ], [ "input", 16 ] ];
var indexHeights  = [ [ "img", 40 ], [ "input", 25 ] ];

var oddRowColour	= "#EEE8AA";
var evenRowColour	= "#FAFAD2";

$(document).ready(function()    { setupIndexDisplay(); })
$(window).resize(function () { resizeIndexPage(); });

function setupIndexDisplay() {
   displaySubjectRows();
   resizeIndexPage();
   colourAlternateSubjectRows();
   allowReorientation();
}

function resizeIndexPage() {
    resizePage("indexPage", indexAreasL, indexAreasP, indexFontSizes, indexHeights, false);
}

function allowReorientation() {
    window.addEventListener('orientationchange', resizeIndexPage, false);
}

function displaySubjectRows() {  // append to existing dummy row
	for (var i=0; i<subjectInfo.length; i++)
		$("#indexTable tr:last").after(makeSubjectRow(i));
}

function makeSubjectRow(i) {
	return "<tr onclick='runSubject(\"" + subjectInfo[i][0].toString() + "\",\"" + subjectInfo[i][5].toString() + "\" )'>"
	+ "<td>" + subjectInfo[i][6].toString() + "</td>"
	+ "<td><img src='" + subjectInfo[i][7].toString() + ".jpg' /></td>"
	+ "</tr>";
}

function runSubject(subjectName, arrayName) {
   location.href = "main.html?s=" + subjectName + "&a=" + arrayName;
}

function colourAlternateSubjectRows() {
	$("#indexTable tr:odd").css("background-color", oddRowColour);
	$("#indexTable tr:even").css("background-color", evenRowColour);
}

function showIntro() {
   location.href="intro.html";
}
 
