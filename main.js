

// each page orientation defines its own layout

// divProgress width reduced to avoid extra widening 
var mainAreasL = [ 
   [ "mainHeader", 0,10,550,35 ],       [ "mainGap1", 0,40,550,5 ],         [ "divTop", 0,45,550,60 ], 
   [ "divProgress", 30, 30, 500, 10 ],  [ "mainGap2", 0, 55, 550, 5 ],      [ "divQuestion", 0, 70, 550, 70 ],
   [ "divAnswers", -8, 170, 560, 150 ], [ "divResults", 10,10,350,280 ],    [ "divDebug", 0,320,550,10 ], [ "dummy", 0,0,0,0 ]
]

var mainAreasP = [ 
   [ "mainHeader", 0,10,320,45 ],       [ "mainGap1", 0,50,320,10 ],        [ "divTop", 10,60,320,90 ], 
   [ "divProgress", 30, 70, 260, 10 ],  [ "mainGap2", 0, 110, 320, 30 ],    [ "divQuestion", 10, 120, 300, 80 ],
   [ "divAnswers", 0, 240, 320, 210 ],  [ "divResults", 10,10,300,300 ],    [ "divDebug", 0,450,320,10 ] , [ "dummy", 0,0,0,0 ]
]

var mainFontSizes = [ ["h1", 26], ["h2", 20], ["h3", 16], ["td", 14], ["li", 24], ["span", 24], ["input", 14], ["deb", 10] ];
var mainHeights  =  [ [ "img", 40 ], [ "input", 35 ], ["li", 33 ], [ "span", 24 ] ];
var firstMapUse = true;
var spotDelay = 100;
var backgroundColour = "#444"; // was "#F0E670";
var answerBackgroundColour = "#222";

// --

$(document).ready(function ()   { runApp(); })
$(window).resize(function ()    { resizeMainPage(); });

function resizeMainPage() {
    log("reMP");
    resizePage("divMainPage", mainAreasL, mainAreasP, mainFontSizes, mainHeights, true);
}

function runApp() {
    clearLog();
    clearStaticList();
    log("runA");
    //window.addEventListener('resize', resizeMainPage, false);

    // revising approach 14/2/13: subject-layout-startQASession, then question-answer, with JS files to match
    try {
        isSized = false;
        allowReorientation();
        loadSubject();
        prepareUI();
        showInfo();
    }
    catch (err) {
        if (isDebugLogEnabled) {
            $("#divDebug").show();
            $("#debugInfo").show();
            log("Error:\n" + err.message);
        }
        alert("Error:\n" + err.message + "\nin file " + err.fileName + ", line " + err.lineNumber);
    }
}

function clearStaticList() {
    $("#tblList").html("");
}

function allowReorientation() {
    //window.addEventListener('orientationchange', resizePage, false);
    //window.addEventListener('orientationchange', resizeMainPage, false);
    window.addEventListener('orientationchange', reorientPage, true);   // was false until 19/2
}

function reorientPage() {
    log("reoP");
    isSized = false;
    adjustUiForMapOrOther();
    //resizeMainPage();
    resizeActual(div, areasL, areasP, fontSizes, heights, true);
}

function showInfo() {
    log("shoI");
    $("#spnSubject").text("" + subjectTitle);
    if (isNotesSubject)
        showNotes();
    else if (isStaticList)
        showStaticList();
    else {
        finalisePage();
        startQASession();
    }
}

function showNotes() {
    $("#trProgress").hide();
    $("#divNotes").show();
    $("#divMainContent").hide();
    $("#divNotesInner").html(notesHtml);
}

function showStaticList() {
    $("#trProgress").hide();
    $("#divNotes").show();
    $("#divMainContent").hide();
    var list = "";
    for (var i = 0; i < questionCount; i++) {
        var first = questionsWithAnswers[i][0];
        var second = questionsWithAnswers[i][1];
        var row = "<tr><td>" + first + "</td>" + "<td>" + second + "</td></tr>";
        list += row;
    }
    $("#tblList").html(list);
}

