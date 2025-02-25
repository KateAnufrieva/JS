// Создать input
// Добавить class
// Добавить placeholder
// Сбросить стандартное поведение inputa
// Добавить обработчик по нажатию

// Добавить кнопку скопировать
// Добавить кнопку сгенерировать
// Создать функцию генерации пароля


const mainEl = document.querySelector ('.main');

const passwordEl = document.createElement('input');
passwordEl.classList.add('password');
passwordEl.setAttribute('placeholder', 'Сгенерировать пароль');
passwordEl.addEventListener('keypress', (e) => {
    e.preventDefault();
});
passwordEl.addEventListener('focus', (e) => {
    navigator.clipboard.writeText(passwordEl.value);
});

const copyBtn = document.createElement('button');
copyBtn.classList.add('password-button');
copyBtn.innerText = 'Скопировать';
copyBtn.addEventListener('click', (e) => {
    passwordEl.select();
    passwordEl.setSelectionRange(0, 999999);
    navigator.clipboard.writeText(passwordEl.value);
});

const generateBtn = document.createElement('button');
generateBtn.classList.add('password-button');
generateBtn.innerText = 'Сгенерировать';
generateBtn.addEventListener('click', (e) => {
    //Вызов функции генерации пароля
    let password = generatePassword(12);
    passwordEl.value = password;
});

function generatePassword(passwordLength) {
    const numberChars = "012345678";
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXY";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const symbolChars = "!@#$%^&*()_+";
    const allchars = numberChars + upperChars + lowerChars + symbolChars;

    let randomString = '';

    for (let i = 0; i < passwordLength; i++){
        let randomNumber = Math.floor(Math.random() * allchars.length);
        randomString += allchars[randomNumber];
    }

    return randomString;
}

mainEl.appendChild(passwordEl);
mainEl.appendChild(copyBtn);
mainEl.appendChild(generateBtn);
