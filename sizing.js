// consts, for app with nominal size 320 x 550px
var appPortraitW2H = 320/550;
var appLandscapeW2H = 550/320;
var minFactor = 0.5;
var maxFactor = 2;
var fullness = 0.98;

// vars
var initialPortraitWidth = 320;
var initialLandscapeWidth = 550;
var windowWidthToHeight = 1;
var isReoriented = false;
var isSized = false;
var isLandscape = false;
var path = "";
var scalingFactor = 1;
var windowWidth = 0;
var windowHeight = 0;
var appWidth = 0, appHeight = 0;

function resizePage(div, areasL, areasP, fontSizes, heights, hasSpecialItems) {
    // params for sizeUI(pageName, landscapeArray, portraitArray, fontSizeArray, heightArray, special-action for main page)
    var wasLandscape = isLandscape;
    getWindowDimensions();
    isReoriented = (wasLandscape != isLandscape);
    if (isSized && !isReoriented)
        return;
    //clearLog();
    resizeActual(div, areasL, areasP, fontSizes, heights, hasSpecialItems);
}

function resizeActual(div, areasL, areasP, fontSizes, heights, hasSpecialItems) {
    sizeUI(div, areasL, areasP, fontSizes, heights);
    isSized = true;
    if (!hasSpecialItems)
        return;
    adjustSpecialItems();
    if (isMapList) {
        positionMapAndAnswerButtons();
        placeMapSpots();
    }
    else
        setAnswerMarginsForTextAnswers();
    removeExcessPageHeight();
}

function setAnswerMarginsForTextAnswers() {
    $("#mainList li").css("float", "none").css("margin", "10px 0px");
}

function sizeUI(pageName, landscapeArray, portraitArray, fontSizeArray, heightArray) {
    $("#divBlack").show();
	adjustAppDimensions(pageName);
	scaleDisplayItems(landscapeArray, portraitArray);
	sizeItemFonts(fontSizeArray);
	sizeItemHeights(heightArray);
	centrePage($("#" + pageName), windowWidth, appWidth);
    $("#divBlack").hide();
}

function scaleDisplayItems(landscapeArray, portraitArray) {
	if (isLandscape)
	    scaleItems(appWidth, initialLandscapeWidth, landscapeArray);
	else {  // portrait
	    scaleItems(appWidth, initialPortraitWidth, portraitArray);
	    if (isMapList)
	        adjustMapWidth();
	}
}

function getWindowDimensions() {
	windowWidthToHeight = 1;		// to be approx 320/550 or vice versa
	windowWidth = $(window).width();
	windowHeight = $(window).height();
	windowWidthToHeight = windowWidth / windowHeight;
	isLandscape = (windowWidthToHeight > 1);
}

function adjustAppDimensions(pageName) {
	if (isLandscape)
		calculateLandscapeDimensions();
	else	
		calculatePortraitDimensions();
	$($("#" + pageName)).css("width", appWidth).css("height", appHeight);
}

function calculateLandscapeDimensions() {
	// check if actual window ratio exceeds app ratio
	if (windowWidthToHeight > appLandscapeW2H )
		adjustAppByHeight("LH", appLandscapeW2H);
	else
		adjustAppByWidth("LW", appLandscapeW2H);
}

function calculatePortraitDimensions() {
	if (windowWidthToHeight > appPortraitW2H )
		adjustAppByHeight("PH", appPortraitW2H);
	else
		adjustAppByWidth("PW", appPortraitW2H);
}

function adjustAppByHeight(pathCode, w2h) {
	path = pathCode;
	appHeight = windowHeight * fullness;
	appWidth = appHeight * w2h;
}

function adjustAppByWidth(pathCode, w2h) {
	path = pathCode;
	appWidth = windowWidth * fullness;
	appHeight = appWidth / w2h;
}

function scaleItems(appWidth, initialWidth, scalingArray) {
    log("scI");
    scalingFactor = setScalingFactor(appWidth, initialWidth)
	sizeItems(scalingArray);
}

function centrePage(appArea, windowWidth, appWidth) {
    if (windowWidth <= appWidth)
        return;
	var margin = ( windowWidth - appWidth ) / 2.0;
	var newLeft = margin;
	$(appArea).css("left", margin);
}

