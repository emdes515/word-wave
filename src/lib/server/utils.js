export function getUsersEmailList(usersList) {
	return usersList.users.map((user) => user.email);
}

export function checkUserExistenceByEmail(usersList, email) {
	return usersList.users.some((user) => user.email === email);
}

export function checkUserExistenceByName(usersList, name) {
	return usersList.users.some((user) => user.name === name);
}