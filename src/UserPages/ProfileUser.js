import React, { Component } from 'react';
import NavbarUser from '../Component/NavbarUser';
import '../CSSAdmin/Homepage.css';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact'
import { connect } from 'react-redux';
import SidebarUser from '../Component/SidebarUser';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import Swal from 'sweetalert2';

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

    addImage = (e) => {
        if (e.target.files[0]) {
            this.setState({
                image: e.target.files[0],
                previewImage: URL.createObjectURL(e.target.files[0]),
                changeImage: true
            })
        }
    }

    saveEditProfile = async () => {
        try {
            let formData = new FormData();
            let firstname = this.refs.editfirstname.value;
            let lastname = this.refs.editlastname.value;
            let phonenumber = this.refs.editphonenumber.value;
            let age = this.refs.editage.value;
            let genderId = parseInt(this.state.editGenderId);
            let jobId = parseInt(this.state.editJobId);
            let address = this.refs.editaddress.value;
            let changeImage = this.state.changeImage;
            let dataprofile = {
                firstname, lastname, phonenumber, age, genderId, jobId, address
            }
            let profilecomplete = {
                dataprofile,
                changeImage
            }
            formData.append('profilecomplete', JSON.stringify(profilecomplete))
            formData.append('image', (this.state.image))
            // console.log(this.state.image)
            await Axios.patch(API_URL_1 + `users/editProfileUser/${this.props.id}`, formData)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Profile Success!`,
                showConfirmButton: false,
                timer: 1500
            })
            this.getProfileUser()
            // console.log(res.data)
        } catch (err) {
            // console.log(err)
        }
    }

    renderInputProfile = () => {
        return this.state.profile.map((item, index) => {
            return (
                <MDBRow style={{ fontFamily: 'Hammersmith One, sans-serif' }}>
                    <MDBCol size="6" >
                        <div className="row">
                            <div className="col-4" style={{ marginTop: 5 }}>Nama Depan</div>
                            <div className="col-8"><input type="text" className="form-control" ref="editfirstname" defaultValue={item.firstname} /></div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-4" style={{ marginTop: 5 }}>Nama Belakang</div>
                            <div className="col-8"><input type="text" className="form-control" ref="editlastname" defaultValue={item.lastname} /></div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-4" style={{ marginTop: 5 }}>No. Handphone</div>
                            <div className="col-8"> <input type="text" className="form-control" ref="editphonenumber" defaultValue={item.phonenumber} /></div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-4" style={{ marginTop: 5 }}>Usia</div>
                            <div className="col-8"> <input type="number" className="form-control" ref="editage" defaultValue={item.age} style={{ width: 100 }} /></div>
                        </div>
                    </MDBCol>
                    <MDBCol size="6">
                        <div className="row">
                            <div className="col-4" style={{ marginTop: 5 }}>Jenis Kelamin</div>
                            <div className="col-8">
                                <select className="form-control" onChange={this.onChangeSelectGender} defaultValue={item.genderId}>
                                    {this.renderGender()}
                                </select>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-4" style={{ marginTop: 5 }}>Pekerjaan</div>
                            <div className="col-8">
                                <select className="form-control" onChange={this.onChangeSelectJob} defaultValue={item.jobId}>
                                    {this.renderJob()}
                                </select>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-4" style={{ marginTop: 5 }}>Alamat</div>
                            <div className="col-8">
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
                        </div>  
                    </MDBCol>
                </MDBRow>
            )
        })
    }

    renderProfile = () => {
        return this.state.profile.map((item, index) => {
            return (
                <MDBRow style={{ fontFamily: 'Hammersmith One, sans-serif' }}>
                    <MDBCol size="5" className="d-flex justify-content-center">
                        <div>
                            {
                                this.state.previewImage
                                    ?
                                    <div className='d-flex justify-content-center'>
                                        <img className='EDP-Preview-Image' src={this.state.previewImage} alt="profile" style={{ height: 170, width: 170, borderRadius: 100 }} />
                                    </div>
                                    :
                                    <div className='d-flex justify-content-center'>
                                        <img className='EDP-Preview-Image' src={API_URL_1 + item.imagePath} alt="profile" style={{ height: 170, width: 170, borderRadius: 100 }} />
                                    </div>
                            }
                            <div className='d-flex justify-content-center'>
                                <div className="row">
                                    <div className="col-4"></div>
                                    <div className="col-4">
                                        <input type='file' onChange={this.addImage} style={{ fontSize: 13 }} />
                                    </div>
                                    <div className="col-4"></div>
                                </div>
                            </div>
                        </div>
                    </MDBCol>
                    <MDBCol size="7" key={index}>
                        <div className="row">
                            <div className="col-4"> Email </div><div className="col-8">: {this.props.email}</div>
                            <div className="col-4"> Username </div><div className="col-8">: {this.props.username}</div>
                            <div className="col-4"> Nama Lengkap </div><div className="col-8">: {item.firstname} {item.lastname}</div>
                            <div className="col-4"> Np. Hp </div><div className="col-8">: {item.phonenumber}</div>
                            <div className="col-4"> Usia </div><div className="col-8">: {item.age}</div>
                            <div className="col-4"> Jenis Kelamin </div><div className="col-8">: {item.gender}</div>
                            <div className="col-4"> Pekerjaan </div><div className="col-8">: {item.job}</div>
                            <div className="col-4"> Alamat </div><div className="col-8">: {item.address}</div>
                        </div>
                    </MDBCol>
                </MDBRow>
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
                                {this.renderProfile()}
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                    <div style={{ border: '2px solid black', margin: '3% 0px 3% 0px' }}> </div>
                    <MDBRow>
                        <MDBCol>
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