(function () {
  // api url
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = []
  const genresTypes = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }

  // display element
  const dataPanel = document.getElementById('data-panel')
  const genresList = document.getElementById('genres-list')
  const displayMode = document.getElementById('display-mode')
  let lastClickElement

  axios.get(INDEX_URL).then((response) => {
    data.push(...response.data.results)
    displayDataList(data)
  }).catch((err) => console.log(err))

  // display the genres lists
  function displayGenresList() {
    const genresValues = Object.values(genresTypes)
    const genresKeys = Object.keys(genresTypes)
    let htmlContent = ``
    for (let i = 0; i < genresValues.length; i++) {
      htmlContent += `<a class="nav-item nav-link border" href="#" data-genresid="${genresKeys[i]}">${genresValues[i]}</a>`
    }
    genresList.innerHTML = htmlContent
  }

  // handle the genres button event and modify the movie display
  genresList.addEventListener('click', event => {
    let results = []
    if (lastClickElement !== undefined) {
      lastClickElement.classList.remove('active')
    }
    if (event.target.matches('.nav-item')) {
      event.target.classList.add('active')
      results = data.filter(movie =>
        movie.genres.includes(parseInt(event.target.dataset.genresid))
      )
      displayDataList(results)
      lastClickElement = event.target
    }
  })

  // display the movie lists
  function displayDataList(data) {
    let htmlContent = ''
    data.forEach(function (item) {
      htmlContent += `
        <div class="col-sm-3">
          <div class="card mb-2">
            <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body movie-item-body">
              <h6 class="card-title">${item.title}</h6>
              <div class="d-flex flex-row flex-wrap">
        `
      for (let i = 0; i < item.genres.length; i++) {
        htmlContent += `<div class="genresIcon">${genresTypes[item.genres[i]]}</div>`
      }
      htmlContent += `
              </div>
            </div >
          </div >
        </div >
        `
    })
    dataPanel.innerHTML = htmlContent
  }
  displayGenresList()
})()
