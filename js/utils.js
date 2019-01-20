export function resizeImage(frame, given) {
    const ratio = given.width / given.height;

    const actualWidth = ((frame.width / ratio) < frame.height)
    ? frame.width
    : frame.height * ratio;

    const actualHeight = ((frame.width / ratio) < frame.height)
    ? frame.width * ratio
    : frame.height;

    return {
        width: actualWidth,
        height: actualHeight
    };
}


export function loadImage(src, onLoadCompleted) {

  let timeout = null;
  const LOAD_TIMEOUT = 5000;
  const img = new Image();

  img.addEventListener(`load`, () => {
    clearTimeout(timeout);

    if (typeof onLoadCompleted === `function`){
        onLoadCompleted(img);
    }
  });

    img.addEventListener('error', () => {
        clearTimeout(timeout);

        if(typeof onLoadCompleted === `function`) {
            onLoadCompleted();
        }
    });

  timeout = setTimeout(() => {
    img.src = ``;
  }, LOAD_TIMEOUT);

 img.src = src;
}


export function loadImages(srcArray, onLoadCompleted) {

  const imgs = [];

    let imgsCount = srcArray.length;
    srcArray.forEach((src, index) => {
        loadImage(src, (img) => {
            imgs[index] = img;
            imgsCount--;

             if (!imgsCount && typeof onLoadCompleted === `function`) {
            onLoadCompleted(imgs);
          }
        });
    });

}
