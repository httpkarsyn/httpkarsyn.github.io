$(document).ready(function() {


        

           

            function generate(){

                // Select a random item from each list
                var selected_one = select_random(one);
                var selected_two = select_random(two);
                var selected_three = select_random(three);

                // Take the selected (random) item from list and make it visible
                $('.list-one').html(selected_one);
                $('.list-two').html(selected_two);
                $('.list-three').html(selected_three);

            }

            $('button').click(function(){
                generate();
            });

            generate();
            
        });
let body = document.body;

function turnOnLight() {
  body.classList.toggle("light");
  button.classList.toggle("buttonOn");
}

let button = document.querySelector(".button");
button.addEventListener("click", turnOnLight);

