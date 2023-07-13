document.addEventListener('DOMContentLoaded', function() {
    const squares = Array.from(document.getElementsByClassName('square'));
    let currentSquareIndex = 0;

    // Initial coloring of the first square
    squares[currentSquareIndex].classList.add('selected');

    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight') {
            squares[currentSquareIndex].classList.remove('selectedSquare');
            // squares[currentSquareIndex].classList.add('square');

            currentSquareIndex = (currentSquareIndex + 1) % squares.length;

            // squares[currentSquareIndex].classList.remove('square');
            squares[currentSquareIndex].classList.add('selectedSquare');
        }
    });
});
