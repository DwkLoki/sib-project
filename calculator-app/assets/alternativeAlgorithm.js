/*
    algoritma kalkulator berdasarkan observasi sendiri.
    Dan hanya sebuah alternative logic pd project kalkulator.
    
    jika ingin menerapkan algoritma ini pd project kalkulator,
    maka uncomment kode program yg mengimport file javascript ini
    di file index.html
*/

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.calculator-btn');

for (const button of buttons) {
    button.addEventListener('click', function(e) {
        const clickedBtn = e.target.innerText;

        if (clickedBtn === 'C') {
            display.innerText = '0';
        } else if (clickedBtn === 'D') {
            if (display.innerText.length === 1) {
                display.innerText = '0';
            } else {
                display.innerText = display.innerText.slice(0, -1);
            }
        } else if (clickedBtn === '=') {
            try {
                display.innerText = eval(display.innerText);
            } catch {
                display.innerText = 'Error!';
            }
        } else if (clickedBtn === '%') {
            display.innerText = (display.innerText)/100; 
        } else {
            if (display.innerText === '0') {
                display.innerText = clickedBtn;
            } else {
                display.innerText += clickedBtn;
            } 
        }
        
        
    })
}