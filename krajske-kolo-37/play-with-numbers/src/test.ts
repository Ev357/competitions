function GetBits(value) {
  var b = 1;
  var res = [];
  while (b <= value) {
    if (b & value) res.push(b);
    b <<= 1;
  }
  return res;
}

console.log(GetBits(55));