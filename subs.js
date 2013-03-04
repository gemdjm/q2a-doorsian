// extending array to include a "contains" function
Array.prototype.contains = function ( val ) { 
	for (i in this)
		if (this[i] == val) return true; 
	return false; 
}

function showDebug(name, value) {
    log(name + "=" + value);
}

function clearLog() {
    debugTrail = "";
}

function log (s) {
    if (!isDebugLogEnabled)
        return;
    debugTrail += s + ", ";
    $("#debugInfo").text(debugTrail);
    $("#debugInfo").css("background-color", "white").css("font-size", "8pt");
}

function show(x) {
    $("#debugInfo").text(x);
}

function showHelp() { 
    $("#divInfo").css("display","block"); 
}

function imageSrc() {
	return imagesPath + "/" + correctAnswer + ".jpg";
}

function randomInt(outerMax) {
	// e.g if outerMax = 3, returns 0, 1 or 2
	return Math.floor(Math.random() * outerMax);
}

function setTwoWrongAnswersForQuestion(n) {
	// this relies on answer values not being duplicated (for different questions)
    var wrongIndex1 = wrongAnswerDistinctFrom(n, -1); 
    var wrongIndex2 = wrongAnswerDistinctFrom(n, wrongIndex1); 
    if (isTextList ) {
	    wrongAnswer1 = questionsWithAnswers[wrongIndex1][1];
	    wrongAnswer2 = questionsWithAnswers[wrongIndex2][1];
    } else if (isMapList) {
	    do { 
	        // need to re-pick within loop
            wrongIndex1 = wrongAnswerDistinctFrom(n, -1); 
            wrongIndex2 = wrongAnswerDistinctFrom(n, wrongIndex1); 
	        // need X,Y for A B C
	        setWrongMapAnswerPair(wrongIndex1, wrongIndex2);
	    } while (spotsTooClose())
    } else { // image type
	    wrongAnswer1 = questionsAlone[wrongIndex1][0];
	    wrongAnswer2 = questionsAlone[wrongIndex2][0];
    }
}	
	
function wrongAnswerDistinctFrom(n1, n2) {
// provide a random wrong answer, different to n1 and n2
	var n = n1;	
	while (n == n1 || n == n2)
		n = Math.floor(Math.random() * questionCount);
	return n;
}

function showMultipleChoiceAnswers() {
	// display the answers, except for map type which has A,B,C
	hideAnswers();
	if (isMapList)
	   put3SpotsOnMap();
	else
	   showNonMapAnswerSet();
}

function hideAnswers() {
    for (var i = 1; i <= 3; i++) {
        $("#li" + i).hide();
    }
}

function showNonMapAnswerSet() {
    var answer1 = (correctPosition == 0) ? correctAnswer : wrongAnswer1;
    var answer2 = (correctPosition == 1) ? correctAnswer : (correctPosition == 0) ? wrongAnswer1 : wrongAnswer2;
    var answer3 = (correctPosition == 2) ? correctAnswer : wrongAnswer2;

    // NEXT 3 worked without blank prefix for text listType, but failed when using image listType, had to enforce strings
    $("#li1").text("" + answer1).fadeIn(300);
    $("#li2").text("" + answer2).fadeIn(600);
    $("#li3").text("" + answer3).fadeIn(900);
}

function deSpaced(s) {
    // JS replace only replaces one char   
    return s.replace(/\s/g,'');
}

