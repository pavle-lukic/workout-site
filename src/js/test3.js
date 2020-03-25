const arr = ['a', 'b', 't', 'g', 'c', 'b', 'a', 'd', 'f', 'a', 'b'];
const arrr = [...new Set(arr)];
arrr.sort();
console.log(arrr);
const indArr = arrr.map((el, index) => {
  return index;
});
console.log(indArr.join(''));
