function loadSubject() {
    log("LoSub");
    prepareSubject();
    //alert("questionCount=" + questionCount + ", questionsInSession=" + questionsInSession + ", questionsAlone.length=" + questionsAlone.length);
    if (!isNotesSubject && questionCount < questionsInSession)
        $("#debugInfo").text("Insufficient questions");
}

function prepareSubject() {
    log("prepS");
    getSubjectProperties();
    setDataArraysToBeUsedForThisSubject();
    setListTypeFlag();
}

function getSubjectProperties() {
    subjectName = determineSubjectName();
    var subjectIndex = determineSubjectIndexFrom(subjectName);
    if (subjectIndex < 0) {
        alert("Subject " + subjectName + " not found");
        return;
    }
    setSubjectDetails(subjectInfo, subjectIndex, subjectInfo.length);
}

function determineSubjectName() {
    var locationString = location.toString();
    var n1 = locationString.indexOf("?s=");
    var n2 = locationString.indexOf("&a=");
    subjectName = locationString.substring(n1 + 3, n2);
    dataArrayName = locationString.substring(n2 + 3);
    return subjectName;
}

function determineSubjectIndexFrom(subjectName) {
    // subjectInfo is the subjects array
    for (var i = 0; i < subjectInfo.length; i++) {
        if (subjectInfo[i][0] == subjectName)
            return i;
    }
    return -1;
}

function setDataArraysToBeUsedForThisSubject() {
    switch (dataArrayName) {
        case "da1": setArrayTrio(da1); break;
        case "da2": setArrayTrio(da2); break;
        case "da3": setArrayTrio(da3); break;
        case "da4": setArrayTrio(da4); break;
        case "da5": setArrayTrio(da5); break;
        case "da6": setArrayTrio(da6); break;
        case "da7": setArrayTrio(da7); break;
        case "da8": setArrayTrio(da8); break;
        case "da9": setArrayTrio(da9); break;   // this was using da8 3/3/13
        case "da10": setArrayTrio(da10); break; // added & tested 3/3/13
        case "da11": setArrayTrio(da11); break;
        case "da12": setArrayTrio(da12); break;
        case "da13": setArrayTrio(da13); break;
        case "da14": setArrayTrio(da14); break;
        case "da15": setArrayTrio(da15); break;
        case "da16": setArrayTrio(da16); break;
        case "da17": setArrayTrio(da17); break;
        case "da18": setArrayTrio(da18); break;
        case "da19": setArrayTrio(da19); break;
    }
}

function setArrayTrio(arrayName) {
    questionsWithAnswers = arrayName;
    questionsAlone = arrayName;
    notesArray = arrayName;
    questionCount = arrayName.length;
}

function setSubjectDetails(infoArray, i, len) {
    subjectTitle = infoArray[i][1];
    var type = infoArray[i][2];
    listType = (type == "t") ? "text" : (type == "m") ? "map" : (type == "i") ? "image"
        : (type == "n") ? "notes" : (type == "s" || type == "a") ? "staticList" : "unknown";
    subjectDataArrayName = infoArray[i][3];
    subjectImageFolderPath = infoArray[i][4];
    mapImageName = infoArray[i][8];     // added 9/5/2012
    subjectHasMultipleImages = (infoArray[i][9] == "True");
}

function setListTypeFlag() {
    isImageList = (listType === "image");
    isTextList = (listType === "text");
    isMapList = (listType === "map");
    isNotesSubject = (listType === "notes");
    isStaticList = (listType === "staticList");
    if (isNotesSubject)
        notesHtml = notesArray[0];
}

