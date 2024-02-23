// index.js

// Callbacks

const displayRamens = () => {

  fetch(`http://localhost:3000/ramens`)
  .then(response => {
    if (!response.ok) {
        throw new Error('Failed to load images')
    }return response.json()
  })
  .then(ramenData => {
    const ramenBowl = document.getElementById('ramen-menu')

    ramenData.forEach((ramen) => {
      const img = document.createElement('img')
      img.src = ramen.image
      img.addEventListener('click', () => handleClick(ramen))
      ramenBowl.appendChild(img)
    })
    if (ramenData.length > 0) {
      displayRamenDetails(ramenData[0])
    }
  })
  .catch(error => {
    alert("Error on fetch: ", error)
  })
}

// Function to display selected ramen's details. Also called to display details of first ramen upon list population.
let currentRamen
const displayRamenDetails = (ramen) => {

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

  currentRamen = ramen
  return currentRamen
}

// Function to update displayed ramen and target selected for delete request.
// Could do with a better way to target for deletion but works just to show successful DELETE request.
// Passes the currently selected ramen into the ramen update handler.
const handleClick = (ramen) => {
  // Add code
  currentRamen = ramen

  displayRamenDetails(ramen)
  
  const deleteButton = document.getElementById('delete-button')
  deleteButton.removeEventListener('click', handleDeleteRequest)
  deleteButton.addEventListener('click', () => handleDeleteRequest(currentRamen))

  handleUpdateRamen(currentRamen)
}

const handleDeleteRequest = (ramen) => {
    fetch(`http://localhost:3000/ramens/${ramen.id}`, {
    method: 'DELETE'
    })
    .then(response => {
      if(!response.ok) {
        throw new Error('Failed to delete featured ramen')
      } 
      return response.json()
    })
    .then(() => {
      location.reload()
    })
    .catch(error => {
      console.log("Error deleting ramen: ", error);
    })
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

const handleUpdateRamen = (currentRamen) => {
  const updateRamenBtn = document.getElementById('update-button')

  const updateRamenHandler = (e) => {
    e.preventDefault()

    const updatedRatingInput = document.getElementById('updated-rating')
    const updatedCommentInput = document.getElementById('updated-comment')

    const updatedRamenRating = updatedRatingInput.value
    const updatedRamenComment = updatedCommentInput.value

    fetch(`http://localhost:3000/ramens/${currentRamen.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type" : "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "rating": updatedRamenRating,
        "comment": updatedRamenComment
      })
    })
    .then(response => {
      if(response.ok) {
        updatedRatingInput.value = ""
        updatedCommentInput.value = ""
        location.reload()
      } else {
        throw new Error('Failed to update ramen: ' + response.statusText)
      }
    })
    .catch(error => {
      alert('Error updating ramen: ' + error);
    })
    updateRamenBtn.removeEventListener('click', updateRamenHandler)
  }
  updateRamenBtn.addEventListener('click', updateRamenHandler)
}

const main = () => {
  // Invoke displayRamens here
  displayRamens()
  // Invoke addSubmitListener here
  addSubmitListener()
  handleUpdateRamen(currentRamen)
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
