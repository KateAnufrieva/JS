const mainEl = document.querySelector('.main');
const wrapper = document.createElement('div');

// Написать форму
// Написать инпут
// Написать кнопку поиска

// Добавить инпут и кнопку к форме
// Добавить форму к main

// Добавить ко всем этим элементам необходимые атрибуты и классы

// Написать функцию для создания карточки
// Написать функцию для удаления карточки


const formEl = document.createElement('form');
formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputsValue = Object.fromEntries(new FormData(e.target));
    const response = await fetch(`https://api.github.com/users/${inputsValue.name}`);

    if (response.ok) {
        const data = await response.json();
        wrapper.appendChild(createProfileEl(data));
        mainEl.appendChild(wrapper);
        inputEl.value = '';
    } else {
        alert("Пользователь не найден");
    }

});

const inputEl = document.createElement('input');
inputEl.classList.add('search-input');
inputEl.setAttribute('name', 'name');

const searchButtonEl = document.createElement('button');
searchButtonEl.classList.add('search-button');
searchButtonEl.setAttribute('type', 'submit');
searchButtonEl.innerHTML = "Поиск";

formEl.appendChild(inputEl);
formEl.appendChild(searchButtonEl);
mainEl.appendChild(formEl);

function createProfileEl(profileData) {
    const element = document.createElement('div');
    element.classList.add('profile');
    element.innerHTML = `
    <img class="search-image" src=${profileData.avatar_url ?? 'Нет информации'}></img>
    <p class="search-text"><span>Имя: </span>${profileData.name ?? 'Не указано'}</p>
    <p class="search-text"><span>Город: </span>${profileData.location ?? 'Не указан'}</p>
    <p class="search-text"><span>О себе: </span>${profileData.bio ?? 'Нет информации'}</p>
    `;

    element.appendChild(createDeleteBtnEl());
    console.log("Созданный элемент профиля:", element); // Проверка
    return element;
}

function createDeleteBtnEl() {
    const element = document.createElement('button');
    element.classList.add('delete-button');
    element.innerText = "Удалить";
    element.addEventListener('click', (e) => {
        wrapper.innerHTML = '';
        
    });

    return element;
}