function fib(n) {
  let fibArray = [1, 1];
  for (let i = 1; i < n; i++) {
    fibArray.push(fibArray[i] + fibArray[i - 1]);
  }

  fibArray.forEach(n => {
    console.log(n);
  });

  console.log('--ANS--');
  return fibArray[n];
}

console.log(fib(6));
