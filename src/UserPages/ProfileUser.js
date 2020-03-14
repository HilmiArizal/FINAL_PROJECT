import React, { Component } from 'react';
import NavbarUser from '../Component/NavbarUser';
import '../CSSAdmin/Homepage.css';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact'
import { connect } from 'react-redux';
import SidebarUser from '../Component/SidebarUser';
import AvatarMen from '../Image/AKUNIMAGE.png';
import AvatarWomen from '../Image/AKUNIMAGEWOMEN.png';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';

class ProfileUser extends Component {

    state = {
        profile: [],
        gender: [],
        job: [],

        editGenderId: 0,
        editJobId: 0,
        editGender: '',
        editJob: '',

        image: undefined,
        previewImage: undefined,
        changeImage: false
    }

    componentDidMount() {
        this.getGenderUser()
        this.getJobUser()
    }

    componentDidUpdate() {
        if (this.props.id) {
            return this.getProfileUser()
        }
    }

    getProfileUser() {
        Axios.get(API_URL_1 + `users/getProfileUser/${this.props.id}`)
            .then((res) => {
                this.setState({ profile: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    getGenderUser() {
        Axios.get(API_URL_1 + `users/getGender`)
            .then((res) => {
                this.setState({ gender: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    getJobUser() {
        Axios.get(API_URL_1 + `users/getJob`)
            .then((res) => {
                this.setState({ job: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })
    }

    onChangeSelectGender = (e) => {
        this.setState({ editGenderId: e.target.value })
        this.setState({ editGender: e.target[e.target.selectedIndex].text })
        // console.log(e.target.value)
        // console.log(e.target[e.target.selectedIndex].text)
    }

    onChangeSelectJob = (e) => {
        this.setState({ editJobId: e.target.value })
        this.setState({ editJob: e.target[e.target.selectedIndex].text })
        // console.log(e.target.value)
        // console.log(e.target[e.target.selectedIndex].text)
    }

    saveEditProfile = async () => {
        try {
            let firstname = this.refs.editfirstname.value;
            let lastname = this.refs.editlastname.value;
            let phonenumber = this.refs.editphonenumber.value;
            let age = this.refs.editage.value;
            let genderId = parseInt(this.state.editGenderId);
            let jobId = parseInt(this.state.editJobId);
            let address = this.refs.editaddress.value;
            let dataprofile = {
                firstname, lastname, phonenumber, age, genderId, jobId, address
            }
            const res = await Axios.patch(API_URL_1 + `users/editProfileUser/${this.props.id}`, dataprofile)
            this.getProfileUser()
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    renderInputProfile = () => {
        return this.state.profile.map((item, index) => {
            return (
                <MDBRow >
                    <MDBCol size="6" >
                        <center>First Name</center>
                        <input type="text" className="form-control" ref="editfirstname" defaultValue={item.firstname} />
                        <br />
                        <center>Last Name</center>
                        <input type="text" className="form-control" ref="editlastname" defaultValue={item.lastname} />
                        <br />
                        <MDBRow>
                            <MDBCol size="6">
                                <center>Phone Number</center>
                                <input type="text" className="form-control" ref="editphonenumber" defaultValue={item.phonenumber} />
                            </MDBCol>
                            <MDBCol size="6">
                                <center>Age</center>
                                <input type="number" className="form-control" ref="editage" defaultValue={item.age} />
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                    <MDBCol size="6">
                        <MDBRow>
                            <MDBCol size="6">
                                <center>Gender</center>
                                <select className="form-control" onChange={this.onChangeSelectGender} defaultValue={item.genderId}>
                                    <option>Gender</option>
                                    {this.renderGender()}
                                </select>
                            </MDBCol>
                            <MDBCol size="6">
                                <center>Job</center>
                                <select className="form-control" onChange={this.onChangeSelectJob} defaultValue={item.jobId}>
                                    <option>Job</option>
                                    {this.renderJob()}
                                </select>
                            </MDBCol>
                        </MDBRow>
                        <div style={{ marginTop: 30 }}>
                            <center>Address</center>
                            <div className="form-group">
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="4"
                                    ref="editaddress"
                                    defaultValue={item.address}
                                />
                            </div>
                        </div>
                    </MDBCol>
                </MDBRow>
            )
        })
    }

    renderProfile = () => {
        return this.state.profile.map((item, index) => {
            return (
                <MDBCol size="6" key={index}>
                    <div className="row">
                        <div className="col-5"> Email </div><div className="col-7">: {this.props.email}</div>
                        <div className="col-5"> Username </div><div className="col-5">: {this.props.username}</div>
                        <div className="col-5"> FullName </div><div className="col-7">: {item.firstname} {item.lastname}</div>
                        <div className="col-5"> Phone Number </div><div className="col-7">: {item.phonenumber}</div>
                        <div className="col-5"> Age </div><div className="col-7">: {item.age}</div>
                        <div className="col-5"> Gender </div><div className="col-7">: {item.gender}</div>
                        <div className="col-5"> Address </div><div className="col-7">: {item.address}</div>
                    </div>
                </MDBCol>
            )
        })
    }

    renderGender = () => {
        return this.state.gender.map((item, index) => {
            return (
                <option value={item.id} key={index}>
                    {item.gender}
                </option>
            )
        })
    }

    renderJob = () => {
        return this.state.job.map((item, index) => {
            return (
                <option value={item.id} key={index}>
                    {item.job}
                </option>
            )
        })
    }

    render() {

        return (
            <div>
                <NavbarUser />
                <MDBContainer>
                    <MDBRow >
                        <MDBCol size="4">
                            <SidebarUser />
                        </MDBCol>
                        <MDBCol size="8">
                            <center>
                                <div style={{ margin: '3%', fontFamily: 'Hammersmith One, sans-serif', fontSize: '200%' }}> Hi, {this.props.username} </div>
                            </center>
                            <div style={{ border: '2px solid black' }}> </div>
                            <br />
                            <MDBRow>
                                <MDBCol size="6" className="d-flex justify-content-center">
                                    {
                                        this.props.gender === 1
                                            ?
                                            <img src={AvatarMen} style={{ height: 170, width: 170 }} />
                                            :
                                            this.props.gender === 2
                                                ?
                                                <img src={AvatarWomen} style={{ height: 170, width: 170 }} />
                                                :
                                                ''
                                    }
                                </MDBCol>
                                {this.renderProfile()}
                            </MDBRow>
                            <div style={{ border: '2px solid black', margin: '3% 0px 3% 0px' }}> </div>
                            {this.renderInputProfile()}
                            <MDBRow>
                                <MDBCol size="4">
                                    <MDBRow>

                                    </MDBRow>
                                </MDBCol>
                                <MDBCol size="4">
                                    <MDBRow className="d-flex justify-content-center">
                                        <MDBBtn color="elegant" size="sm" onClick={this.saveEditProfile}>Save</MDBBtn>
                                    </MDBRow>
                                </MDBCol>
                                <MDBCol size="4">
                                    <MDBRow>

                                    </MDBRow>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div >
        );
    }
}

const mapStatetoProps = (state) => {

    return {
        id: state.user.id,
        username: state.user.username,
        email: state.user.email,
        gender: state.user.gender,

    }
}

export default connect(mapStatetoProps)(ProfileUser);