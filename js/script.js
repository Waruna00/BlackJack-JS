
var points = 0
var blackjack = {
    'you' : {"scorespan" : "yourblackjackscore" ,
            'div' : 'your-result' ,
            'score' : 0 } ,
    'dealer' : {"scorespan" : "dealerblackjackscore" ,
            'div' : 'dealer-result' ,
            'score' : 0 },
    'cards' : ['CA',
        'D2','D3','D4','D5','D6','D7','D8','D9','D10','DA', 
        'H2','H3','H4','H5','H6','H7','H8','H9','H10','HA',
        'S2','S3','S4','S5','S6','S7','S8','S9','S10','SA']
}

var draws = 0 ;
var losses = 0;
var wins = 0;
var loss = document.getElementById("losses");
var win = document.getElementById("wins");
var draw = document.getElementById("draws")
var results = document.getElementById('black-jack-result')
const YOU = blackjack["you"];
const DEALER = blackjack["dealer"];
const dealsound = new Audio("sounds/cash.mp3")
const hitsound = new Audio("sounds/swish.m4a");  //Add audio path
const losesound = new Audio("sounds/aww.mp3")
var HC = 0
function hit()
    {
        document.getElementById('btn-stand').setAttribute('onclick','stand()')
        STR2card("your")
        
    }

function stand()
{
    document.getElementById('btn-hit').setAttribute('onclick','');
    document.getElementById('btn-stand').setAttribute('onclick','');
    auto_play = window.setInterval(auto,2000);
    
}
function auto()
{
    STR2card('dealer')
}
function deal()
    {
        dealsound.play()
        document.getElementById('btn-deal').setAttribute('onclick','')
        let yourImages = document.querySelector("#your").querySelectorAll("img");
        let dealerImages = document.querySelector("#dealer").querySelectorAll("img");
        for (var i=0 ; i<yourImages.length ; i=i+1)
        {
            yourImages[i].remove();
        }
        for (var i=0 ; i<dealerImages.length ; i=i+1)
        {
            dealerImages[i].remove();
        }
        results.innerHTML="Let's play"
        results.style.color=" rgb(167, 177, 27)"
        blackjack.dealer.score=0
        blackjack.you.score=0
        document.getElementById("your-result").innerHTML=blackjack.you.score
        document.getElementById("dealer-result").innerHTML=blackjack.dealer.score
        document.getElementById('btn-hit').setAttribute('onclick' , 'hit()')
    }

function randomCards()
    {
        let randomIndex = Math.floor(Math.random()*blackjack.cards.length)
        return blackjack['cards'][randomIndex]
    }

function STR2card(player)
{
    HC++
        console.log(HC)
        if(blackjack.cards.length == 0)
        {
            reshuffle()
        }
    let card = randomCards()
    console.log(card)
    var location ="Cards/"+card+".png";
    showcard(player , location , card);

    for (i in blackjack.cards)
    {
        //console.log(blackjack.cards[i])
        if (blackjack.cards[i]==card)
        {
            blackjack.cards.splice(i,1) ;
            //console.log('hey')
        }
        //console.log(blackjack.cards[i])
        
    }
    console.log(blackjack.cards)
    //console.log('done')
    card = String(card)
    var value = card[1]
    switch(value)
    {
        case '2' :
            points = 2
            break;
        case 'n' :
            points = 2
            break;
        case '3':
            points = 3
            break;
        case '4':
            points = 4
            break;
        case '5' :
            points = 5
            break;
        case '6' :
            points = 6
            break;
        case '7' :
            points = 7
            break;
        case '8' :
            points = 8
            break;
        case '9' :
            points = 9
            break;
        case '1' :
            points = 10
            break;
        case 'J' :
            points = 10
            break;
        case 'Q' :
            points = 10
            break;
        case 'K' :
            points = 10
            break;
        case 'A' :
            points = ace(player)
            break;
        default :
            alert('error')
            break;
    }
    
    if (player == 'your')
    {
        blackjack.you.score = blackjack.you.score + points;
        document.getElementById("your-result").innerHTML=blackjack.you.score
        presult(blackjack.you.score)
    }
    else
    {
        blackjack.dealer.score = blackjack.dealer.score + points;
        document.getElementById("dealer-result").innerHTML=blackjack.dealer.score
        dresult(blackjack.dealer.score)
    }

    


}

function showcard(player , location , card)
    {
        hitsound.play();
        let cardImage = document.createElement('img');
        cardImage.setAttribute('src' , location)
        cardImage.setAttribute('alt' , card)
        cardImage.setAttribute('width' , '80px')
        document.getElementById(player).appendChild(cardImage);
        
    }
function ace(player)
{
    if (player == 'your' && blackjack.you.score <=10)
    {
       points = 11;
    }
    else if(player == 'your' && blackjack.you.score > 10)
    {
        points = 1;
    }
    else if(player == 'dealer' && blackjack.dealer.score < 10)
    {
        points = 11;
    }
    else if(player == 'dealer' && blackjack.dealer.score > 10)
    {
        points =1;
    }
    else
    {
        console.log("error in ace function")
    }
    return points
}

function presult(score)
{
    if(score > 21)
    {
        results.innerHTML='BUSTED!!'
        results.style.color='red'
        losesound.play()
        losses++
        loss.innerHTML= losses;
        document.getElementById('btn-hit').setAttribute('onclick' , 'retry()');
        document.getElementById('btn-stand').setAttribute('onclick','');
        document.getElementById('btn-deal').setAttribute('onclick','deal()');
        
    }
}

function dresult(score)
{
    if (blackjack.dealer.score > 12 && blackjack.dealer.score == blackjack.you.score)
    {
        window.clearInterval(auto_play)
        results.innerHTML='Draw!!'
        results.style.color='blue'
        draws++
        draw.innerHTML=draws;
        document.getElementById('btn-deal').setAttribute('onclick','deal()');
        document.getElementById('btn-hit').setAttribute('onclick' , 'retry()');
    }
    else if(blackjack.dealer.score>21)
    {
        window.clearInterval(auto_play)
        results.innerHTML='You are Win!!'
        results.style.color='purple'
        //losesound.play()
        wins++
        win.innerHTML=wins;
        document.getElementById('btn-deal').setAttribute('onclick','deal()');
        document.getElementById('btn-hit').setAttribute('onclick' , 'retry()');
    }
    else if(blackjack.dealer.score > blackjack.you.score)
    {
        window.clearInterval(auto_play)
        results.innerHTML='You are lost!!'
        results.style.color='red'
        losesound.play()
        losses++
        loss.innerHTML=losses;
        document.getElementById('btn-deal').setAttribute('onclick','deal()');
        document.getElementById('btn-hit').setAttribute('onclick' , 'retry()');
    }
    
    
}

function reset()
{
    results.innerHTML="Let's play"
    results.style.color=" rgb(167, 177, 27)"
}

function retry()
{
    alert('Do you need to play another round, click on the DEAL button')
}

function reshuffle()
{
    blackjack.cards=['CA',
        'D2','D3','D4','D5','D6','D7','D8','D9','D10','DA', 
        'H2','H3','H4','H5','H6','H7','H8','H9','H10','HA',
        'S2','S3','S4','S5','S6','S7','S8','S9','S10','SA']
}