const horizontalLength = 13;
const verticalLength = 3;
const raceLength = 2*horizontalLength + 2*verticalLength;
let lockKeyBoard = false;
const Race = [];
let currentIndex = 0;
let distanceTravelled = 0;
let isForward = true;
let lapsNumber = document.getElementById('laps_num');
let timer = false;
let startBtn = document.getElementById('start');
let countDown = document.getElementById('countdown');
function switchSelected (direction)
{
    Race[currentIndex].classList.remove('selectedSquare');
    Race[currentIndex].classList.add('square');
    currentIndex = (currentIndex + direction + raceLength) % raceLength;
    distanceTravelled += direction;
    Race[currentIndex].classList.remove('square');
    Race[currentIndex].classList.add('selectedSquare');
    if (distanceTravelled == 32 && isForward)
    {
        lapsNumber.innerHTML = +lapsNumber.innerHTML + 1;
        console.log('Lap');
        isForward = false;
        countDown.innerHTML = "Now Anti-ClockWise";
    }
    if (distanceTravelled == 0 && !isForward)
    {
        lapsNumber.innerHTML = +lapsNumber.innerHTML + 1;
        console.log(typeof(lapsNumber.innerHTML))
        console.log('Lap');
        isForward = true;
        countDown.innerHTML = "ClockWise Again";
    }
    if (lapsNumber.innerHTML == "4")
    {
        startBtn.style.display = 'block';
        countDown.style.display = 'none';
        lapsNumber.innerHTML = 1;
        timer = false;
    }

}
document.addEventListener('DOMContentLoaded', function() {
    const Row_Top = Array.from(document.querySelectorAll('.row_top > .square'));
    const Row_Bottom = Array.from(document.querySelectorAll('.row_bottom > .square'));
    const Column_Right = Array.from(document.querySelectorAll('.column_right > .square'));
    const Column_Left = Array.from(document.querySelectorAll('.column_left > .square'));
    // const Race = Row_Top
    Race.push.apply(Race, Row_Top)
    Race.push.apply(Race, Column_Right)
    Row_Bottom.reverse();
    Column_Left.reverse();
    Race.push.apply(Race, Row_Bottom);
    Race.push.apply(Race, Column_Left);
    Race[currentIndex].classList.remove('square');
    Race[currentIndex].classList.add('selectedSquare');
    const rowTopEnd = horizontalLength-1;
    const columnRightEnd = rowTopEnd + verticalLength+1;
    const rowBottomEnd = columnRightEnd + horizontalLength-1;
    const columnLeftEnd = rowBottomEnd + verticalLength+1;
    let keyDown = false;
    document.addEventListener('keydown', function(event) {
        // if (keyDown == false && lockKeyBoard == false)  
        if (lockKeyBoard == false)
        { 
            keyDown = true;
            if (event.key === 'ArrowDown' && currentIndex == 0)
            switchSelected(-1);
            else if (event.key === 'ArrowRight' && currentIndex < rowTopEnd)
            switchSelected(1);
            else if (event.key === 'ArrowLeft' && currentIndex <= rowTopEnd && currentIndex > 0)
            switchSelected(-1);
            else if (event.key === 'ArrowDown' && currentIndex >= rowTopEnd && currentIndex < columnRightEnd)
            switchSelected(1);
            else if (event.key === 'ArrowUp' && currentIndex > rowTopEnd && currentIndex <= columnRightEnd)
            switchSelected(-1);
            else if (event.key === 'ArrowLeft' && currentIndex >= columnRightEnd && currentIndex < rowBottomEnd)
            switchSelected(1);
            else if (event.key === 'ArrowRight' && currentIndex > columnRightEnd && currentIndex <= rowBottomEnd)
            switchSelected(-1);
            else if (event.key === 'ArrowUp' && currentIndex >= rowBottomEnd && currentIndex < columnLeftEnd)
            switchSelected(1);
            else if (event.key === 'ArrowDown' && currentIndex > rowBottomEnd && currentIndex <= columnLeftEnd)
                switchSelected(-1);
            else if (event.key === 'K' || event.key === 'k')
                switchSelected(1);
            else if (event.key === 'J' || event.key === 'j')
                switchSelected(-1);
                // currentIndex = (currentIndex + raceLength) % raceLength;
            }
        });
        document.addEventListener('keyup', function(event) {
            keyDown = false;
        });
    });
    
    
    
    // let startBtn = document.querySelectorAll('.columns > .buttons > .start');
    // let stopBtn = document.querySelectorAll('.columns > .buttons > .stop');
    
    
    let hour = 0;
    let minute = 0;
    let second = 0;
    let count = 0;
 
startBtn.addEventListener('click', function onClick() {
    lockKeyBoard = true;
    startBtn.style.display = 'none';
    countDown.style.display = 'block';
    countDown.classList.remove('countdown');
    countDown.classList.add('countdown_numbers');
    lapsNumber.innerHTML = 1;

    setTimeout(function() {
        countDown.innerHTML = '2';
    }, 1000);
    setTimeout(function() {
        countDown.innerHTML = '1';
    }, 2000);
    setTimeout(function() {
        countDown.classList.remove('countdown_text');
        countDown.classList.add('countdown_directions');
        countDown.innerHTML = 'Go ClockWise';
    }, 4000);
    
    // setTimeout(function() {
        //     countDown.innerHTML = countDown.innerHTML - 1;
        // }, 10000);
    setTimeout(function() {
            // }, 3000);
            //your code to be executed after 1 second
        countDown.classList.remove('countdown_numbers');
        countDown.classList.add('countdown_text');
        countDown.innerHTML = 'GO!';
        console.log('hehe')
        timer = true;
        lockKeyBoard = false;
        for (let i = 1 ; i < raceLength ; i++)
        {
            Race[i].classList.remove('selectedSquare');
            Race[i].classList.add('square');
        }
        currentIndex = 0;
        Race[currentIndex].classList.remove('square');
        Race[currentIndex].classList.add('selectedSquare');
        stopWatch();
    }, 3000);
});




function stopWatch() {
    
    if (timer) {
        count++;
 
        if (count == 100) {
            second++;
            count = 0;
        }
 
        let secString = second;
        let countString = count;
 
        if (second < 10) {
            secString = "0" + secString;
        }
 
        if (count < 10) {
            countString = "0" + countString;
        }
 
        document.getElementById('sec').innerHTML = secString;
        document.getElementById('count').innerHTML = countString;
        setTimeout(stopWatch, 10);
    }
}
