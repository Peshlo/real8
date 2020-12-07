import React, { Component } from 'react';
import io from 'socket.io-client'
import {Button} from 'react-bootstrap'

class videocall extends Component {
    constructor(props) {
        super(props)
        this.localVideoref = React.createRef()
        this.remoteVideoref = React.createRef()
    
        this.socket = null
        this.candidates = []
      }
    
      componentDidMount = () => {
    
        this.socket = io(
          '/webrtcPeer',
          {
            path: '/webrtc',
            query: {}
          }
        )
    
        this.socket.on('connection-success', success => {
          console.log(success)
        })
    
        this.socket.on('offerOrAnswer', (sdp) => {
          this.pc.setRemoteDescription(new RTCSessionDescription(sdp))
        })
    
        this.socket.on('candidate', (candidate) => {
          this.pc.addIceCandidate(new RTCIceCandidate(candidate))
        })
    
        // const pc_config = null
    
        const pc_config = {
          "iceServers": [
            {
              urls: 'stun:stun.l.google.com:19302'
            }
          ]
        }
    
        this.pc = new RTCPeerConnection(pc_config)
    
        this.pc.onicecandidate = (e) => {
          if (e.candidate) {
            this.sendToPeer('candidate', e.candidate)
          }
        }
    
        this.pc.onaddstream = (e) => {
          this.remoteVideoref.current.srcObject = e.stream
        }
    
        const success = (stream) => {
          window.localStream = stream
          this.localVideoref.current.srcObject = stream
          this.pc.addStream(stream)
        }
    
        const failure = (e) => {
          console.log('getUserMedia Error: ', e)
        }
    
        const constraints = {
          audio: true,
          video: true,
        }
    
        navigator.mediaDevices.getUserMedia(constraints)
          .then(success)
          .catch(failure)
      }
    
      startVC() {
    
      }
    
      cancelVC() {
    
      }
    
      sendToPeer = (messageType, payload) => {
        this.socket.emit(messageType, {
          socketID: this.socket.id,
          payload
        })
      }
    
      createOffer = () => {
        this.pc.createOffer({ offerToReceiveVideo: 1 })
          .then(sdp => {
            this.pc.setLocalDescription(sdp)
            this.sendToPeer('offerOrAnswer', sdp)
          })
      }
    
      createAnswer = () => {
        console.log('Answer')
        this.pc.createAnswer({ offerToReceiveVideo: 1 })
          .then(sdp => {
            this.pc.setLocalDescription(sdp)
    
            this.sendToPeer('offerOrAnswer', sdp)
          })
      }
    
      addCandidate = () => {
        this.candidates.forEach(candidate => {
          console.log(JSON.stringify(candidate))
          this.pc.addIceCandidate(new RTCIceCandidate(candidate))
        });
      }
    
      render() {
        return (
          <div className="">
            <div class="receiverDiv">
              <video
                className="receiver"
                //style={{ background: "transparent", width: "100%", height: "100%",  borderRadius: "2.5rem"}}
                ref={this.localVideoref}
                autoPlay playsinline>
              </video>
              <div class="callerDiv">
                <video
                  //style={{ background: "transparent", width: "100%", height: "100%",  borderRadius: "0.5rem",borderColor:"red",border:"1px" }}
                  className="caller"
                  ref={this.remoteVideoref}
                  autoPlay playsinline>
                </video>
              </div>
            </div>
            <div className="">
            <!--<Button variant="outline-light" className="connectbtn1" onClick={this.createOffer}>Call</Button>&nbsp;&nbsp;&nbsp;&nbsp;--->
            <Button variant="outline-light" className="connectbtn1"onClick={this.createAnswer}>Accept</Button>
            </div>
          </div>
        );
      }
}

export default videocall;
