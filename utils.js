'use strict';

// -- Utils ----------------------------------------------------------

// pipe :: (((a, b, …, n) → o), (o → p), …, (x → y), (y → z)) → ((a, b, …, n) → z)
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

// trace :: x -> x
const trace = x => {
  console.log(`== newState:`, x);
  return x;
};
