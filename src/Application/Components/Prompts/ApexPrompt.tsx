import React from "react";
import NavigationPrompt from "react-router-navigation-prompt";
import Modal from "react-modal";

const ApexPrompt = () => {
  return (
    <NavigationPrompt when={true}>
      {({ onConfirm, onCancel }) => (
        <React.Fragment>
          <Modal
            isOpen={true}
            // handleClose={hideModal}
          >
            <button onClick={onCancel}>Cancel</button>
            <button onClick={onConfirm}>Confirm</button>
          </Modal>
        </React.Fragment>
      )}
    </NavigationPrompt>
  );
};

export default ApexPrompt;
