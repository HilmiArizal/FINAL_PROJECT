import React, { Component } from 'react';

class SidebarUser extends Component {

    render() {
        return (
            <div>
                <div style={{ backgroundColor: '#404040', height: '85vh', borderRadius: '20px' }}>
                    <div style={{ backgroundColor: '#404040', color: '#404040', padding: '10%' }}>TEST</div>
                    <div>
                        <a className="s-sidebar__nav-link" href="/profileuser">
                            <div className="text-Center">
                                <center>
                                    EDIT PROFILE
                                </center>
                            </div>
                        </a>
                        <a className="s-sidebar__nav-link" href="/changepass">
                            <div className="text-Center">
                                <center>
                                    CHANGE PASSWORD
                                </center>
                            </div>
                        </a>
                        <a className="s-sidebar__nav-link" href="/deleteaccount">
                            <div className="text-Center">
                                <center>
                                    DELETE ACCOUNT
                                </center>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default SidebarUser;