function finalisePage() {
    log("finP");
    resizeMainPage();
    //if (isMapList) {
    //    adjustAnswerDisplays(); // ensure map in correct place
    //}
}

function startQASession() {
    log("sQASes");
    $("#divNotes").hide();
    $("#divMainContent").show();
	var randomiser = randomInt(999);		// to avoid duplicate starts
	initialiseProgressBar();	// positioning to be investigated
	startQuestionSession();
}

function initialiseProgressBar() {
    $("#trProgress").show();
	$("#trProgress th").css("background-color", "transparent").css("border-width", "1px").css("border-color", "silver");
}

function startQuestionSession() {
    log("sQSes");
    initialiseSessionTrackers();
    showQuestionWithAnswers();
    if (isMapList) {
        placeMapSpots();
        makeMapSpotsAppear();
    }
}

function initialiseSessionTrackers() {
    log("initST");
    questionGotWrongAnswer = false;
    firstMapUse = true;
    isSessionActive = true;
	previousQuestions.length = 0;
	questionNumber = 0;
	retryCount = 0;
	startTime = (new Date()).getTime();
}

function makeMapSpotsAppear() {
    log("mMSAp");
    // force spots to appear when 1st map question
	placeMapSpots();
	
    // if spots-not-placed problem recurs, put following statement in e.g. finalisePage
    // do again - first use on actual device tends to leave spots off map
	//if (firstMapUse)
      setTimeout(reSpot, spotDelay);
}

function reSpot() {
    log("rSpot");
    firstMapUse = false;
	placeMapSpots();
}

function showQuestionWithAnswers() {
    log("sQwA");
    prepareForNextQuestion();
	if (questionNumber > questionsInSession)
		return;

    pickQuestionAndWrongAnswers();
    displayQuestionAndAnswerSet();
    adjustAnswerDisplays();
}

function adjustAnswerDisplays() {
    log("aADis");
    if (isMapList) {
        adjustMapButtonColours();
        positionMapAndAnswerButtons();
    }
    else
        setDefaultAnswerColours();
}

function prepareForNextQuestion() {
	$("#imgQuestion").hide();
	questionGotWrongAnswer = false;
	questionNumber++;
	if (questionNumber > questionsInSession)
	   endSession();
}

function pickQuestionAndWrongAnswers() {
	var n = getRandomQuestionNumber();
    // set up the question & get 2 other (incorrect) answers
    setQuestion(n);
    setTwoWrongAnswersForQuestion(n);
}

function displayQuestionAndAnswerSet() {
	// choose a random position for the correct answer, show all
	correctPosition = randomInt(3);
	showMultipleChoiceAnswers();
	highlightProgressCell(questionNumber);
}

function setDefaultAnswerColours() {
    for (var i = 1; i <= 3; i++) {
        $("#li" + i).css("background-color", answerBackgroundColour);
    }
}

function highlightProgressCell(cellNumber) {
    $("#trProgress th").css("border-width", "1px").css("border-color", "#444");
    $("#thP" + (cellNumber - 1)).css("border-width", "2px").css("border-color", "#888");
}

function colourProgressCell(cellNumber, colour) {
    $("#thP" + (cellNumber - 1)).css("background-color", colour);
}

function setQuestion(n) {
    //debugTrail="";
    if ( isTextList )
	    setTextQuestion(n);
    else if ( isMapList )
	    setMapQuestion(n);
    else // image type
	    setImageQuestion(n);
}

function setTextQuestion(n) {
    //$("#divMapAnswers").hide();
    //$("#tdAnswersMap").attr("width", "1px");
    $("#divMapArea").attr("width", "1px").hide();
	question = questionsWithAnswers[n][0];
	correctAnswer = questionsWithAnswers[n][1];
	$("#spnQuestionText").hide().text(question).fadeIn(200);
}

function setMapQuestion(n) {
	correctAnswer = question = questionsAlone[n][0];
	mapFactorX = questionsAlone[n][1];
	mapFactorY = questionsAlone[n][2];
	$("#spnQuestionText").hide().text(question).fadeIn(200);
}

