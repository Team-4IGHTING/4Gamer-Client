export function metricNumber(n: bigint) {
  const degrees = ['', 'K', 'M', 'B', 'T'];
  let degreeCount = 0;

  let nSimplified = n;
  for (; nSimplified >= 1000; nSimplified /= 1000n) degreeCount += 1;

  return `${nSimplified}${degrees[degreeCount]}`;
}
