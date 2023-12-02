document.addEventListener("DOMContentLoaded", function () {
      let textOne = document.getElementById("one");
      let textTwo = document.getElementById("two");
      let body = document.body;

      function toggleText() {
        textOne.classList.toggle("hidden-text");
        textTwo.classList.toggle("hidden-text");

       
        if (textOne.classList.contains("hidden-text")) {
          body.style.backgroundImage = 'none';
        } else {
          body.style.backgroundImage = 'none';
        }
      }

     
      let readAgainText = document.querySelector(".read-again-text");
      readAgainText.addEventListener("click", toggleText);
    });

