/* 
    algoritma kalkulator berdasarkan tutorial di dicoding academy,
    dengan sedikit improvisasi dan penyesuaian.
*/

// #1 buat objek kalkulator untuk menampung berbagai
// jenis data pada kalkulator
const calculator = {
  displayNumber: '0',
  operator: null,
  firstNumber: null,
  isWaitForSecondNumber: false,
};

// #2 tangkap semua elemen button pd kalkulator, kemudian
// simpan ke dalam variabel
const buttons = document.querySelectorAll('.calculator-btn');

// #3 menambahkan event/aksi 'click' pd setiap button
// menggunakan for of loop 
for (const button of buttons) {
    button.addEventListener('click', function (event) {
        // mendapatkan objek elemen yang diklik
        const clickedBtn = event.target;
        
        // #7 integrasi elemen clear dengan function 'clearCalculator()' 
        // dan 'updateDisplay()'
        if (clickedBtn.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            // return bertujuan untuk mencegah kode program
            // berikutnya dieksekusi pd function ini karena
            // kondisi pada blok kode 'if' sdh terpenuhi
            return;
        }

        // #9 integrasi elemen delete dengan function yg diperlukan
        if (clickedBtn.classList.contains('delete')) {
            deleteDigit();
            updateDisplay();
            return;
        }
        
        // #11 integrasi elemen percent dengan function yg diperlukan
        if (clickedBtn.classList.contains('percent')) {
            percentNumber();
            updateDisplay();
            return;
        }
    
        // #13 integrasi elemen operator dengan function yg diperlukan
        if (clickedBtn.classList.contains('operator')) {
            handleOperator(clickedBtn.innerText)
            return;
        }

        // #15 integrasi elemen equal-btn dengan function yg diperlukan
        if (clickedBtn.classList.contains('equal-btn')) {
            performCalculation();
            updateDisplay();
            return;
        }
    
    
        inputDigit(clickedBtn.innerText);
        updateDisplay();
        console.log(calculator);
    });
}

// #4 buat function untuk menangkap nilai dri tombol yang diklik
// kemudian disimpan ke dalam properti displayNumber pd objek
// calculator 
function inputDigit(digit) {
    if (calculator.displayNumber === '0') {
        if (digit === '0') {
            calculator.displayNumber = 0;
        } else if (digit === '.') {
            calculator.displayNumber += digit;
        } else {
            calculator.displayNumber = digit;
        }
    } else {
        calculator.displayNumber += digit;
    }
}

// #5 kemudian buat function untuk mengupdate tampilan
// display kalkulator
function updateDisplay() {
  document.querySelector('.display').innerText = calculator.displayNumber;
}

// #6 buat function untuk tombol 'clear' pd kalkulator
function clearCalculator() {
  calculator.displayNumber = '0';
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.isWaitForSecondNumber = false;
}

// #8 buat function delete digit
function deleteDigit() {
    if (calculator.displayNumber.length === 1) {
        calculator.displayNumber = '0';
    } else {
        calculator.displayNumber = calculator.displayNumber.slice(0, -1);
    }
} 

// #10 buat function konversi ke persen
function percentNumber() {
  if (calculator.displayNumber === '0') {
    return;
  }

  calculator.displayNumber = calculator.displayNumber / 100;
}

// #12 buat function untuk menangkap nilai operator,
// nomor pertama, dan current nomor yg diinput kemudian 
// menyimpan nilainya ke dalam properti objek calculator, hanya jika 
// properti 'isWaitForSecondNumber' bernilai false
function handleOperator(operator) {
    //kalo isWaitForSecondNumber = false / operator belum diinput,
    //maka update objek calculator

    //alasan tanda '! (negasi)' ditambahkan, agar nilai kondisi menjadi true
    //ketika isWaitForSecondNumber = false, sehingga blok kode programnya dieksekusi
    if (!calculator.isWaitForSecondNumber) {
        calculator.operator = operator;
        calculator.isWaitForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        // mengatur ulang nilai display number supaya tombol 
        // selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';
    } else {
        alert('Operator sudah ditetapkan');
    }
}

// #14 buat function untuk proses kalkulasi
function performCalculation() {
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert('Anda belum menetapkan operator');
    return;
  }
 
  let result = 0;
  if (calculator.operator === '+') {
    result = Number(calculator.firstNumber) + Number(calculator.displayNumber);
  } else if (calculator.operator === '-') {
    result = Number(calculator.firstNumber) - Number(calculator.displayNumber);
  } else if (calculator.operator === 'x') {
    result = Number(calculator.firstNumber) * Number(calculator.displayNumber);    
  } else if (calculator.operator === '/') {
    result = Number(calculator.firstNumber) / Number(calculator.displayNumber);
  }

  // mengembalikan nilai isWaitForSecondNumber ke nilai default yaitu false
  // agar kita bisa menginput operator lagi 
  calculator.isWaitForSecondNumber = false;
 
  // result dikonversi ke string agar tombol delete bisa digunakan
  // jika result bertipe number, tombol delete akan error.
  // hal tersebut terjadi karena pada tombol delete, kita melakukan
  // fungsi slice()
  calculator.displayNumber = result.toString();
}
 
