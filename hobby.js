const searchform = document.querySelector("form");
const moviecontainer = document.querySelector(".moviecontainer");
const inputbox = document.querySelector(".inputbox");

// Function to fetch movie details using OMDB API
const getmovieinfo = async (movie) => {
    try {
        const apikey = "321cc6c1";
        const url = `http://www.omdbapi.com/?apikey=${apikey}&t=${movie}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to fetch movie data.");
        }

        const data = await response.json();

        if (data.Response === "False") {
            throw new Error("Movie not found.");
        }

        showmoviedata(data);
    } catch (error) {
        showerrormessage(error.message);
    }
};

// Function to display movie data
const showmoviedata = (data) => {
    moviecontainer.innerHTML = "";

    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `
        <h2>${Title}</h2>
        <p><strong>Rating: &#11088;</strong> ${imdbRating}</p>
    `;

    const moviegenreElement = document.createElement('div');
    moviegenreElement.classList.add('movie-genre');
    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerText = element.trim();
        moviegenreElement.appendChild(p);
    });

    movieElement.appendChild(moviegenreElement);

    movieElement.innerHTML += `
        <p><strong>Released Date:</strong> ${Released}</p>
        <p><strong>Duration:</strong> ${Runtime}</p>
        <p><strong>Cast:</strong> ${Actors}</p>
        <p><strong>Plot:</strong> ${Plot}</p>
    `;

    const movieposterelement = document.createElement('div');
    movieposterelement.classList.add('movie-poster');
    movieposterelement.innerHTML = `<img src="${Poster}" alt="Movie Poster"/>`;

    moviecontainer.appendChild(movieposterelement);
    moviecontainer.appendChild(movieElement);
};

// Function to display error message
const showerrormessage = (message) => {
    moviecontainer.innerHTML = `<h2>${message}</h2>`;
};

// Adding event listener to the form
searchform.addEventListener('submit', (e) => {
    e.preventDefault();
    const moviename = inputbox.value.trim();
    if (moviename !== '') {
        getmovieinfo(moviename);
    } else {
        showerrormessage("Enter a movie name to get movie info.");
    }
});

