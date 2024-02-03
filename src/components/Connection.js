import '../css/Connection.css';
import WifiOn from '../wifi.svg'
import WifiOff from '../wifi-off.svg'
import React from 'react';

class Connection extends React.Component {

    constructor(props) {
        super(props)

        const statusOnline = {
            className: 'wifiOn',
            status: 'Online'
        }

        const statusOffline = {
            className : 'wifiOff',
            status: 'Offline'
        }

        this.state = statusOnline

        window.addEventListener("offline", (event) => {
            this.setState(statusOffline)
        });
        
        window.addEventListener("online", (event) => {
            this.setState(statusOnline)
        });
    
    }
   
    render() {
        return (
            <div class="Connection-container">
                <img src={WifiOff} className={this.state.className} alt="WiFi Status"  style={this.state.status == 'Online' ? { display: 'none' } : undefined}/>
                <img src={WifiOn} className={this.state.className} alt="WiFi Status"  style={this.state.status == 'Offline' ? { display: 'none' } : undefined}/>
                <span>{this.state.status}</span>
            </div>
        );
    }
}

export default Connection;