/**
 * helpers
 */

import HttpError from './../component/http/HttpError.js';

export function attachIndexToDom(nodeList, selector) {
  const selectorFlag = selector? 'hasSelector' : 'noSelector';
  const handler = {
    noSelector(elem, i) {
      elem.index = i;
    },
    hasSelector(elem, i) {
      elem.querySelector(selector).index = i;
    }
  }[selectorFlag];

  nodeList.forEach(handler);
}

export async function getFetchData({ url }) {
  const successCodeRange = '2[0-9][0-9]';
  const response = await fetch(url);
  
  if (RegExp(successCodeRange).test(response.status)) {
    return await response.json();
  } else {
    throw new HttpError(response);
  }
}

export function fadeOutElem(elem, OPACITY_INTERVAL_VALUE = 0.01) {
  return new Promise((resolve) => {
    elem.style.opacity = 1;

    function decreaseOpacity() {
      if ((elem.style.opacity -= OPACITY_INTERVAL_VALUE) <= 0) {
        elem.style.opacity = 0;
        resolve();
      } else {
        requestAnimationFrame(decreaseOpacity);
      }
    }
    decreaseOpacity();
  });
}

export function fadeInElem(elem, OPACITY_INTERVAL_VALUE = 0.01) {
  return new Promise((resolve) => {
    elem.style.opacity = 0;

    function increaseOpacity() {
      let opacityVal = parseFloat(elem.style.opacity);
      if (!((opacityVal += OPACITY_INTERVAL_VALUE) >= 1)) {
        elem.style.opacity = opacityVal;
        requestAnimationFrame(increaseOpacity);        
      } else {
        elem.style.opacity = 1;
        resolve();
      }
    }
    increaseOpacity();
  });
}