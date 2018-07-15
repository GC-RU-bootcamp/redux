import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStream } from '../../common/utils';


const mapStateToProps = (state) => {
  return {
    ids: state.webrtc.data,
    loading: state.webrtc.loading
  }
}

class WebRTCPage extends Component {
  constructor(props) {
    super(props);
    this.remoteVideoRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
  if (this.props.ids !== prevProps.ids) {
    this.remoteVideoRef.current.srcObject = getStream(this.props.ids[0]);
  }
}

  render() {
    const { loading } = this.props
    let node
    if(loading){
      node = <div> WE ARE WAITING </div>
    } else {
      node = <video autoPlay ref={this.remoteVideoRef}></video>
    }
    return(
      <div className="flex flex-column flex-auto items-center justify-center mt5">
        {node}
      </div>
    )
  }
}


export default connect(mapStateToProps)(WebRTCPage);
