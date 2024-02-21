// index.js

const ramenBowl = document.getElementById('ramen-menu')


// Callbacks

const handleClick = (ramen) => {
  // Add code
  
  const detailImg = document.getElementById('detail-image')
  const detailName = document.getElementById('detail-name')
  const restaurantName = document.getElementById('restaurant-name')
  const ratingNum = document.getElementById('rating-display')
  const ramenComment = document.getElementById('comment-display')

  detailImg.src = ramen.image
  detailImg.alt = ramen.name
  detailName.innerText = ramen.name 
  restaurantName.innerText = ramen.restaurant
  ratingNum.innerText = ramen.rating
  ramenComment.innerText = ramen.comment
}


const addSubmitListener = () => {
  // Add code

  const addRamenBtn = document.getElementById('submit-button')
  addRamenBtn.addEventListener('click', (e) => {
    e.preventDefault()

    const ramenNameInput = document.getElementById('new-name')
    const ramenResaurantInput = document.getElementById('new-restaurant')
    const ramenImageInput = document.getElementById('new-image')
    const ramenRatingInput = document.getElementById('new-rating')
    const ramenCommentInput = document.getElementById('new-comment')

    const newRamenName = ramenNameInput.value
    const newRamenRestaurant = ramenResaurantInput.value
    const newRamenImg = ramenImageInput.value
    const newRamenRating = ramenRatingInput.value
    const newRamenComment = ramenCommentInput.value


    fetch('http://localhost:3000/ramens', {
      method: 'POST',
      headers: {
        "Content-Type" : "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": newRamenName,
        "restaurant": newRamenRestaurant,
        "image": newRamenImg,
        "rating": newRamenRating,
        "comment": newRamenComment
      })
    })
    .then(response => {
      if(response.ok) {
        ramenNameInput.value = ""
        ramenResaurantInput.value = ""
        ramenImageInput.value = ""
        ramenRatingInput.value = ""
        ramenCommentInput.value = ""
        location.reload()
      } else {
        throw new Error('Failed to add ramen: ' + response.statusText)
      }
    })
    .catch(error => {
      alert('Error adding ramen: ', error)
    })
  })
}


const displayRamens = () => {
  fetch(`http://localhost:3000/ramens`)
  .then(response => {
    if (!response.ok) {
        throw new Error('Failed to load images')
    }return response.json()
  })
  .then(ramenData => {
    
    ramenData.forEach((ramen, index) => {
      const img = document.createElement('img')
      img.src = ramen.image
      img.addEventListener('click', () => handleClick(ramen))
      ramenBowl.appendChild(img)
      if (index === 0) {
        handleClick(ramen);
      }
    })
  })
  .catch(error => {
    console.log("Error on fetch: ", error)
  })
}

const main = () => {
  // Invoke displayRamens here
  displayRamens()
  // Invoke addSubmitListener here
  addSubmitListener()
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
