"use strict";
const eventHandler = (src) => {
  const imgList = document.querySelectorAll('.backImage');
  for (let i = 0; i < imgList.length; i++) {
    imgList[i].classList.remove('active');
  }
  document.querySelector(`.${src}`).classList.add('active');
};
