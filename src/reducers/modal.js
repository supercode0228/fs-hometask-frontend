import { CLOSE_MODAL, OPEN_MODAL } from '../actions/modal';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL: {
      const newState = [...state];

      if (action.replace) {
        let index = 0;

        while (index < newState.length) {
          if (newState[index].modalType !== action.modalType) {
            ++index;
            continue;
          }

          newState.splice(index, 1);
        }
      }

      newState.push({
        ...action,
      });

      return newState;
    }

    case CLOSE_MODAL: {
      const newState = [...state];
      let index = 0;

      while (index < newState.length) {
        if (
          newState[index].modalType !== action.typeOrID &&
          newState[index].modalId !== action.typeOrID
        ) {
          ++index;
          continue;
        }

        newState.splice(index, 1);
      }

      return newState;
    }

    default: {
      return state;
    }
  }
}