function setImageQuestion(itemIndex) {
    correctAnswer = questionsAlone[itemIndex][0];
	var imageName = deSpaced(imageSrc());
	if (subjectHasMultipleImages)
	    imageName = adjustNameIfMultipleImages(itemIndex, imageName);
	$("#imgQuestion").attr("src", imageName).fadeIn();
}

function adjustNameIfMultipleImages(itemIndex, imageName) {
    var imageCount = questionsAlone[itemIndex][1];
    if (imageCount > 1) {
        var imageSuffix = Math.ceil(Math.random() * imageCount);
        if (imageSuffix > 1)   // first image has no -n suffix
            imageName = imageName.replace(".", "-" + imageSuffix + ".");
    }
    return imageName;
}

function getRandomQuestionNumber() {
	var qNo = i = 0;
	do {
	    i++;
	    if (i >= questionFinderLimit) {
	        alert("getRandomQuestionNumber exceeded questionFinderLimit");
	        return -1;
	    }
		qNo = randomInt(questionCount);
		if (! previousQuestions.contains(qNo)) {
            previousQuestions.push(qNo);
            return qNo;
		}
	} while (i < questionFinderLimit);
}

function endSession() {
    isSessionActive = false;
    $(".ABC").fadeOut();
	showSessionResults();
}

function checkAnswer(el) {
	if (!isSessionActive)
	   return;
	var answer = el.innerText;
	if (isMapList)
	    answer = replaceWithMapAnswer(answer);
	if (answer == correctAnswer)
        indicateSuccess(el);
	else
		indicateFailure(el);
}

function replaceWithMapAnswer(answer) {
    var mapAnswer = null;
    switch (answer) {
        case "A": mapAnswer = redPlace; break;
        case "B": mapAnswer = bluePlace; break;
        case "C": mapAnswer = greenPlace; break;
    }
    return mapAnswer;
}

function indicateSuccess(el) {
	if (questionGotWrongAnswer)  // was wrong before right
	    colourProgressCell(questionNumber, "yellow");
    else
	    colourProgressCell(questionNumber, "lime");

	$("#" + el.id).css("background-color", "lime").fadeOut(300, showQuestionWithAnswers);
}

function indicateFailure(el) {
	questionGotWrongAnswer = true;
	var elId = "#" + el.id;
	colourProgressCell(questionNumber, "salmon");
	$(elId).css("background-color", "salmon").hide().fadeIn(500);
	catchIfAllWrong();  // debug
	retryCount++;
}

function catchIfAllWrong() {
    // GS got 3 pinks for "DHC Dash 8" this should catch any recurrence
    var salmon = 'rgb(250, 128, 114)';
    //if ( $("#li1").css("background-color") == salmon) alert("got it"); tested OK
    if (    $("#li1").css("background-color") == salmon
            && $("#li2").css("background-color") == salmon
            && $("#li3").css("background-color") == salmon )  {
        $("#mainGap1").text( "Q=" + correctAnswer + ", A1=" + $("#li1").text() 
            + ", A2=" + $("#li2").text()
            + ", A3=" + $("#li3").text() + ".");
    }
}

function showSessionResults() {
	initialiseProgressBar();
	clearQuestionAndAnswers();
	loadResultsDialogue();
	$("#imgQuestion").attr("src", "finish.jpg");
	$("#divResults").fadeIn();
}

function loadResultsDialogue() {
	var endTime = (new Date()).getTime();
	elapsedSeconds = parseInt(((endTime - startTime) / 1000), 10);
	$("#spnResultsTime").text("" + elapsedSeconds);
	$("#spnResultsCount").text("" + questionsInSession);
	$("#spnResultsRetries").text("" + retryCount);

   // give a score
	var score = Math.floor(10000 / ( elapsedSeconds + ( 10 * retryCount )));
	$("#spnScore").text("" + score);
}

function clearQuestionAndAnswers() {
    $("#spnQuestionText").text("");
	for (var i = 0; i <= 3; i++) {
	    $("#li" + i).text(" ");
	}
}
