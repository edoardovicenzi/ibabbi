export function shuffle(array) {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}
//selects all the secret friends from an array where friends structure is {id: id, name:name}
export function selectSecretFriends(namesArr = []) {
  let shuffled;

  do {
    shuffled = shuffle(namesArr);
  } while (shuffled.some((p, i) => p.id === namesArr[i].id));
  return namesArr.map((person, i) => ({
    ...person,
    secretFriend: shuffled[i],
  }));
}

const friends = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

console.log(selectSecretFriends(friends));
