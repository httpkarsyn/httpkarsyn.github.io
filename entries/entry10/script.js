var aText = [
    "ridiculous how i miss you that much",
    "and you're living your days as if you're missing nothing",
    "a tragedy when a mature mind and a romantic heart",
    "live in the same body",
    "why did you steal me from everyone",
    "if you couldn't keep me",
    "i wished for a lasting love",
    "the love lasted",
    "but the lover left",
    "don't love deeply until you make sure that",
    "the other part loves you with the same depth",
    "because the depth of your love today",
    "is the depth of your wound tomorrow",
    "days will pass",
    "and you'll abandon things you were addicted to",
    "and leave someone",
    "and cancel a dream and finally accept a reality",
    "this is my last letter",
    "there will be no others",
    "this is the last grey cloud that will rain on you",
    "after this, you will never again know the rain",
    "this is the last drop of wine in my cup",
    "there will be no more drunkenness",
    "this is the last letter of madness"
];

var iSpeed = 75; 
var iIndex = 0; 
var iArrLength = aText.length; 
var iScrollAt = 20; 
var iTextPos = 0; 
var sContents = ''
var iRow; 

function typewriter() {
    sContents = '';
    iRow = Math.max(0, iIndex - iScrollAt);
    var destination = document.getElementById("typedtext");

    while (iRow < iIndex) {
        sContents += aText[iRow++] + '<br />';
    }

    destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";

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
