const users = [
  { id: 1, name: "Jack Ma", username: "jack@alibaba.com", password: "12345" },
  { id: 2, name: "Jeff Bezos", username: "jeff@amazon.com", password: "54321" },
];

const getUsers = () => users;

const getUserById = (id) => users.find((user) => user.id === id);

const getUserByUsername = (username) =>
  users.find((user) => user.username === username);

const addUser = (user) => {
  user.id = users.length + 1;
  users.push(user);
};

module.exports = {
  getUsers,
  getUserByUsername,
  getUserById,
  addUser,
};
