'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const NEW_HISTORY = [];
  const NEW_STATE = Object.assign({}, state);

  for (const action of actions) {
    let initialState = {
      ...(NEW_HISTORY[NEW_HISTORY.length - 1] || NEW_STATE),
    };

    switch (action.type) {
      case 'clear':
        initialState = {};
        NEW_HISTORY.push({ ...initialState });
        break;

      case 'addProperties':
        for (const key in action.extraData) {
          initialState[key] = action.extraData[key];
        }
        NEW_HISTORY.push({ ...initialState });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete initialState[key];
        }
        NEW_HISTORY.push({ ...initialState });
        break;
    }
  }

  return NEW_HISTORY;
}

module.exports = transformStateWithClones;
