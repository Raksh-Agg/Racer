document.addEventListener('DOMContentLoaded', function() {
    const squares = Array.from(document.getElementsByClassName('square'));
    let currentSquareIndex = 0;

    squares[currentSquareIndex].classList.add('selected');

    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight') {
            squares[currentSquareIndex].classList.remove('selectedSqaure');
            squares[currentSquareIndex].classList.add('square');

            currentSquareIndex = (currentSquareIndex + 1) % squares.length;

            squares[currentSquareIndex].classList.remove('square');
            squares[currentSquareIndex].classList.add('selectedSqaure');
        }
    });
});
