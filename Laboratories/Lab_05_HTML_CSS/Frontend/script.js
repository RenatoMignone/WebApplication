// Toggle favorite status of a film
async function toggleFavorite(filmId, isFavorite) {
    try {
        const response = await fetch(`http://localhost:3001/api/films/${filmId}/favorite`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ favorite: isFavorite ? 1 : 0 })
        });

        if (response.ok) {
            fetchFilms(); // Refresh the film list
        } else {
            console.error('Error toggling favorite:', response.statusText);
        }
    } catch (error) {
        console.error('Error toggling favorite:', error);
    }
}

// Delete a film
async function deleteFilm(filmId) {
    try {
        const response = await fetch(`http://localhost:3001/api/films/${filmId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchFilms(); // Refresh the film list
        } else {
            console.error('Error deleting film:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting film:', error);
    }
}

// Fetch films with an optional filter
async function fetchFilms(filter = 'all') {
    try {
        const response = await fetch(`http://localhost:3001/api/films?filter=${filter}`);
        const films = await response.json();
        const filmList = document.getElementById('film-list');
        filmList.innerHTML = ''; // Clear existing content

        films.forEach(film => {
            const filmItem = document.createElement('li');
            filmItem.className = 'list-group-item d-flex justify-content-between align-items-center';

            // Film title
            const title = document.createElement('span');
            title.textContent = film.title;
            if (film.favorite) title.classList.add('text-danger');

            // Film details
            const details = document.createElement('div');
            const favoriteCheckbox = document.createElement('input');
            favoriteCheckbox.type = 'checkbox';
            favoriteCheckbox.checked = film.favorite;
            favoriteCheckbox.addEventListener('change', () => toggleFavorite(film.id, favoriteCheckbox.checked));

            const watchDate = document.createElement('span');
            watchDate.textContent = film.watchDate ? new Date(film.watchDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';
            const rating = document.createElement('span');
            rating.className = 'ms-2';

            // Clamp rating between 0 and 5
            const clampedRating = Math.max(0, Math.min(5, film.rating || 0));
            rating.textContent = '⭐'.repeat(clampedRating) + '☆'.repeat(5 - clampedRating);

            // Delete button
            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger btn-sm ms-2';
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteFilm(film.id));

            details.appendChild(favoriteCheckbox);
            details.appendChild(watchDate);
            details.appendChild(rating);
            details.appendChild(deleteButton);

            filmItem.appendChild(title);
            filmItem.appendChild(details);
            filmList.appendChild(filmItem);
        });
    } catch (error) {
        console.error('Error fetching films:', error);
    }
}

// Add a new film
async function addFilm(event) {
    event.preventDefault();

    const title = document.getElementById('film-title').value;
    const favorite = document.getElementById('film-favorite').value;
    const watchDate = document.getElementById('film-watchdate').value;
    const rating = document.getElementById('film-rating').value;

    const newFilm = {
        title,
        favorite: parseInt(favorite),
        watchDate: watchDate || null,
        rating: rating ? parseInt(rating) : null
    };

    try {
        const response = await fetch('http://localhost:3001/api/films', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newFilm)
        });

        if (response.ok) {
            fetchFilms(); // Refresh the film list
            document.getElementById('add-film-form').reset(); // Reset the form
            const modal = bootstrap.Modal.getInstance(document.getElementById('addFilmModal'));
            modal.hide(); // Hide the modal
        } else {
            console.error('Error adding film:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding film:', error);
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    fetchFilms();

    // Add event listeners for filter buttons
    const filterButtons = document.querySelectorAll('.list-group-item-action');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            document.getElementById('current-filter').textContent = button.textContent;
            fetchFilms(filter);
        });
    });

    document.getElementById('add-film-form').addEventListener('submit', addFilm);
});
