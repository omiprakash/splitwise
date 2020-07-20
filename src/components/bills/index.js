import React from 'react';

import Expense from '../expense';

import './index.scss';

class Bills extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            users: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [],
            bills: localStorage.getItem('bills') ? JSON.parse(localStorage.getItem('bills')) : [],
            bill: {
                paidBy: '',
                description: '',
                amount: '',
                owedBy:[]
            }
        }
        this.userMapping = {};
    }

    componentDidMount() {
        this.state.users.forEach(user => {
            this.userMapping[user.id] = user;
        });
    }

    toggleModal = (data) => {
        this.setState({
            showModal: !this.state.showModal
        });
        if(data) {
            this.setState({
                bills: data
            });
        }
    }

    editBill = (item) => {
        const data = item ? item : {
            paidBy: '',
            description: '',
            amount: '',
            owedBy:[]
        };
        this.setState({
            bill: data
        }, () => {
            this.toggleModal();
        });
    }
   
    render() {
        const usersExists = this.state.users.length > 0;
        const { bills, users, bill } = this.state;
        return (
            <div className="container bills-wrapper">
                {!usersExists && <p className="text">Please add <a href="/users">users</a> before adding bills</p>}
                <button disabled={!usersExists} className="cta" onClick={() => this.editBill()}>Add an expense</button>
                {this.state.showModal && <Expense users={users} bills={bills} currentBill={bill} close={this.toggleModal} />}
                {bills.length > 0 ? (
                    <table>
                        <tbody>
                            <tr>
                                <td>BillId</td>
                                <td>Description</td>
                                <td>Amount</td>
                                <td>Paid By</td>
                                <td>Owed By</td>
                                <td>Action</td>
                            </tr>
                            
                            {
                                bills.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.description}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.owedBy}</td>
                                            <td>{item.paidBy}</td>
                                            <td><button onClick={() => this.editBill(item)}>Edit</button></td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>) : <div>No bills exists. Please add a bill.</div>}
            </div>
        );
    }
}

export default Bills;