
var introAreasL   = [ [ "introHeader", 0,0,550,50 ], [ "introContent", 0,50,550,270 ] ]
var introAreasP   = [ [ "introHeader", 0,0,320,50 ], [ "introContent", 0,50,320,500 ] ]
var introFontSizes= [ [ "h1", 30 ], [ "p", 18 ], [ "input", 20 ] ];
var introHeights  = [ [ "img", 40 ], [ "input", 35 ] ];

$(document).ready(function(){0
   window.addEventListener('resize', resizePage, false);
   //window.addEventListener('orientationchange', orientPage, false);
   resizePage();
})

// function sizeUI(pageName, landscapeArray, portraitArray, fontSizeArray, heightArray)
function resizePage()   { sizeUI("introPage", introAreasL, introAreasP, introFontSizes, introHeights) }
function orientPage()   { sizeUI("introPage", introAreasL, introAreasP, introFontSizes, introHeights) }

function showIndex()    { 
   // subjectName setup is redundant after switch to generating distinct apps
      
//	var locationString = location.toString();
//	var n = locationString.indexOf("=")+1;
//	subjectName = locationString.substring(n);   // into globals
//	alert("subjectName=" + subjectName);
// location.href="index.html?d=" + subjectName; 
   location.href="index.html"; 
}



 