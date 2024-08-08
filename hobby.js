const searchform = document.querySelector("form");
const moviecontainer = document.querySelector(".moviecontainer");
const inputbox = document.querySelector(".inputbox");

// Function to fetch movie details using OMDB API
const getmovieinfo = async (movie) => {
	try{
	const apikey = "321cc6c1";
	const url = `http://www.omdbapi.com/?apikey=${apikey}&t=${movie}`;
	const response = await fetch(url); // Returns data in the form of a promise

	if(!response.ok){
		throw new Error("Unable to fetch movie data.")
	}
	const data = await response.json(); // Data is converted into JSON
	console.log(data);
	showmoviedata(data); // Call the function to display the movie data
}
catch(error){
	showerrormessage("No Movie found !!");
}
}

const showmoviedata = (data) => {
	moviecontainer.innerHTML="";
	const { Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster } = data; // Array destructuring
	const movieElement = document.createElement('div');

    movieElement.classList.add('movie-info');
	movieElement.innerHTML = `<h2>${Title}</h2>
	                          <p><strong>Rating:&#11088;</strong>${imdbRating}</p>`;// Here for displaying word rating before actual rating strong tag is used and a unicode character too
const moviegenreElement = document.createElement('div');
moviegenreElement.classList.add('movie-genre')//giving class to this div easy css styling
Genre.split(",").forEach(element=>{
	const p=document.createElement('p');
	p.innerText=element;
	moviegenreElement.appendChild(p);
});

movieElement.appendChild(moviegenreElement);

movieElement.innerHTML += `<p><strong>Released Date:</strong>${Released}</p>
                           <p><strong>Duration:</strong>${Runtime}</p>
                           <p><strong>Cast:</strong>${Actors}</p>
                           <p><strong>Plot:</strong>${Plot}</p>`;

// Creating movie poster
const movieposterelement=document.createElement('div');
movieposterelement.classList.add('movie-poster');
movieposterelement.innerHTML=`<img src="${Poster}"/>`;

moviecontainer.appendChild(movieposterelement);

moviecontainer.appendChild(movieElement);


	moviecontainer.appendChild(movieElement);
}

// Function to display error message
const showerrormessage=(message)=>{
	moviecontainer.innerHTML=`<h2>${message}</h2`;
}
// Adding event listeners to form 

// Function to handle form submission
searchform.addEventListener('submit', (e) => {
	e.preventDefault();
	const moviename = inputbox.value.trim();
	if (moviename !== '') {
		getmovieinfo(moviename);
	}
	else{
		showerrormessage("Enter movie name to get movie info");
	}
});

