function showSalary(users, age) {
  const filteredUsers = users.filter((user) => user.age <= age);
  const updatedUsers = filteredUsers.map((user) => `${user.name}, ${user.balance}`);
  return `${updatedUsers.join('\n')}`;
}
