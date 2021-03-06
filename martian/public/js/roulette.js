// const getLineText = (num) => `<span class="line__text" data-id='${num}'>${num}</span>`;
// const myRoulette = document.querySelector("#myRoulette");

// const length = Math.floor(hexadecimals.length / 2);

const drawRoulette = (length) => {
  let itemHtml = ``;
  for (let i = 0; i < length; i++) {
    itemHtml += `<div class="line line${i + 1}">
          <span class="line__text" data-id='${i}'>${i}</span>
          <span class="line__text" data-id='${(i + 8).toString(16).toUpperCase()}'>${(i + 8).toString(16).toUpperCase()}</span>
          </div>`;
  }
  return itemHtml;
};

export { drawRoulette };
