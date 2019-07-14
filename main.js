function q (sel) {
    return document.querySelector(sel)
  }
  
function qs (sel) {
    return document.querySelectorAll(sel)
  }
  
function artistNode (artist) {
    const artistDiv = document.createElement('div')
    artistDiv.classList.add('planet', 'ba', 'bw2', 'purple')
    artistDiv.innerHTML = `
      <h3 Artist="f1 pink">${artist.name}</h3>
      <p>Song: ${artist.song}</p>
      <p>Cover Art: ${artist.cover}</p>
    //   <p>Audio sample</p>
      <button class="get-planet-data" data-url="">Find out more about</button>
    `
    return artistDiv
  }
  
function displaySearchData (searchUrl) {
      fetch(searchUrl)
      .then(res => res.json())
      .then(function (data) {
        const dataDisplay = q('#search-data')
        dataDisplay.innerHTML = `
        //   <h3>More info about ${data.name}</h3>
        //   <dl>
        //     <dt>Terrain</dt>
        //     <dd>${data.terrain}</dd>
        //     <dt>Gravity</dt>
        //     <dd>${data.gravity}</dd>
        //   </dl>
        `
      })
  }
  
  /* Main execution */

  
  
  document.addEventListener('DOMContentLoaded', function () {
    q('#search-results').addEventListener('click', function (event) {
      console.log(event.target)
      if (event.target && event.target.matches('button.get-search-data')) {
        displaySearchData(event.target.dataset['url'])
      }
    })  
  })
  
    q('form').addEventListener('submit', function (event) {
      event.preventDefault()
      const searchTerm = q('#artist-name').value
      const cleanSearch = encodeURIComponent(searchTerm)
      const url = `https://itunes-api-proxy.glitch.me/search?term=${cleanSearch}&limit=10&media=music`
      const resultsDiv = q('#search-results')
    
  
      fetch(url)
        .then(response => response.json())
        .then(function (data) {
          resultsDiv.innerHTML = ''
          for (let artist of data.results) {
            resultsDiv.appendChild(artistNode(artist))
      
          }
        })
    })
  
  