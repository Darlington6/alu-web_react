import { Map } from 'immutable';

export const map = Map({
  1: 'Liam',
  2: 'Noah',
  3: 'Elijah',
  4: 'Oliver',
  5: 'Jacob',
  6: 'Lucas',
});

export const map2 = map.withMutations(function () {
  // use arguments to avoid introducing new variable names
  arguments[0].set('2', 'Benjamin').set('4', 'Oliver');
});
