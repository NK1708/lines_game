const drawRating = (number) => {
  let point = (number != 0) ? Math.ceil(number / 20) : 1;
  if (point < 6) {
    return Array(point + 1).join("★") + Array(6 - point).join("☆");
  } else {
    return 'error';
  }
};

console.log(drawRating(0) ); // ★☆☆☆☆
console.log(drawRating(1) ); // ★☆☆☆☆
console.log(drawRating(50)); // ★★★☆☆
console.log(drawRating(99)); // ★★★★★