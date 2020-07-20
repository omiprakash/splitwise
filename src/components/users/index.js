import React from 'react';

import './index.scss';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetail: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [],
            editUser: "false",
            createuser: true
        }
        this.baseState = {
            name: '',
            email: '',
            mobile: ''
        }
    }

    handleChange = (e, name) => {
        this.setState({
            [name]: e.target.value
        }, () => {
            this.validatePayload();
        })
    }

    addUser = (e) => {
        let mobileNumberCheck = this.state.userDetail.filter((user) => (user.mobile === this.state.mobile || user.email === this.state.email))
        if (mobileNumberCheck.length > 0) {
            alert('User with same mobile or mobile already exists. Please use a provide another email or mobile');
            return;
        }
        this.setState({
            userDetail: [...this.state.userDetail,
            {
                'id': this.state.userDetail.length + 1,
                'name': this.state.name,
                'email': this.state.email,
                'mobile': this.state.mobile,
                'totalAmt': 0
            }]
        },
            () => {
                localStorage.setItem('users', JSON.stringify(this.state.userDetail));
                this.setState(this.baseState);
                this.setState({
                    createuser: true
                })
            })
        this.forceUpdate();
    }

    deleteUser = (e, value) => {
        console.log(value.id);
        if (value.totalAmt === 0) {
            let activeUser = this.state.userDetail.filter(items => items.id !== value.id);
            this.setState({
                userDetail: activeUser
            })
            localStorage.setItem('users', JSON.stringify(activeUser));
            this.forceUpdate();
        } else {
            alert('First settle the amount to delete the user.')
        }

    }
    editUser = (e, userData) => {
        this.setState({
            'edituser': "true",
        }, () => {
            let getUser = this.state.userDetail.find(usr => usr.id === userData.id);
            this.setState({
                id: getUser.id,
                name: getUser.name,
                email: getUser.email,
                mobile: getUser.mobile,
                totalAmt: getUser.totalAmt
            })
        })
    }
    save = (e) => {
        let editingValue = this.state.userDetail.filter(usr => usr.id !== this.state.id)
        this.setState({
            userDetail: [...editingValue,
            {
                'id': this.state.id,
                'name': this.state.name,
                'email': this.state.email,
                'mobile': this.state.mobile,
                'totalAmt': this.state.totalAmt
            }],
        },
            () => {
                localStorage.setItem('users', JSON.stringify(this.state.userDetail));
                this.setState({
                    'editUser': "false"
                })
                this.setState(this.baseState)
            }
        )
        this.forceUpdate();
    }

    validatePayload = () => {
        if (this.state.name !== '' && this.state.mobile && this.state.email !== '') {
            this.setState({
                createuser: false
            })
        } else {
            this.setState({
                createuser: true
            })
        }
    }


    render() {
        return (
            <React.Fragment>
                <div className="user-wrapper container">
                    <div className="form-wrapper">
                        <h1>Add users</h1>
                        <div className="formgroup">
                            <label htmlFor="uname">Name</label>
                            <input id='uname' type='text' onChange={e => { this.handleChange(e, 'name') }} value={this.state.name && this.state.name} />
                        </div>
                        <div className="formgroup">
                            <label htmlFor="email">Email</label>
                            <input id='email' type='email' onChange={e => { this.handleChange(e, 'email') }} value={this.state.email && this.state.email} />
                        </div>
                        <div className="formgroup">
                            <label htmlFor="mobile">Mobile</label>
                            <input id='mobile' type='mobile' onChange={e => { this.handleChange(e, 'mobile') }} value={this.state.mobile && this.state.mobile} />
                        </div>
                        {this.state.editUser === "false" && <button className="cta" disabled={this.state.createuser} onClick={e => { this.addUser(e) }}>Add User</button>}
                        {this.state.edituser === "true" && <button className="cta" onClick={e => { this.save(e) }}>Save User</button>}
                    </div>

                    {this.state.userDetail.length > 0 ? (
                        <table>
                            <tr>
                                <td>UserId</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Mobile</td>
                                <td>Total Bill</td>
                                <td>Summary</td>
                                <td>Action</td>
                            </tr>
                            {
                                this.state.userDetail.length > 0 && this.state.userDetail.map((item, index) => {
                                    return (
                                        <div key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.mobile}</td>
                                        <td>Rs. {item.totalAmt}</td>
                                        <td>{item.totalAmt !== 0 ? (item.totalAmt > 0 ? `You owe ${item.totalAmt} to others` : `You borrow ${item.totalAmt} to others`) : `You don't own to anyone`}</td>
                                        <td>
                                            <button onClick={e => { this.editUser(e, item) }}>Edit</button>
                                            <button onClick={e => { this.deleteUser(e, item) }}>Delete</button></td>
                                            </div>
                                    );
                                })
                            }

                        </table>) : <div>No user exists. Please add a user.</div>}
                </div>


            </React.Fragment>

        );
    }
}

export default Users;