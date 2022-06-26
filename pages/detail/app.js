const $gnbFixed = document.querySelector(".gnb-fixed");

function fixedDisplay(){
  $gnbFixed.classList.toggle("blind");
};

window.addEventListener("scroll", (event) => {
  let scrollY = this.scrollY;
  if (scrollY >= 624){
    $gnbFixed.classList.remove("blind");
  } else if (scrollY < 624){
    $gnbFixed.classList.add("blind");
  }
});

//============
function goPrevious() {
  document.querySelector(".sleeping-place-scroll-snap").scrollBy({ 
    left: - 670,
    behavior: 'smooth' 
  });
};

function goNext() {
  document.querySelector(".sleeping-place-scroll-snap").scrollBy({ 
    left: 670,
    behavior: 'smooth' 
  });
};