function removeExcessPageHeight() {
    log("rExPH");
    adjustDivHeight("divAnswersList", "li3", 0, 0.01);            // khaki
    adjustDivHeight("divAnswers", "divAnswersList", 0, 0.01);      // #393
    putDivBelow("divDebug", "divAnswers", 10);
    adjustDivHeight("divMainContent", "divDebug", 0, 0);      // yellow
    adjustDivHeight("divMainPage", "divMainContent", 0, 0);       // pink
    adjustDivHeight("divOverall", "divMainPage", 0, 0);           // red
}

function adjustDivHeight(divToCheck, innerDiv, andDebug, extraHeight) {
    var bottomToCheck = $("#" + divToCheck).outerHeight();
    var topMatch = $("#" + innerDiv).position().top;
    var heightMatch = $("#" + innerDiv).height();
    var bottomToMatch = (topMatch + heightMatch) * (1.0 + extraHeight);

    if(andDebug==1)
        alert("check, \ndivToCheck=" + divToCheck + ", divToBeMatched=" + innerDiv
                + ", bottomToCheck=" + bottomToCheck
                + ", \ntopMatch=" + topMatch
                + ", heightMatch=" + heightMatch
                + ", bottomToMatch=" + bottomToMatch);

    //if (bottomToCheck > bottomToMatch) {
        var newHeight = bottomToMatch;
        if (newHeight > 0)
            $("#" + divToCheck).css("height", newHeight + "px");
        //alert("reducing, \ndivToCheck=" + divToCheck + ", divToBeMatched=" + innerDiv
        //        + ", bottomToCheck=" + bottomToCheck
        //        + ", \ntopMatch=" + topMatch
        //        + ", heightMatch=" + heightMatch
        //        + ", bottomToMatch=" + bottomToMatch
        //        + ", newHeight=" + newHeight
        //        + ", \nresult=" + $("#" + divToCheck).css("height"));
    //}
}

function putDivBelow(div, belowThisDiv, gap) {
    var divAbove = $("#" + belowThisDiv);
    var newDivTop = $(divAbove).position().top + $(divAbove).outerHeight() + gap;
    $("#" + div).css("top", newDivTop);
}

function setScalingFactor( width, originalWidth) {
	var factor = width / originalWidth;
	if (factor < minFactor) factor = minFactor;
	if (factor > maxFactor) factor = maxFactor;
	return factor;
}

function sizeItems(itemsArray) {
    // fails here when main page detects orientation change
	for (var i=0; i < itemsArray.length; i++)
	   sizeItem(itemsArray[i]);
}

function sizeItem(item) {
	var el = document.getElementById(item[0]);
	if (el != null)
		adjustItemDimensions(el, item);
}

function adjustItemDimensions(el, item) {
	var L = scalingFactor * item[1];
	var T = scalingFactor * item[2];
	var W = scalingFactor * item[3];
	var H = scalingFactor * item[4];

	if (L >=0)	el.style.left 	= L + "px";
	if (T >=0)	el.style.top 	= T + "px";
	if (W >=0)	el.style.width 	= W + "px";
	if (H >=0)	el.style.height = H + "px";
}

function sizeItemFonts(itemsArray) {
	for (var i=0; i < itemsArray.length; i++)
		$(itemsArray[i][0]).css("font-size", (scalingFactor * itemsArray[i][1] ) + "px");
}

function sizeItemHeights(itemsArray) {
	for (var i=0; i < itemsArray.length; i++)
		$(itemsArray[i][0]).css("height", (scalingFactor * itemsArray[i][1] ) + "px");
}

//function showDebug() {
//   alert( "windowWidth=" + windowWidth 
//      + ", windowHeight=" + windowHeight
//      + ", foundWidth=" + foundWidth
//      + ", foundHeight=" + foundHeight
//      + ", windowWidthToHeight=" + windowWidthToHeight
//      //+ ", pixelRatio=" + pixelRatio
//      + ", scalingFactor=" + scalingFactor
//      + ", isLandscape=" + isLandscape
//      + ", path=" + path
//      + ", appWidth=" + appWidth
//      + ", appHeight=" + appHeight
//      );
//}
