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

  for (const action in actions) {
    let initialState = {
      ...(NEW_HISTORY[NEW_HISTORY.length - 1] || NEW_STATE),
    };

    if (actions[action].type === 'clear') {
      initialState = {};
      NEW_HISTORY.push({ ...initialState });
      continue;
    }

    if (actions[action].type === 'addProperties') {
      for (const key in actions[action].extraData) {
        initialState[key] = actions[action].extraData[key];
      }
      NEW_HISTORY.push({ ...initialState });
    }

    if (actions[action].type === 'removeProperties') {
      for (const key of actions[action].keysToRemove) {
        delete initialState[key];
      }
      NEW_HISTORY.push({ ...initialState });
    }
  }

  return NEW_HISTORY;
}

module.exports = transformStateWithClones;
