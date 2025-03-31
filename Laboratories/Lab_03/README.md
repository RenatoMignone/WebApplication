# FilmLibrary API Documentation

## Get all films
* `GET /api/films`
* Description: Get the full list of films
* Request body: _None_
* Response: `200 OK` (success)
* Response body: Array of objects, each describing one film. Note that absence of values is represented as null value in json.
```json
[
  { "id": 1, "title": "Pulp Fiction", "favorite": 1, "watchDate": "2023-03-11", "rating": null },
  ...
]
```
* Error responses: `500 Internal Server Error` (generic error)

## Get a film by ID
* `GET /api/films/:id`
* Description: Retrieve a film by its ID
* Request body: _None_
* Response: `200 OK` (success)
* Response body: Object describing the film
```json
{ "id": 1, "title": "Pulp Fiction", "favorite": 1, "watchDate": "2023-03-11", "rating": null }
```
* Error responses: `404 Not Found` (film not found), `500 Internal Server Error` (generic error)

## Create a new film
* `POST /api/films`
* Description: Create a new film
* Request body: JSON object with film details (excluding ID)
```json
{ "title": "Guardians of the Galaxy Vol.3", "favorite": 1, "watchDate": "2024-02-09", "rating": 4 }
```
* Response: `201 Created` (success)
* Response body: Object describing the created film with assigned ID
```json
{ "id": 6, "title": "Guardians of the Galaxy Vol.3", "favorite": 1, "watchDate": "2024-02-09", "rating": 4 }
```
* Error responses: `400 Bad Request` (invalid input), `500 Internal Server Error` (generic error)

## Mark a film as favorite/unfavorite
* `PUT /api/films/:id/favorite`
* Description: Mark a film as favorite/unfavorite
* Request body: JSON object with favorite status
```json
{ "favorite": 1 }
```
* Response: `200 OK` (success)
* Response body: Object describing the updated film
```json
{ "id": 1, "title": "Pulp Fiction", "favorite": 1, "watchDate": "2023-03-11", "rating": null }
```
* Error responses: `404 Not Found` (film not found), `400 Bad Request` (invalid input), `500 Internal Server Error` (generic error)

## Change the rating of a film
* `PUT /api/films/:id/rating`
* Description: Change the rating of a film by specifying a delta value
* Request body: JSON object with delta value
```json
{ "delta": 1 }
```
* Response: `200 OK` (success)
* Response body: Object describing the updated film
```json
{ "id": 1, "title": "Pulp Fiction", "favorite": 1, "watchDate": "2023-03-11", "rating": 5 }
```
* Error responses: `404 Not Found` (film not found), `400 Bad Request` (invalid input), `500 Internal Server Error` (generic error)

## Delete a film
* `DELETE /api/films/:id`
* Description: Delete a film by its ID
* Request body: _None_
* Response: `200 OK` (success)
* Response body: Message indicating successful deletion
```json
{ "message": "Film with ID 1 deleted successfully." }
```
* Error responses: `404 Not Found` (film not found), `500 Internal Server Error` (generic error)

## Get films by filter
* `GET /api/films?filter=[filter]`
* Description: Retrieve a list of films based on a filter
* Request body: _None_
* Response: `200 OK` (success)
* Response body: Array of objects, each describing one film
```json
[
  { "id": 1, "title": "Pulp Fiction", "favorite": 1, "watchDate": "2023-03-11", "rating": null },
  ...
]
```
* Error responses: `500 Internal Server Error` (generic error)

## Update a film
* `PUT /api/films/:id`
* Description: Update an existing film
* Request body: JSON object with film details (excluding ID)
```json
{ "title": "Pulp Fiction", "favorite": 1, "watchDate": "2023-03-11", "rating": 5 }
```
* Response: `200 OK` (success)
* Response body: Object describing the updated film
```json
{ "id": 1, "title": "Pulp Fiction", "favorite": 1, "watchDate": "2023-03-11", "rating": 5 }
```
* Error responses: `404 Not Found` (film not found), `400 Bad Request` (invalid input), `500 Internal Server Error` (generic error)
