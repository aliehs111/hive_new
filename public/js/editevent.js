const editEventForm = document.querySelector('.editevent-form');
const eventID = document.querySelector('#id').value;

editEventForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name').value.trim();
  const description = document.querySelector('#description').value.trim();
  const date_scheduled = document.querySelector('#date_scheduled').value;
  const image = document.querySelector('#event_image').value;

  const editEventData = {
    name,
    description,
    date_scheduled,
    image,
  };
  try {
    const response = await fetch(`/api/events/${eventID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editEventData),
    });

    if (response.ok) {
      const data = await response.json();
      window.location.replace('/events/' + eventID);
      // Redirect to a new page or perform other actions
    } else {
      showErrorMsg('Error editing event. Try again.');
    }
  } catch (error) {
    showErrorMsg('Error editing event. Try again.');
  }
});

document
  .querySelector('#del_event')
  .addEventListener('click', async (event) => {


    try {
      const response = await fetch(`/api/events/${eventID}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        window.location.replace('/');
        // Redirect to a new page or perform other actions
      } else {
        showErrorMsg('Error deleting event. Try again.');
      }
    } catch (error) {
      showErrorMsg('Error deleting event. Try again.');
    }
  });
