import { fetch } from './js/fetch';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  useIcon: false,
  fontSize: '20px',
  position: 'right-top',
  width: '350px',
  height: '35px',
  clickToClose: true,
  success: {
    background: '#8ddfff ',
    textColor: '#ffffff',
  },
  failure: {
    background: '#7d8380',
    textColor: '#ffffff',
  },
  info: {
    background: '#80f6a0',
    textColor: '#ffffff',
  },
});

var lightbox = new SimpleLightbox('.gallery a', {});

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const galleryImg = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let page;
let query;

loadMoreBtn.style.visibility = 'hidden';

searchForm.addEventListener('submit', onSubmit);

async function onSubmit(event) {
  event.preventDefault();

  loadMoreBtn.style.visibility = 'hidden';

  galleryImg.innerHTML = '';

  page = 1;

  query = searchInput.value;

  let images = await fetch(query, page);

  if (images.hits.length === 0) {
    Notify.failure('Oppps.. please try again');
    return;
  }

  Notify.success(`Hooray! We found ${images.totalHits} images`);

  createGallery(images);
  loadMoreBtn.style.visibility = 'visible';
}

loadMoreBtn.addEventListener('click', loadMore);

async function loadMore() {
  page += 1;

  let images = await fetch(query, page);

  if (images.hits.length === 0) {
    Notify.info('No more results');
    return;
  }

  createGallery(images);
}

function createGallery(images) {
  images.hits.forEach(image => {
    galleryImg.insertAdjacentHTML(
      'beforeend',
      `<a class="card-info" href="${image.largeImageURL}">
      <div class="photo-card">
          <img class="photo-card-img" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes:</b> ${image.likes}
            </p>
            <p class="info-item">
              <b>Views:</b> ${image.views}
            </p>
            <p class="info-item">
              <b>Comments:</b> ${image.comments}
            </p>
            <p class="info-item">
              <b>Downloads:</b> ${image.downloads}
            </p>
          </div>
        </div>
        </a>`
    );
  });

  lightbox.refresh();
}
