// delay
function timer(timeInMs){
  const end_time = new Date().getTime() + timeInMs
  let current_time = new Date().getTime()
  while (current_time < end_time){
    current_time = new Date().getTime()
    console.log(current_time)
  }
}

// Hamburger 
const hamburger = document.querySelector('.hamburger')

hamburger.onclick = () => {
  //hamburger animation
  document.querySelector('main').style.filter = document.querySelector('main').style.filter == '' ? "brightness(10%)" : '';
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
async function fetch_repos(create_cards = false, elm = false) {
  var r = document.querySelector(':root');
  let response = await fetch("https://api.github.com/users/Rahulvenkatashan/repos");
  let result = await response.json()

  // Loop through all projects
  try {
    for (let i = 0; i < result.length; i++) {
      // Local variables
      let sub_response = await fetch(`https://raw.githubusercontent.com/Rahulvenkatashan/${result[i].name}/main/README.md`)
      let sub_result = await sub_response.text()
      let temp_div = document.createElement('div')
      temp_div.innerHTML = sub_result
      let text = ([...temp_div.querySelectorAll('.upgrades, .quick_info, .summary')])

      if (!create_cards) { //create the cards
        const card_container = document.createElement('div')
        card_container.classList.add('card')
        card_container.style.backgroundImage = `url(${text[2].dataset.image})`
        card_container.innerHTML = `<div class="card-content"><ul class="projects-summary"><li class="first-point"><h2>${result[i].name}</h2></li><li class="second-point"><p>${text[2].dataset.summaryType}</p></li><li class="third-point"><button>More</button></li></ul></div>`
        document.querySelector(".card-container").appendChild(card_container);

      } else { //Update more info
        if (result[i].name.toString().trim() == create_cards.toString().trim()) {    
          // Update project title
          document.querySelector('.project-title p').innerText = create_cards
          // Update quick summary
          document.querySelector('.project-summary p').innerText = (text.slice(0, 2).map(x => x.innerText)).join(' ')
          // Update bg image
          let excess = ((((document.querySelector('.project-summary').offsetHeight / 500) * 100) + 15 + 60) - 100) * -1
          r.style.setProperty('--leftover_height', `${60 + excess}%`)
          document.querySelector('.project-image .img').style.backgroundImage = elm.style.backgroundImage;
        }
      }
    }
  } catch{
    console.warn('The repo no longer exists ); ')
  }
}


//Open Projects
$(document).on('click', '.card-content', async function () {
  const card_overlays = document.querySelectorAll('.card-content');
  for (const elm of card_overlays) {
    if (elm != this) {
      $(elm).removeClass('card-container-active')
    }
  }
  $(this).toggleClass('card-container-active');
  await fetch_repos(this.parentElement.querySelector('.first-point').innerText, this.parentElement)
 
})
// Display more info
$(document).on('click', '.third-point', function () {
  $('.more_info').addClass('more_info_open')
  document.querySelector('.card-container').style.filter = "brightness(30%)"
  document.body.style.overflow = 'hidden';
})

// Remove more info
$(document).on('click', '.close', function () {
  $('.more_info').removeClass('more_info_open')
  document.querySelector('.card-container').style.filter = ''
  document.body.style.overflow = '';
})

// Smooth scroll
const link_to_pages = {
  'p1': 'home',
  'p2': 'projects',
  'p3': 'contact'
}

$('.links li').click(function () {
  //hamburger animation
  document.querySelector('main').style.filter = document.querySelector('main').style.filter == '' ? "brightness(10%)" : '';
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

// Driver code
fetch_repos()

// Loader image
$(".loader_image").delay(1250).fadeOut();
$(".loader").delay(1250).fadeOut("slow");
