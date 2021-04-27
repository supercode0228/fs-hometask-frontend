export const CLOSE_MODAL = 'MODALS_CLOSE';
export const OPEN_MODAL = 'MODALS_OPEN';

let NEXT_ID = 1;

export function openModal({
  modalType,
  modalProps = {},
  replace = true,
  wrapped = true,
  userCanClose = true,
  dissmissIn = null,
  onDismissByUser = null,
  onDismissByTimeout = null,
}) {
  const modalId = ++NEXT_ID;

  let dismissAt = null;

  if (dissmissIn !== null) {
    dismissAt = Date.now() + dissmissIn;
  }

  return {
    type: OPEN_MODAL,
    modalId,
    modalType,
    modalProps,
    replace: !!replace,
    wrapped: !!wrapped,
    userCanClose: !!userCanClose,
    dismissAt,
    onDismissByUser,
    onDismissByTimeout,
  };
}

export function closeModal(typeOrID) {
  return { type: CLOSE_MODAL, typeOrID };
}
