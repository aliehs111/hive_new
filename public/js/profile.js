const newFormHandler = async (event) => {
  event.preventDefault();
//create new profile - still need to associate profile with user id
  const buzzName = document.querySelector('#hive-name').value.trim();
  const profileDescription = document.querySelector('#profile-description').value.trim();
  const socialMedia = document.querySelector('#profile-social').value;

  if (buzzName && profileDescription && socialMedia) {
    const response = await fetch(`/api/userRouts`, {
      method: 'POST',
      body: JSON.stringify({ buzzName, profileDescription, socialMedia }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    
    } else {
      alert('Failed to create profile');
    }
  }
};
//delete profile
// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     const response = await fetch(`/api/projects/${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       alert('Failed to delete profile');
//     }
//   }
// };

document
  .querySelector('.profile-submit')
  .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.profile-list')
//   .addEventListener('click', delButtonHandler);
