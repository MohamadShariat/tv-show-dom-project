'use strict';

const container = document.querySelector('.container');
const card = document.querySelector('.card');

const axiosFunc = async () => {
  try {
    const response = await axios.get(
      ' https://api.tvmaze.com/shows/82/episodes'
    );
    console.log(response.data);
    response.data.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('card');

      const image = document.createElement('img');
      image.src = item.image.medium;
      card.appendChild(image);

      const ul = document.createElement('ul');
      card.appendChild(ul);

      const name = document.createElement('li');
      name.textContent = item.name;
      ul.appendChild(name);

      const seasonNumber =
        Number(item.season) < 10 ? `0${item.season}` : item.season;

      const episodeNumber =
        Number(item.number) < 10 ? `0${item.number}` : item.number;

      const episodeCode = document.createElement('li');
      episodeCode.textContent = `S${seasonNumber}E${episodeNumber}`;
      ul.append(episodeCode);

      // const seasonNumberLi = document.createElement('li');
      // seasonNumberLi.textContent = `Season Number : ${seasonNumber}`;
      // ul.append(seasonNumberLi);

      // const episodeNumberLi = document.createElement('li');
      // episodeNumberLi.textContent = `Episode Number : ${episodeNumber}`;
      // ul.append(episodeNumberLi);

      const summary = document.createElement('p');
      summary.innerHTML = `${item.summary.slice(3, -4).slice(0, 100)}...`;
      ul.append(summary);

      const anchor = document.createElement('a');
      anchor.setAttribute('target', '_blank');
      anchor.href = `https://www.tvmaze.com/episodes/${
        item.id
      }/game-of-thrones-${item.season}x${episodeNumber}-${name.innerHTML
        .split(' ')
        .join('-')}`;
      anchor.append(card);
      container.appendChild(anchor);
    });
  } catch (error) {
    console.log(error);
  }
};

axiosFunc();

// Get the current year for footer
const year = document.querySelector('#currentYear');
year.innerHTML = new Date().getFullYear();
