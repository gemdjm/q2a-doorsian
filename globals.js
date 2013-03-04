// Constants
var RedColour = "#FF0000";
var BlueColour = "#1800F0";
//var YellowColour = "#F0FF39";
var GreenColour = "#00BD00";
var questionsInSession = 10;		// 2 for test, 10 for live
var questionFinderLimit = 1000;
var minSpotProximity = 0.1;

// Variables
var dataArrayName = "";
var subjectName = "";
var subjectTitle = "";
var listType = "";
var maxNumberForCounting = 5;
var maxImageForCounting = 3;
var subjectDataArrayName = "";
var subjectImageFolderPath = "";
var mapImageName = "";

var isTextList = false;
var isImageList = false;
var isMapList = false;
var isNotesSubject = false;
var isStaticList = false;

var questionsWithAnswers = null;
var questionsAlone = null;
var notesArray = null;
var questionCount = 0;
var questionNumber = 0;
var correctPosition = -1;
var correctAnswer = "";
var questionGotWrongAnswer = false;
var backColour = "";
var btnStart = null;
var retryCount = 0;
var previousQuestions = [];
var imagesPath = "";
var startTime = 0;
var isSessionActive = false;
var elapsedSeconds = 0;
var mapFactorX = 0.0, mapFactorY = 0.0;
var redPlace, bluePlace, greenPlace; 
var redSpotX, redSpotY, blueSpotX, blueSpotY, greenSpotX, greenSpotY;
var debugTrail = "";
var wrongAnswer1, wrongAnswer2, wrongMapFactorX1, wrongMapFactorY1, wrongMapFactorX2, wrongMapFactorY2;
var notesHtml = "";
var subjectHasMultipleImages = false;
var isDebugLogEnabled = false;

