import React, {PropTypes} from 'react';
import NewEvent from '../components/NewEvent';

import ActionCable from 'actioncable';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.createEvent = this.createEvent.bind(this);
  }

  registerRoom (roomInfo) {
    $.ajax({
      url: '/rooms',
      type: 'POST',
      data: {room: roomInfo},
      error: () => {
        alert("Room is failed to create!");
      }
    });
  }

  createEvent(eventData) {
    console.log('App.Createevent EXECUTED!');
    $.ajax({
      url: '/events',
      type: 'POST',
      data: {event: eventData},
      success: (response) => {
        console.log('the response is ', response);
        const roomInfo = {
          title: response.title,
          event_id: response.id
        };
        console.log('here is the roomInfo', roomInfo);
        this.registerRoom(roomInfo);
      },
      error: (response)=>{
        // alert("Error creating an event");
        console.log(response);
      }
    });
  }

  render() {
    return (
      <div>
        <NewEvent createEvent={this.createEvent} />
      </div>
    );
  }
}