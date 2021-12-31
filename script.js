// upgrades & quick_info
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
// Fetch projects
async function fetch_repos(create_cards=false){
    let response = await fetch("https://api.github.com/users/Rahulvenkatashan/repos");
    let result = await response.json()
    // Loop through all projects
    for(let i = 0; i<result.length;i++){
      // Local variables
      let sub_response = await fetch(`https://raw.githubusercontent.com/Rahulvenkatashan/${result[i].name}/main/README.md`)
      let sub_result = await sub_response.text()
      console.log(sub_result)
      if(!create_cards){ //create the cards

      } else{ //Update more info
        let temp_div = document.createElement('div')
        temp_div.innerHTML = sub_result
        let text = ([...temp_div.querySelectorAll('.upgrades, .quick_info, .summary')].map(elm => elm.innerText)).join(' ')

        if(result[i].name == create_cards){
          console.log(text)
        }
      }
    }
} 

fetch_repos()

//Open Projects
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