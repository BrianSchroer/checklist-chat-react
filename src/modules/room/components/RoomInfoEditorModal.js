import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveRoomInfo } from '../../../modules/room/roomDucks';
import { validate } from '../roomInfoValidator';
import { Modal, TextInput } from '../../../modules/core';

export class RoomInfoEditorModal extends React.Component {
  static get propTypes() {
    return {
      room: PropTypes.object.isRequired,
      isNewRoom: PropTypes.bool.isRequired,
      onCloseRequest: PropTypes.func.isRequired,
      actions: PropTypes.object.isRequired
    };
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      room: Object.assign({}, this.props.room),
      isSaving: false,
      isDeleting: false,
      isDirty: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(event) {
    const room = this.state.room;
    room[event.target.name] = event.target.value;
    return this.setState({ room: room, isDirty: true });
  }

  onSave(event) {
    event.preventDefault();

    const { room, isDirty } = this.state;
    const { actions, isNewRoom, onCloseRequest } = this.props;

    if (!isNewRoom && !isDirty) {
      onCloseRequest(event);
      return;
    }

    const validationResponse = validate(room);

    if (!validationResponse.isValid) {
      this.setState({ errors: validationResponse.errors });
      return;
    }

    actions.saveRoomInfo(room);
    onCloseRequest(event);
  }

  render() {
    const { isNewRoom, onCloseRequest } = this.props;
    const { room, errors } = this.state;

    const buttons = (
      <div>
        <input
          type="button"
          value="Cancel"
          className="btn btn-default"
          onClick={onCloseRequest}
        />
        <input
          type="submit"
          value="Save"
          className="btn btn-primary"
          onClick={this.onSave}
        />
      </div>
    );

    return (
      <Modal
        title={isNewRoom ? 'Add Chat Room' : 'Edit Chat Room Info'}
        onCloseRequest={onCloseRequest}
        buttons={buttons}
      >
        <div>
          <TextInput
            name="roomName"
            label="Chat Room Name"
            value={room.roomName}
            onChange={this.onChange}
            error={errors.roomName}
          />

          <TextInput
            name="description"
            label="Room Description"
            rows={2}
            value={room.description}
            onChange={this.onChange}
            error={errors.description}
          />

          <TextInput
            name="phoneInfo"
            label="Phone Info"
            value={room.phoneInfo}
            onChange={this.onChange}
            error={errors.phoneInfo}
          />
        </div>
      </Modal>
    );
  }
}

function emptyRoom() {
  return { id: '', roomName: '', description: '', phoneInfo: '' };
}

export function mapStateToProps(state, ownProps) {
  let isNewRoom = true;
  let room = emptyRoom();

  const [roomId] = state.modalDialogRequest.keys;

  if (roomId) {
    isNewRoom = false;
    const rooms = state.rooms;
    room = rooms.find(room => room.id == roomId);
  }

  const onCloseRequest = ownProps.onCloseRequest;

  return { onCloseRequest, room, isNewRoom };
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ saveRoomInfo }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RoomInfoEditorModal
);
