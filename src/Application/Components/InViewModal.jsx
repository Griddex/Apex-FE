import React from "react";
import { Button, Modal } from "semantic-ui-react";
import history from "./../Services/HistoryService";

const InRouteModal = (props) => {
  const { modalOpen, size, message, actions } = props;

  return (
    <Modal size={size} open={modalOpen}>
      <Modal.Header icon="user">Confirm Logout</Modal.Header>
      <Modal.Content>
        <p>{message}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => actions.logoutCloseModalAction()}>
          No
        </Button>
        <Button
          positive
          icon="checkmark"
          labelPosition="right"
          content="Yes"
          onClick={() => {
            actions.logoutAction();
            history.replace("/login");
          }}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default InRouteModal;
