
function adjustMapWidth() {
    var questionWidth = $("#divQuestion").css("width");
    $("#divMapArea").css("width", questionWidth);
}

function positionMapAndAnswerButtons() {
    // position A, B, C buttons
    var answerHeight = $("#li1").outerHeight();
    var mapHeight = $("#imgMap").outerHeight();
    var mapAreaPadding = (mapHeight * 0.1);
    var mapAreaHeight = (mapHeight + mapAreaPadding);
    $("#mainList li").css("width", answerHeight + "px");
    $("#divAnswers").css("height", mapAreaHeight + "px").css("padding-top", mapAreaPadding + "px");
    $("#divMapArea").css("height", mapAreaHeight + "px").css("text-align", "center");
    if (isLandscape)
        positionMapButtonsRightOfMap();
    else
        positionMapButtonsBelowMap(mapAreaHeight);
    $("#divMapArea").css("height", $("#imgMap").css("height")).css("width", $("#imgMap").css("width"));
}

function positionMapButtonsRightOfMap() {   // landscape
    var mapAreaTop = $("#divMapArea").position().top;
    var questionWidth = $("#divQuestion").outerWidth();
    var mapWidth = $("#imgMap").outerWidth();
    var buttonsWidth = $("#li1").outerWidth();
    var spareWidth = questionWidth - mapWidth - buttonsWidth;
    var mapAreaLeft = (spareWidth / 2.0) * 0.75;
    var answersLeft = mapAreaLeft + (mapWidth * 1.25);
    var answersListWidth = $("#divAnswers").outerWidth() - answersLeft;

    // map left positioning OK on IE, not on mobiles; and buttons get left-aligned with map
    $("#divMapArea").css("float", "left").css("position", "absolute").css("left", mapAreaLeft + "px");
    $("#divAnswersList").css("position", "absolute").css("float", "left")
        .css("top", mapAreaTop + "px").css("left", answersLeft + "px").css("width", answersListWidth + "px");
    $("#mainList li").css("position", "static").css("float", "none").css("margin", "0px 0px 5px 0px");
    spreadMapButtonsVertically();
}

function positionMapButtonsBelowMap(mapAreaHeight) {    // portrait
    var mapOffset = ($("#divQuestion").outerWidth() - $("#imgMap").outerWidth()) / 2.0;
    var mapLeft = $("#divQuestion").position().left + mapOffset;
    var mapAreaWidth = ($("#divQuestion").outerWidth()) - (2.0 * mapOffset);

    // map left positioning OK on IE, not on mobiles
    $("#divMapArea").css("float", "none").css("position", "absolute")
        .css("left", mapOffset + "px").css("width", mapAreaWidth + "px");
    $("#divAnswersList").css("position", "absolute").css("float", "none")
        .css("left", "0px").css("top", mapAreaHeight).css("width", $("#divQuestion").css("width"));
    $("#mainList li").css("position", "absolute").css("float", "left").css("margin", "5px 0px");
    spreadMapButtonsHorizontally();
}

function spreadMapButtonsVertically() {
    var spaceAvailable = $("#imgMap").outerHeight();
    var buttonHeight = $("#li1").outerHeight();
    var freeSpace = spaceAvailable - (3 * buttonHeight);
    if (freeSpace > 0) {
        var gap = freeSpace / 2.0;
        $("#li1").css("margin-bottom", gap + "px");
        $("#li2").css("margin-bottom", gap + "px");
    }
}

function spreadMapButtonsHorizontally() {
    var spaceAvailable = parseFloat($("#divQuestion").css("width"));
    var buttonWidth = $("#li1").outerWidth();
    var freeSpace = spaceAvailable - (3 * buttonWidth);
    if (freeSpace > 0) {
        var gap = freeSpace / 2.0;
        var li1Left = 0;
        var li2Left = li1Left + buttonWidth + gap;
        var li3Left = li2Left + buttonWidth + gap;
        $("#li1").css("left", li1Left + "px");
        $("#li2").css("left", li2Left + "px");
        $("#li3").css("left", li3Left + "px");
    }
}

