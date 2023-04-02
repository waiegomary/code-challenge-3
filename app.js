// Get the movie details and update the DOM
function getMovieDetails() {
    fetch('http://localhost:3000/films/1')
        .then(response => response.json())
        .then(movie => {
            const poster = document.getElementById('movie-poster');
            const title = document.getElementById('movie-title');
            const runtime = document.getElementById('movie-runtime');
            const showtime = document.getElementById('movie-showtime');
            const tickets = document.getElementById('movie-tickets');

            poster.src = movie.poster;
            title.innerText = movie.title;
            runtime.innerText = `Runtime: ${movie.runtime} minutes`;
            showtime.innerText = `Showing at ${movie.showtime}`;
            tickets.innerText = `${movie.capacity - movie.tickets_sold} tickets left`;

            // Handle buy ticket button click
            const buyTicketBtn = document.getElementById('buy-ticket-btn');
            buyTicketBtn.addEventListener('click', () => {
                if (movie.tickets_sold < movie.capacity) {
                    movie.tickets_sold++;
                    tickets.innerText = `${movie.capacity - movie.tickets_sold} tickets left`;
                }
            });
        });
}

// Get the list of movies and update the DOM
function getMovieList() {
    const filmsList = document.getElementById('films');

    fetch('http://localhost:3000/films')
        .then(response => response.json())
        .then(movies => {
            movies.forEach(movie => {
                const listItem = document.createElement('li');
                listItem.innerText = movie.title;
                listItem.addEventListener('click', () => {
                    fetch(`/films/${movie.id}`)
                        .then(response => response.json())
                        .then(movieDetails => {
                            const poster = document.getElementById('movie-poster');
                            const title = document.getElementById('movie-title');
                            const runtime = document.getElementById('movie-runtime');
                            const showtime = document.getElementById('movie-showtime');
                            const tickets = document.getElementById('movie-tickets');

                            poster.src = movieDetails.poster;
                            title.innerText = movieDetails.title;
                            runtime.innerText = `Runtime: ${movieDetails.runtime} minutes`;
                            showtime.innerText = `Showing at ${movieDetails.showtime}`;
                            tickets.innerText = `${movieDetails.capacity - movieDetails.tickets_sold} tickets left`;

                            // Update buy ticket button click handler for new movie
                            const buyTicketBtn = document.getElementById('buy-ticket-btn');
                            buyTicketBtn.removeEventListener('click');
                            buyTicketBtn.addEventListener('click', () => {
                                if (movieDetails.tickets_sold < movieDetails.capacity) {
                                    movieDetails.tickets_sold++;
                                    tickets.innerText = `${movieDetails.capacity - movieDetails.tickets_sold} tickets left`;
                                }
                            });
                        });
                });
                filmsList.appendChild(listItem);
            });
        });
}

// Call the functions to get the movie details and list of movies on page load
getMovieDetails();
getMovieList();
