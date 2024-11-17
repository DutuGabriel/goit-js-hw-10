import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const catImage = document.querySelector('.cat-image');
const catName = document.querySelector('.cat-name');
const catDescription = document.querySelector('.cat-description');
const catTemperament = document.querySelector('.cat-temperament');

const displayLoader = isLoading => {
  loader.style.display = isLoading ? 'block' : 'none';
};

const displayError = errorMessage => {
  Notiflix.Notify.failure(errorMessage);
};

const displayCatInfo = catData => {
  catImage.src = catData.url;
  catName.textContent = catData.breeds[0].name;
  catDescription.textContent = catData.breeds[0].description;
  catTemperament.textContent = `Temperament: ${catData.breeds[0].temperament}`;
  catInfo.style.display = 'block';
};

const fetchAndDisplayBreeds = async () => {
  try {
    displayLoader(true);
    const breeds = await fetchBreeds();
    breedSelect.innerHTML = breeds
      .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
      .join('');
    displayLoader(false);
  } catch (error) {
    displayLoader(false);
    displayError('Oops! Something went wrong! Try reloading the page!');
  }
};

const fetchAndDisplayCatByBreed = async breedId => {
  try {
    displayLoader(true);
    const catData = await fetchCatByBreed(breedId);
    displayCatInfo(catData);
    displayLoader(false);
  } catch (error) {
    displayLoader(false);
    displayError('Oops! Something went wrong! Try reloading the page!');
  }
};

breedSelect.addEventListener('change', () => {
  const breedId = breedSelect.value;
  if (breedId) {
    fetchAndDisplayCatByBreed(breedId);
  }
});

fetchAndDisplayBreeds();
