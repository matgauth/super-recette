const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

// trace :: (String -> a) -> a
const trace = label => x => {
  console.log(`== ${label}:`, x);
  return x;
};
