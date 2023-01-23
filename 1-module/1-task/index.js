function factorial(n) {
  let result = 1;
  for (i = 0; i < n; i++) {
    result *= (n - i);      
  }
  return result;
}
