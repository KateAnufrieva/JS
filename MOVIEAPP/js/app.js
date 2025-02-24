const API_KEY = "09b659dc-3f14-4eca-b744-a28e07649f7d";
const API_URL_PREMIERES = 
"https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2025&month=FEBRUARY";
const API_URL_POPULAR = 
"https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1";
const API_URL_SEARCH = 
"https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_MOVIE_DETAILS = 
"https://kinopoiskapiunofficial.tech/api/v2.2/films/";

getMovies(API_URL_POPULAR);

async function getMovies(url) {
    const resp = await fetch(url,{
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();
    showMovies(respData);
}

function getClassByRate(vote) {
    if (vote >= 7) {
        return "green";
    } else if (vote > 5) {
        return "orange";
    }else {
        return "red";
    }
}

function showMovies(data) {
    const moviesEl = document.querySelector(".movies");

    //очищаем предыдущие фильмы
    document.querySelector(".movies").innerHTML = "";

    //т.к. разные названия в API
    const films = data.films || data.items || [];

    films.forEach((movie) => { const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
        <div class="movie_cover-inner">
                    <img src="${movie.posterUrlPreview}" 
                    alt="${movie.nameRu}" class="movie_cover"/>
                    <div class="movie_cover--darkend"></div>
                </div>
                <div class="movie_info">
                    <div class="movie_title">${movie.nameRu}</div>
                    <div class="movie_category">${movie.genres.map(
                        (genre) => ` ${genre.genre}`
                    )}</div>
                    <div class="movie_average movie_average--${getClassByRate(movie.rating || movie.ratingKinopoisk)}">${movie.rating || movie.ratingKinopoisk}</div>
                </div>
                `;
                movieEl.addEventListener("click", () => openModal(movie.kinopoiskId))
                moviesEl.appendChild(movieEl);
    });
}

const form = document.querySelector("form");
const search = document.querySelector(".header_search");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
    if (search.value) {
        getMovies(apiSearchUrl);

        search.value = "";
    }

});

//Modal
const modalEl = document.querySelector(".modal");

async function openModal(id) {
    const resp = await fetch(API_URL_MOVIE_DETAILS + id,{
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();
    

    modalEl.classList.add("modal--show");
    document.body.classList.add("stop-scrolling");

    modalEl.innerHTML = `
        <div class="modal_card">
            <img class="modal_movie-backdrop" src="${respData.posterUrl}" alt="">
            <h2>
                <span class="modal_movie-title">${respData.nameRu}</span>
                <span class="modal_movie-release-year"> - ${respData.year}</span>
            </h2>
            <ul class="modal_movie-info">
                <div class="loader"></div>
                <li class="modal_movie-genre">Жанр - ${respData.genres.map((el) => `<span>${el.genre}</span>`)}</li>
                ${respData.filmLength ? `<li class="modal_movie-runtime">Время - ${respData.filmLength} минут</li>` : ''}
                <li>Сайт: <a class="modal_movie-site" href="${respData.webUrl}">${respData.webUrl}</a></li>
                <li class="modal_movie-overview">Описание - ${respData.description}</li>
            </ul>
            <button type="button" class="modal_button-close">Закрыть</button>
        </div>
 `
 const btnClose = document.querySelector(".modal_button-close");
 btnClose.addEventListener("click", () => closeModal());
}

function closeModal() {
    modalEl.classList.remove("modal--show");
    document.body.classList.remove("stop-scrolling");
}

//Закрытие по нажатию не на окно
window.addEventListener("click", (e) => {
    if (e.target === modalEl) {
        closeModal();
    }
})

//Закрытие по кнопке esc
window.addEventListener("keydown", (e) => {
    if(e.keyCode === 27) {
        closeModal();
    }
})

