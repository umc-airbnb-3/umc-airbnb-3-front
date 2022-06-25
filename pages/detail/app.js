const $gnbFixed = document.querySelector(".gnb-fixed");

function fixedDisplay(){
  $gnbFixed.classList.toggle("invisible");
};

document.addEventListener('scroll', function(){
  let currentScrollValue = document.documentElement.scrollTop;
  if(currentScrollValue >= 624) {
    $gnbFixed.classList.remove("invisible");
  }else if(currentScrollValue < 624){
    $gnbFixed.classList.add("invisible");
  }
});
