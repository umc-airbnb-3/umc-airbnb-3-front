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

