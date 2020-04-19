import React from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import history from "./../Services/HistoryService";

const DimmedModal = (props) => {
  const { isOpen, Message } = props;
  return (
    <Modal basic size="small" open={isOpen}>
      <Header icon="archive" content="Archive Old Messages" />
      <Modal.Content>
        <p>{Message}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" inverted>
          <Icon name="remove" /> No
        </Button>
        <Button
          color="green"
          inverted
          onClick={() => history.replace("/login")}
        >
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
export default DimmedModal;
