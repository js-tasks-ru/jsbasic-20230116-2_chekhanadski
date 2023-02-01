function getMinMax(str) {
  let arr = str.split(' ');
    
  let filteredArr = arr.filter((item) => Number.isFinite(+item));
  const newArr = filteredArr.map((item) => +item);
  const max = Math.max(...newArr);
  const min = Math.min(...newArr);
  return {max, min};
}
