import { Map } from 'immutable';
import rootReducer from './rootReducer';

describe('rootReducer', () => {
  it('returns the initial state structure', () => {
    const state = rootReducer(undefined, {});

    expect(Map.isMap(state.courses)).toBe(true);
    expect(Map.isMap(state.notifications)).toBe(true);
    expect(Map.isMap(state.ui)).toBe(true);
  });
});