function put3SpotsOnMap() {
    switch (correctPosition) {
        case 0:
            holdSpotTrioXY(correctAnswer, mapFactorX, mapFactorY,
                wrongAnswer1, wrongMapFactorX1, wrongMapFactorY1,
                wrongAnswer2, wrongMapFactorX2, wrongMapFactorY2);
            break;
        case 1:
            holdSpotTrioXY(wrongAnswer1, wrongMapFactorX1, wrongMapFactorY1,
                correctAnswer, mapFactorX, mapFactorY,
                wrongAnswer2, wrongMapFactorX2, wrongMapFactorY2);
            break;
        case 2:
            holdSpotTrioXY(wrongAnswer1, wrongMapFactorX1, wrongMapFactorY1,
                wrongAnswer2, wrongMapFactorX2, wrongMapFactorY2,
                correctAnswer, mapFactorX, mapFactorY);
            break;
    }
    // show A, B, C as answers
    $("#li1").text("A").fadeIn(300);
    $("#li2").text("B").fadeIn(600);
    $("#li3").text("C").fadeIn(900);
    placeMapSpots();  // needed here for follow-on questions
}

function holdSpotTrioXY(redPoint, redX, redY,
        bluePoint, blueX, blueY,
        yellowPoint, yellowX, yellowY) {
    redSpotX = redX; redSpotY = redY; redPlace = redPoint;
    blueSpotX = blueX; blueSpotY = blueY; bluePlace = bluePoint;
    greenSpotX = yellowX; greenSpotY = yellowY; greenPlace = yellowPoint;
}

function placeMapSpots() {
    if (!isMapList)
        return;
    putSpotOnMap("red", redSpotX, redSpotY, redPlace);
    putSpotOnMap("blue", blueSpotX, blueSpotY, bluePlace);
    putSpotOnMap("green", greenSpotX, greenSpotY, greenPlace);
    $(".ABC").show();
}

function putSpotOnMap(colour, x, y, placeName) {
    // must do this after all sizing
    var halfSpot = $("#redSpot").height() / 2;
    var map = $("#imgMap");
    var N = map.offset().top;
    var E = map.offset().left + map.width();
    var S = N + map.height();
    var W = map.offset().left;
    var spotTop = S - (y * (S - N)) - halfSpot;
    var spotLeft = W + (x * (E - W)) - halfSpot;
    switch (colour) {
        case "red": $("#redSpot").offset({ top: spotTop, left: spotLeft }); break;
        case "blue": $("#blueSpot").offset({ top: spotTop, left: spotLeft }); break;
        case "green": $("#greenSpot").offset({ top: spotTop, left: spotLeft }); break;
    }
}

function setWrongMapAnswerPair(index1, index2) {
    wrongAnswer1 = questionsAlone[index1][0];
    wrongAnswer2 = questionsAlone[index2][0];
    wrongMapFactorX1 = questionsAlone[index1][1];
    wrongMapFactorY1 = questionsAlone[index1][2];
    wrongMapFactorX2 = questionsAlone[index2][1];
    wrongMapFactorY2 = questionsAlone[index2][2];
}

function spotsTooClose() {
    if (Math.abs(mapFactorX - wrongMapFactorX1) < minSpotProximity
            && Math.abs(mapFactorY - wrongMapFactorY1) < minSpotProximity)
        return true;
    if (Math.abs(mapFactorX - wrongMapFactorX2) < minSpotProximity
            && Math.abs(mapFactorY - wrongMapFactorY2) < minSpotProximity)
        return true;
    if (Math.abs(wrongMapFactorX2 - wrongMapFactorX1) < minSpotProximity
            && Math.abs(wrongMapFactorY2 - wrongMapFactorY1) < minSpotProximity)
        return true;

    return false;
}


