const cards = document.querySelectorAll(".card"),
timeTag = document.querySelector(".time b"),
flipsTag = document.querySelector(".flips b"),
refreshBtn = document.querySelector(".details button");


let maxTime = 135;
let timeLeft = maxTime;
let flips = 0;
let x = 0;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;


  function changeBackground(val) {

    switch (val) {
        case 1:
            document.body.style.background = "url('images/earth1.gif') no-repeat center center fixed";
            document.body.style.backgroundColor = "#777776";
            break;
        case 2:
            document.body.style.backgroundColor = "#81817f";
            break;
        case 3:
            document.body.style.backgroundColor = "#8b8b88";
            break;
        case 4:
            document.body.style.backgroundColor = "#949491";
            break;
        case 5:
            document.body.style.backgroundColor = "#9e9e9b";
            break;
        case 6:
            document.body.style.backgroundColor = "#a7a7a5";
            break;
        case 7:
            document.body.style.backgroundColor = "#b1b1ae";
            break;
        case 8:
            document.body.style.backgroundColor = "#babaaa";
            break;
        case 9:
            document.body.style.backgroundColor = "#c4c4c1";
            break;
        case 10:
            document.body.style.background = "url('images/earth2.gif') no-repeat center center fixed";
            document.body.style.backgroundColor = "#ece5dc";
            break;
    }
}


/* the alert message */ 
function showAlert( val , duration) {
    var alertElement = document.getElementById('customAlert');
    switch (val) {
        case 1:
            message = "Allez, Allez, Allez...";
            break;
        case 2:
            message = "Bien ! Bien !";
            break;
        case 3:
            message = "Absolument, vous avez la capacité de le faire.";
            break;
        case 4:
            message = "Très bien ! Charlie a hâte de vous voir.";
            break;
        case 5:
            message = "Vous êtes génial(e) !";
            break;
        case 6:
            message = "Fantastique ! Continuez le bon travail !";
            break;
        case 7:
            message = "Effort exceptionnel ! Votre dévouement est louable.";
            break;
        case 8:
            message = "Performance exceptionnelle ! Vous êtes sur la bonne voie.";
            break;
        case 9:
            message = "Bon travail ! Vous avez trouvé Charlie !";
            break;
        case 10:
            message = "Félicitations pour avoir atteint le niveau le plus élevé ! Vous êtes un véritable accomplisseur.";
            break;
    }
    
    alertElement.innerHTML = '<p>' + message + '</p>';
    alertElement.style.display = 'block';

    // Close the alert after the specified duration
    setTimeout(function () {
      alertElement.style.display = 'none';
    }, duration);
  }


function initTimer() {
    if (timeLeft <= 0) {
        return clearInterval(timer);
    }

    var minutes = Math.floor(timeLeft / 60);
    var seconds = timeLeft % 60;

    // You can use a function to format the time as MM:SS
    function formatTime(num) {
        return num < 10 ? "0" + num : num;
    }

    timeTag.innerText = formatTime(minutes) + ":" + formatTime(seconds);
    timeLeft--;
}


function flipCard({target: clickedCard}) {
    if(!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    if(clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matchedCard++;
        changeBackground(matchedCard);
        x++;
        /*document.getElementById(matchedCard).style.visibility = "visible" ;*/
        var imageElement = document.getElementById('img0');
        imageElement.src = `images/img--${x}.png`; 
        if(matchedCard == 10 && timeLeft > 0) {
            imageElement.src = `images/img--11.png`; 
            changeBackground(10);
            document.getElementById("my-canvas").style.visibility = "visible" ; 
            showAlert(matchedCard,4000);
            return clearInterval(timer);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        showAlert(matchedCard,4000);
        return disableDeck = false;
    }

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    timeLeft = maxTime;
    flips = matchedCard = 0;
    x = 1 ; 
    cardOne = cardTwo = "";
    clearInterval(timer);
    timeTag.innerText = "02:15";
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;
    changeBackground(1);
    document.getElementById("my-canvas").style.visibility = "hidden" ; 

    document.getElementById("1").style.visibility = "hidden" ; 
    document.getElementById("2").style.visibility = "hidden" ; 
    document.getElementById("3").style.visibility = "hidden" ; 
    document.getElementById("4").style.visibility = "hidden" ; 
    document.getElementById("5").style.visibility = "hidden" ; 
    document.getElementById("6").style.visibility = "hidden" ; 

    //img rodmap level 
    var imageElement = document.getElementById('img0');
    imageElement.src = 'images/img--1.png';
    //fin

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        setTimeout(() => {
            imgTag.src = `images/img-${arr[index]}.png`;
        }, 500);
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();

refreshBtn.addEventListener("click", shuffleCard);

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});


history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
});