import React from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

const DimmedModal = (props) => {
  const { ButtonLabel, Message } = props;

  return (
    <Modal trigger={<Button>{ButtonLabel}</Button>} basic size="small">
      <Header icon="archive" content="Archive Old Messages" />
      <Modal.Content>
        <p>{Message}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" inverted>
          <Icon name="remove" /> No
        </Button>
        <Button color="green" inverted>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
export default DimmedModal;
