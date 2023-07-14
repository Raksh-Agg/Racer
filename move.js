document.addEventListener('DOMContentLoaded', function() {
    // const squares = Array.from(document.getElementsByClassName('square'));
    let Row_Top = document.getElementById("row_top").children;
    // for(var i = 0; i < searchEles.length; i++) {
    //     if(searchEles[i].tagName == 'SELECT' || searchEles.tagName == 'INPUT') {
    //         if(searchEles[i].id.indexOf('RT') == 0) {
    //             Row_Top.push(searchEles[i]);
    //         }
    //     }
    // }
    let Row_Bottom = document.getElementById("row_bottom").children;
    // for(var i = 0; i < searchEles.length; i++) {
    //     if(searchEles[i].tagName == 'SELECT' || searchEles.tagName == 'INPUT') {
    //         if(searchEles[i].id.indexOf('RB') == 0) {
    //             Row_Bottom.push(searchEles[i]);
    //         }
    //     }
    // }
    let Column_Right = document.getElementById("column_right").children;
    // for(var i = 0; i < searchEles.length; i++) {
    //     if(searchEles[i].tagName == 'SELECT' || searchEles.tagName == 'INPUT') {
    //         if(searchEles[i].id.indexOf('CR') == 0) {
    //             Column_Right.push(searchEles[i]);
    //         }
    //     }
    // }
    let Column_Left = document.getElementById("column_left").children;
    // for(var i = 0; i < searchEles.length; i++) {
    //     if(searchEles[i].tagName == 'SELECT' || searchEles.tagName == 'INPUT') {
    //         if(searchEles[i].id.indexOf('CL') == 0) {
    //             Column_Left.push(searchEles[i]);
    //         }
    //     }
    // }
    let currentSquareIndex = 0;

    Row_Top[currentSquareIndex].classList.add('selectedSquare');
    Row_Top[currentSquareIndex].classList.remove('square');
    // print(Row_Top)
    // squares[currentSquareIndex].classList.add('selected');

    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight') {
            Row_Top[currentSquareIndex].classList.remove('selectedSqaure');
            Row_Top[currentSquareIndex].classList.add('square');

            currentSquareIndex = (currentSquareIndex + 1) % Row_Top.length;

            Row_Top[currentSquareIndex].classList.remove('square');
            Row_Top[currentSquareIndex].classList.add('selectedSqaure');
        }
    });
});
