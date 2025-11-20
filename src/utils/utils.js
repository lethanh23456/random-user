export const mapUserData = (user) => ({
  id: user.login.uuid,
  firstName: user.name.first,
  lastName: user.name.last,
  email: user.email,
  phone: user.phone,
  avatar: user.picture.large,
  country: user.location.country,
  city: user.location.city,
  age: user.dob.age,
  gender: user.gender,
});


export const loadUsersFromStorage = () => {
  const data = localStorage.getItem('users');
  return data ? JSON.parse(data) : [];
};


export const saveUsersToStorage = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};