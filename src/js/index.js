import "../sass/style.scss";
import svg from './svg.js';


import './modules/Slider';
import './service';


import $ from 'jquery';


$(document).ready(function () {
    $(document).on('click', '.show-sidebar', function () {
        if (this.classList.contains('active')) {
            $(this).removeClass('active');
            $('.sidebar').removeClass('active');
        } else {
            $(this).addClass('active');
            $('.sidebar').addClass('active');
        }
    });
})

const popUp = document.querySelector(".modal");
const openModal = document.querySelector(".content-add-btn");
const closeModal = document.querySelector(".close");
const popUpOverlay = document.querySelector(".modal-overlay")

open = () => {
    popUp.classList.remove('hidden');
    popUpOverlay.classList.remove('hidden');
}

openModal.addEventListener('click', open);
close = () => {

    popUp.classList.add('hidden')
    popUpOverlay.classList.add('hidden');

}

closeModal.addEventListener('click', close);

popUpOverlay.addEventListener('click', close);




