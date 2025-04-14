// Product's rating
let boxStar = document.getElementsByClassName('box-star');

// The looping based on elements length
for (let i of boxStar) {
  // The looping limit is based of elements id (between 1 of 5)
  // Creating the yellow stars
  for(let j = 0; j < Number(i.id); j++) {
    i.innerHTML += '<i class="fa fa-star" style="color:#dced17"></i>';
  }
  
  // Creating the black stars
  for(let k = 0; k < 5 - Number(i.id); k++) {
    i.innerHTML += '<i class="fa fa-star" style="color:#5f5f5f"></i>';
  }
}