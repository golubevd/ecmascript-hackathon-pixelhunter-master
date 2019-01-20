export function getScreensFromTemplate(htmContent) {

    const wrapper = document.createElement(`section`);

    wrapper.classList.add(`central`);
    wrapper.insertAdjacentHTML(`afterbegin`, htmContent);

    return wrapper;
}


function scaleImage(img, width, height) {
   const imgHeight = img.naturalHeight;
    const imgWidth = img.naturalWidth;

    const ratio = imgWidth / imgHeight;

    img.width = ((width / ratio) < height) ? width : height * ratio;
    img.height = ((width / ratio) < height) ? width / ratio : height;
}


function loadImage(src, onLoadDone) {

  let timeout = null;
  const LOAD_TIMEOUT = 5000;
  const image = new Image();

  image.addEventListener(`load`, () => {
    clearTimeout(timeout);

    if (typeof onLoadDone === `function`){
        onLoadDone(image);
    }
  });

  timeout = setTimeout(() => {
    image.src = ``;
  }, LOAD_TIMEOUT);

  image.src = src;
}


export function loadImages(parent, width, height, onLoadDone) {

  const images = Array.from(parent.querySelectorAll(`img`))
  .filter((img) => img.hasAttribute(`data-src`));

    let imgsCount = images.length;

  images.forEach((img) => loadImage(img.dataset.src, (image) => {
        scaleImage(image, width, height);
      image.alt = img.alt;
      img.parentNode.replaceChild(image, img);

        if (--imgsCount === 0 && typeof onLoadDone === `function`) {
            onLoadDone();
        }
    }));
}
