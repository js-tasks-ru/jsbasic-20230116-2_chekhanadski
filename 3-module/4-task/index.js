function showSalary(users, age) {
  const newString = users.reduce((str, user) => {
    if (user.age <= age) {
      str += str.length === 0 ? `${user.name}, ${user.balance}` : `\n${user.name}, ${user.balance}`;
    }
    return str;
  }, '');
  return `${newString}`;
}
