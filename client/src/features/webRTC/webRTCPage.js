import React, { Component } from 'react';

class WebRTCPage extends Component {
  render() {
    const dummyStream = new MediaStream();
    console.log(dummyStream)
    dummyStream.addTrack({id:1});
    console.log(dummyStream);
    return(
      <div className="flex flex-column flex-auto items-center justify-center mt5">
        <div> VIDEO GOES HERE</div>
      </div>
    )
  }
}


export default WebRTCPage;
