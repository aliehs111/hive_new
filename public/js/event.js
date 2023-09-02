const eventFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the event form
    const name = document.querySelector('#name').value.trim();
    const description = document.querySelector('#description').value.trim();
    const date_scheduled = document.querySelector('#date_scheduled').value
    const image = document.querySelector('#event_image').value
  
    if (name && description && date_scheduled && image) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify({ name, description, date_scheduled, image}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the home page
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };



  document.querySelector('.newevent-form').addEventListener('submit', eventFormHandler);