'use strict';

const container = document.querySelector('.container');
const searchBar = document.querySelector('.searchInput');
const card = document.querySelectorAll('.card');
const filterEpisodeNumber = document.querySelector('#searchNumber');
const selectInput = document.querySelector('#selectInput');
const gameOfThronesURL = ' https://api.tvmaze.com/shows/82/episodes';

let episodes = [];

// load episodes
const loadEpisodes = async () => {
  try {
    const res = await fetch(gameOfThronesURL);
    episodes = await res.json();
    displayEpisodes(episodes);
    displayOptions(episodes);
  } catch (err) {
    console.error(err);
  }
};

// searchInput
searchBar.addEventListener('keyup', e => {
  const searchString = e.target.value.toLowerCase();

  const filteredEpisodes = episodes.filter(episode => {
    return (
      episode.name.toLowerCase().includes(searchString) ||
      episode.summary.toLowerCase().includes(searchString)
    );
  });

  if (filteredEpisodes.length === '') {
    filterEpisodeNumber.classList.add('hidden');
  } else {
    filterEpisodeNumber.textContent = filteredEpisodes.length;
  }

  displayEpisodes(filteredEpisodes);
});

// make UI
const displayEpisodes = episodes => {
  const htmlString = episodes
    .map(episode => {
      const seasonNumber =
        Number(episode.season) < 10 ? `0${episode.season}` : episode.season;
      const episodeNumber =
        Number(episode.number) < 10 ? `0${episode.number}` : episode.number;
      return `
          <a class="card" href='https://www.tvmaze.com/episodes/${
            episode.id
          }/game-of-thrones-${episode.season}x${episodeNumber}-${episode.name
        .split(' ')
        .join('-')}' target='_blank'>
              <div>
                 <img src="${episode.image.medium}"></img>
                 <ul>
                   <li>${episode.name}</li>
                   <li> S ${seasonNumber}E${episodeNumber}</li>
                   <p>${`${episode.summary.slice(3, -4).slice(0, 100)}...`}</p>
                 </ul>
              </div>
          </a>
      `;
    })
    .join('');
  container.innerHTML = htmlString;
};

// S01E01 - Winter is Coming
// make select option

const displayOptions = episodes => {
  const selection = episodes
    .map((episode, index) => {
      const seasonNumber =
        Number(episode.season) < 10 ? `0${episode.season}` : episode.season;
      const episodeNumber =
        Number(episode.number) < 10 ? `0${episode.number}` : episode.number;
      return `<option value=${index}>S${seasonNumber}E${episodeNumber} - ${episode.name}</option>`;
    })
    .join('');
  selectInput.innerHTML += selection;
};

selectInput.addEventListener('change', e => {
  e.preventDefault();
  const selectItems = Array.from(e.target.children);

  console.log(selectItems);
});

loadEpisodes();

// Get the current year for footer
const year = document.querySelector('#currentYear');
year.innerHTML = new Date().getFullYear();
