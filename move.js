const horizontalLength = 13;
const verticalLength = 3;
const raceLength = 2*horizontalLength + 2*verticalLength;
function switchSelected (Race, currentIndex, direction)
{
    Race[currentIndex].classList.remove('selectedSquare');
    Race[currentIndex].classList.add('square');
    currentIndex = (currentIndex + direction + raceLength) % raceLength;
    Race[currentIndex].classList.remove('square');
    Race[currentIndex].classList.add('selectedSquare');
}
document.addEventListener('DOMContentLoaded', function() {
    const Row_Top = Array.from(document.querySelectorAll('.row_top > .square'));
    const Row_Bottom = Array.from(document.querySelectorAll('.row_bottom > .square'));
    const Column_Right = Array.from(document.querySelectorAll('.column_right > .square'));
    const Column_Left = Array.from(document.querySelectorAll('.column_left > .square'));
    const Race = Row_Top
    Race.push.apply(Race, Column_Right)
    Row_Bottom.reverse();
    Column_Left.reverse();
    Race.push.apply(Race, Row_Bottom);
    Race.push.apply(Race, Column_Left);
    let currentIndex = 0;
    Race[currentIndex].classList.remove('square');
    Race[currentIndex].classList.add('selectedSquare');
    const rowTopEnd = horizontalLength-1;
    const columnRightEnd = rowTopEnd + verticalLength+1;
    const rowBottomEnd = columnRightEnd + horizontalLength-1;
    const columnLeftEnd = rowBottomEnd + verticalLength+1;
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowDown' && currentIndex == 0)
            switchSelected(Race, currentIndex--, -1);
        if (event.key === 'ArrowRight' && currentIndex < rowTopEnd)
            switchSelected(Race, currentIndex++, 1);
        if (event.key === 'ArrowLeft' && currentIndex <= rowTopEnd && currentIndex > 0)
            switchSelected(Race, currentIndex--, -1);
        if (event.key === 'ArrowDown' && currentIndex >= rowTopEnd && currentIndex < columnRightEnd)
            switchSelected(Race, currentIndex++, 1);
        if (event.key === 'ArrowUp' && currentIndex > rowTopEnd && currentIndex <= columnRightEnd)
            switchSelected(Race, currentIndex--, -1);
        if (event.key === 'ArrowLeft' && currentIndex >= columnRightEnd && currentIndex < rowBottomEnd)
            switchSelected(Race, currentIndex++, 1);
        if (event.key === 'ArrowRight' && currentIndex > columnRightEnd && currentIndex <= rowBottomEnd)
            switchSelected(Race, currentIndex--, -1);
        if (event.key === 'ArrowUp' && currentIndex >= rowBottomEnd && currentIndex < columnLeftEnd)
            switchSelected(Race, currentIndex++, 1);
        if (event.key === 'ArrowDown' && currentIndex > rowBottomEnd && currentIndex <= columnLeftEnd)
            switchSelected(Race, currentIndex--, -1);
        if (event.key === 'K' || event.key === 'k')
            switchSelected(Race, currentIndex++, 1);
        currentIndex = (currentIndex + raceLength) % raceLength;
        
        console.log(columnLeftEnd);
    });
});
