// Disable scroll
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

// Hamburger 
const hamburger = document.querySelector('.hamburger')

hamburger.onclick = () => {
  //hamburger animation
  document.querySelector('main').style.filter = document.querySelector('main').style.filter == ''?"brightness(10%)":'';
  hamburger.classList.toggle("toggle");
  $('.menu').toggleClass('mo')
  setTimeout(function () {
    $('.links').toggleClass('openul')
    for (const elm of document.querySelector('.links').children) {
      $(elm).toggleClass('ol')
    }
  }, 300)
}

//Projects
$('.card-content').click(function(){
  const card_overlays = document.querySelectorAll('.card-content');
  for(const elm of card_overlays){
    if(elm != this){
      $(elm).removeClass('card-container-active')
    }
  }

  $(this).toggleClass('card-container-active')
})

// Display more info
$('.third-point').click(function(){
  $('.more_info').addClass('more_info_open')
  document.querySelector('.card-container').style.filter = "brightness(30%)"
  disableScroll()
})

// Remove more info
$('.close').click(function(){
  $('.more_info').removeClass('more_info_open')
  document.querySelector('.card-container').style.filter = ''
  enableScroll()
})

// Smooth scroll
const link_to_pages = {
  'p1':'home',
  'p2':'projects',
  'p3':'contact'
}

$('.links li').click(function(){
  //hamburger animation
  document.querySelector('main').style.filter = document.querySelector('main').style.filter == ''?"brightness(10%)":'';
  hamburger.classList.toggle("toggle");
  $('.menu').toggleClass('mo')
  setTimeout(function () {
    $('.links').toggleClass('openul')
    for (const elm of document.querySelector('.links').children) {
      $(elm).toggleClass('ol')
    }
  }, 300)
  window.scrollTo(0, document.getElementById(link_to_pages[this.id]).offsetTop)
})