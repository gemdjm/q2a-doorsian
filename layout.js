
function prepareUI() {
    log("prepU");
    $("#divBlack").hide();
    $("#h1Start").hide();
    $("#h1Title").show();
    $("#divContent").show();
    adjustUiForMapOrOther();
    //resizeMainPage();
    //removeExcessPageHeight();
    finaliseDisplayLayout();

    // ensure mobile device gets full sizing logic
    //if (isMapList) {
    //    //alert("test");
    //    //finalisePage();
    //    adjustAnswerDisplays();
    //}
}

function adjustUiForMapOrOther() {
    log("adjU");
    if (isMapList)
        adjustUiForMap();
    else
        adjustUiForNonMap();
}

function adjustUiForMap() {
    log("aUFMap");
    $("#imgMap").attr("src", "Maps/" + mapImageName + ".jpg").show();
    $("#divMapArea").attr("width", "75%");
    //adjustMapButtonColours();
}

function adjustMapButtonColours() {
    log("aMBCol");
    adjustMapButton(1, RedColour);
    adjustMapButton(2, BlueColour);
    adjustMapButton(3, GreenColour);
}

function adjustMapButton(buttonNumber, backgroundColour) {
    var name = "#li" + buttonNumber;
    $(name).css("background-color", backgroundColour).css("padding", "10px 20px").css("margin", "15px 0px");
}

function adjustUiForNonMap() {
    $("#imgMap").hide();
    $("#divMapArea").attr("width", "1%");
    $(".ABC").hide();
    if (isTextList)
        setupDisplayForTextQuestions();
    else if (isImageList)
        setupDisplayForImageQuestions();
}

function setupDisplayForTextQuestions() {
    $("#imgQuestion").hide();
}

function setupDisplayForImageQuestions() {
    $("#imgQuestion").show();
    imagesPath = subjectImageFolderPath;
}

function adjustSpecialItems() {
    // reset any items that should NOT be resized
    $("#divProgress").css("text-align", "left");

    // keep Question Text large (span 24), make page title smaller
    var titleSize = (parseFloat($("#spnSubject").css("font-size"))) * 0.5;
    $("#spnSubject").css("font-size", titleSize + "pt");
    $("#debugInfo").css("font-size", "11pt");

    if (isTextList)
        adjustQuestionArea(0.75);
    else if (isImageList)
        adjustSpecialItemsForImageQuestions();
    else if (isMapList)
        adjustSpecialItemsForMapQuestions();
}

function adjustSpecialItemsForImageQuestions() {
    adjustQuestionArea(1.5);
    var flagSize = ($("#imgQuestion").height()) * 2.5;      // was 1.35 prior to 11/5/12, 1.75 prior to 29/5/12
    $("#imgQuestion").css("height", flagSize + "px");
    //imageDebug("aSI-iIL");
}

function adjustSpecialItemsForMapQuestions() {
    adjustQuestionArea(0.5);
    var y = $("#divAnswers").css("height");
    $("#imgMap").css("height", y);
    $(".ABC").css("height", "8px");
}

function adjustQuestionArea(sizeChangeFactor) {
    // make better use of space for map OR image question
    var qTop = parseFloat($("#divQuestion").css("top"));
    var qHeight = parseFloat($("#divQuestion").css("height"));
    var aTop = parseFloat($("#divAnswers").css("top"));
    var aHeight = parseFloat($("#divAnswers").css("height"));
    var totalHeight = qHeight + aHeight;
    var qHeight = qHeight * sizeChangeFactor;
    aTop = qTop + qHeight;
    aHeight = totalHeight - qHeight;
    $("#divQuestion").css("height", qHeight + "px");
    $("#divAnswers").css("top", aTop + "px").css("height", aHeight + "px");
    alignAnswersToQuestion();
}

function alignAnswersToQuestion() {
    // added 6/2/13
    var qLeft = $("#divQuestion").css("left");
    var qWidth = $("#divQuestion").css("width");
    $("#divAnswers").css("left", qLeft).css("width", qWidth);
}

function finaliseDisplayLayout() {
    hidePopups();
    setBackground();
}

function hidePopups() {
    $(".popup").hide();
}

function hidePopup(n) {
    switch (n) {
        case 1: $("#divInfo").fadeOut(); break;
        case 2: $("#divResults").fadeOut(); break;
    }
}

function setBackground() {
    var colour = (isImageList) ? "transparent" : backgroundColour;
    $("#divQuestion").css("background-color", colour);
}



