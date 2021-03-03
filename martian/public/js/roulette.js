<<<<<<< HEAD
// const getLineText = (num) => `<span class="line__text" data-id='${num}'>${num}</span>`;
=======
// const myRoulette = document.querySelector("#myRoulette");

// const length = Math.floor(hexadecimals.length / 2);

const getLineText = (num) => `<span class="line__text">${num}</span>`;
>>>>>>> 32c4567 ([Add] Promise)

const getRoulette = (length) => {
  let itemHtml = ``;
  for (let i = 0; i < length; i++) {
    itemHtml += `<div class="line line${i + 1}">
<<<<<<< HEAD
          <span class="line__text" data-id='${i}'>${i}</span>
          <span class="line__text" data-id='${(i + 8).toString(16).toUpperCase()}'>${(i + 8).toString(16).toUpperCase()}</span>
=======
            ${getLineText(i)}
            ${getLineText((i + 8).toString(16).toUpperCase())}
>>>>>>> 32c4567 ([Add] Promise)
        </div>`;
  }
  return itemHtml;
};

export { getRoulette };
