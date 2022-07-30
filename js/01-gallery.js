import { galleryItems } from './gallery-items.js';
// Change code below this line

const gallery = document.querySelector('.gallery');

const galleryElTemplate = ({ preview, original, description }) => {
  return `
  <div class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}">
    </a>
  </div>`;
};

const galleryMarkup = galeryItemsArr => {
  return galeryItemsArr.map(galleryElTemplate).join('');
};

let modalWindow;

const closeModalWindowByEscKeyPress = event => {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    modalWindow.close();
  }
};

const onModalWindowByGalleryElementClick = event => {
  event.preventDefault();

  const isImgClick = event.target.nodeName === 'IMG';

  if (!isImgClick) {
    return;
  }

  const imgSource = event.target.dataset.source;
  const imgDescription = event.target.alt;

  const modalWindowTemplate = `
  <div class="modal">
    <img src="${imgSource}" alt="${imgDescription}"/>
  </div>`;

  modalWindow = basicLightbox.create(modalWindowTemplate, {
    onShow: modalWindow => {
      window.addEventListener('keydown', closeModalWindowByEscKeyPress);
    },
    onClose: modalWindow => {
      window.removeEventListener('keydown', closeModalWindowByEscKeyPress);
    },
  });

  modalWindow.show();
};

gallery.insertAdjacentHTML('beforeend', galleryMarkup(galleryItems));

gallery.addEventListener('click', onModalWindowByGalleryElementClick);
