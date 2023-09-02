const logout = async (event) => {
  event.preventDefault();

  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  console.log(response.status);
  if (response.status === 204) {
    document.location.replace('/login');
    console.log('SOS');
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector('#logout')
  .addEventListener('click', logout);