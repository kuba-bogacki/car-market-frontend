export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user !== null) {
    return {'Authorization': 'Bearer ' + user.token};
  } else {
    return null;
  }
}