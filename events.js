
function _helpClick() 		{ showHelp(); }
function _introClick() 		{ showIntro(); }
function _startClick() 		{ startQuestionSession(); }
function _itemClick()		{ checkAnswer(event.srcElement); }
function _hidePopup(n)		{ hidePopup(n); }
function _hidePopups()		{ hidePopups(); }
function _nextSession()     { hidePopups(); startQASession(); }
function _goHome()          { location.href = "index.html"; }


