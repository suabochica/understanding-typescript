/* eslint-disable @typescript-eslint/no-unused-vars */
// Change these functions into generic functions by altering the
// type signatures. There should be no `unknown` types when you are done
function randomFromList<T>(list: T[]) {
  const length = list.length;
  const index = Math.floor(Math.random() * length);
  return list[index];
}
function duplicateList<T>(list: T[], count: number = 1) {
  let output: T[] = [];
  for (let i = 0; i < count; i++) {
    output = output.concat(list);
  }
  return output;
}
function createTuple<T, G>(item1: T, item2: G) {
  return [item1, item2];
}

// Use the following interface to constrain the generic in the next function
interface Length {
  length: number;
}
function getLength<T extends Length>(item: T): number {
  return item.length;
}
