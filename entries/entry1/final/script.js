var aText = [
    "when they're no longer right for you,",
    "it'll feel wrong most of the time",
    "like an incessant ache in your heart,",
    "you'll notice yourself change.",
    "your spirit shrinks,",
    "your sparkle dulls,",
    "and you find yourself faking a smile.",
    "it's often subtle how being with the wrong person",
    "makes you feel less like yourself,",
    "and may lead you to seek validation from them",
    "that you are enough.",
  
];

var iSpeed = 75; 
var iIndex = 0; 
var iArrLength = aText.length; 
var iScrollAt = 20; 
var iTextPos = 0; 
var sContents = ''
var iRow; 

function typewriter() {
    var destination = document.getElementById("typedtext");
    var output = '';

 
    for (var i = Math.max(0, iIndex - iScrollAt); i < iIndex; i++) {
        output += aText[i] + '<br />';
    }

    output += aText[iIndex].substring(0, iTextPos) + "_";

    destination.innerHTML = output;

    if (iTextPos++ == aText[iIndex].length) {
        iTextPos = 0;
        iIndex++;

        if (iIndex != iArrLength) {
            setTimeout(typewriter, 500);
        }
    } else {
        setTimeout(typewriter, iSpeed);
    }
}

typewriter();

