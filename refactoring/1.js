const func = (s, a, b)=> {
  return s.match(/^$/) ? -1 : Math.max(s.indexOf(a), s.indexOf(b))
};

console.log(func('facebook', 'a', '6'));
console.log(func('facebook', 'a', 'o'));
console.log(func('facebook', 'f', 'k'));