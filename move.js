// Declaring Constants and Variables
// Declaring constants
const horizontalLength = 13;
const verticalLength = 3;
const raceLength = 2*horizontalLength + 2*verticalLength;
// Variables for the Race
const Race = []; // Contains each square of the race in order of visiting
let currentIndex = 0; 
let distanceTravelled = 0; // Variable to maintain Lap number
let isForward = true; // Variable to know if lap is to be done AntiClockwise or Clockwise
// Variables for Starting the race
let lockKeyBoard = false; // Boolean to block Keyboard input while countdown for beginning of race
let lapsNumber = document.getElementById('laps_num');
let startBtn = document.getElementById('start');
let countDown = document.getElementById('countdown');
// Variables for StopWatch
let timer = false;
let second = 0;
let count = 0;

// Function to move from one cell to adjacent one.
function switchSelected (direction)
{
    // Making current square a normal cell
    Race[currentIndex].classList.remove('selectedSquare');
    Race[currentIndex].classList.add('square');
    currentIndex = (currentIndex + direction + raceLength) % raceLength;
    distanceTravelled += direction;
    // Making the new square a selected Cell
    Race[currentIndex].classList.remove('square');
    Race[currentIndex].classList.add('selectedSquare');

    // Managing lap number and direction of lap
    if (distanceTravelled == 32 && isForward) {
        lapsNumber.innerHTML = +lapsNumber.innerHTML + 1;
        isForward = false;
        countDown.innerHTML = "Now Anti-ClockWise";
    }
    if (distanceTravelled == 0 && !isForward) {
        lapsNumber.innerHTML = +lapsNumber.innerHTML + 1;
        isForward = true;
        countDown.innerHTML = "ClockWise Again";
    }
    // Resetting after 3 laps
    if (lapsNumber.innerHTML == "4") {
        countDown.innerHTML = 'Finish!'
        // Setting a delay of 3 seconds before resetting
        setTimeout(function() {
            countDown.style.display = 'none';
            startBtn.style.display = 'block';
            lapsNumber.innerHTML = 1;
        }, 3000);
        timer = false;
    }
}
// Loading race variables from html file
document.addEventListener('DOMContentLoaded', function() {
    const Row_Top = Array.from(document.querySelectorAll('.row_top > .square'));
    const Row_Bottom = Array.from(document.querySelectorAll('.row_bottom > .square'));
    const Column_Right = Array.from(document.querySelectorAll('.column_right > .square'));
    const Column_Left = Array.from(document.querySelectorAll('.column_left > .square'));
    // Initializing race array, in order of to be visited
    Race.push.apply(Race, Row_Top)
    Race.push.apply(Race, Column_Right)
    Row_Bottom.reverse();
    Column_Left.reverse();
    Race.push.apply(Race, Row_Bottom);
    Race.push.apply(Race, Column_Left);

    Race[currentIndex].classList.remove('square');
    Race[currentIndex].classList.add('selectedSquare');

    // Setting variables to maintain which key will do what
    const rowTopEnd = horizontalLength-1;
    const columnRightEnd = rowTopEnd + verticalLength+1;
    const rowBottomEnd = columnRightEnd + horizontalLength-1;
    const columnLeftEnd = rowBottomEnd + verticalLength+1;
    let keyDown = false; // Variable to prevent reading Key Hold as multiple key presses
    document.addEventListener('keydown', function(event) {
        if (keyDown == false && lockKeyBoard == false) {
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
        }
    });
    document.addEventListener('keyup', function(event) {
        keyDown = false;
    });
});

// Start button functionality 
startBtn.addEventListener('click', function onClick() {
    lockKeyBoard = true; // Lock keyboard while countdown is done
    startBtn.style.display = 'none'; // Hiding Button
    countDown.style.display = 'block'; // Displaying countdown
    countDown.classList.remove('countdown');
    countDown.classList.add('countdown_numbers');
    lapsNumber.innerHTML = 1; // Initializing Lap number to 1
    countDown.innerHTML = '3';
    count = 0; second = 0; // Resetting stopWatch
    distanceTravelled = 0; // Variable to maintain Lap number
    isForward = true;

    // Changing countdown digit to 2 after 1 second
    setTimeout(function() {
        countDown.innerHTML = '2';
    }, 1000);
    // Changing countdown digit to 1 after 2 second
    setTimeout(function() {
        countDown.innerHTML = '1';
    }, 2000);
    // Starting the race
    setTimeout(function() {
        countDown.classList.remove('countdown_numbers');
        countDown.classList.add('countdown_text');
        countDown.innerHTML = 'GO!';
        timer = true; // Begin stopwatch
        lockKeyBoard = false; // Unlock keyboard

        // Initialize Race variables, to start race from first cell
        for (let i = 1 ; i < raceLength ; i++)
        {
            Race[i].classList.remove('selectedSquare');
            Race[i].classList.add('square');
        }
        currentIndex = 0;
        Race[currentIndex].classList.remove('square');
        Race[currentIndex].classList.add('selectedSquare');
        // Begin stopWatch
        stopWatch();
    }, 3000);

    // Give direction after a further delay of 1 second
    setTimeout(function() {
        countDown.classList.remove('countdown_text');
        countDown.classList.add('countdown_directions');
        countDown.innerHTML = 'Go ClockWise';
    }, 4000);
});

// Function for stopwatch
function stopWatch() {
    if (timer) {
        count++; // count represents 1/100 th of a second
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
