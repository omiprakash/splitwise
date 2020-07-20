import React from 'react';

import './index.scss';

class Expense extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: localStorage.getItem('users') ? localStorage.getItem('users') : []
        }
        this.selectedUserId = [];
    }

    addExpenses = (e) => {
        if(e.target.value !== "" && !this.selectedUserId.includes(e.target.value)){
            this.selectedUserId.push(e.target.value);
        }
        console.log(this.selectedUserId);
    }
   
    render() {
        const userData = [
            {'id': 1, 'name': 'omi', 'email': 'testing@mail.com', 'mobile': '9962983727', 'totalAmt': 20},
            {'id': 2, 'name': 'test', 'email': 'testing@mail.com', 'mobile': '9655059125', 'totalAmt': 20}
        ];
        return (
            <div className="modal">
                <div className="overlay" onClick={() => this.props.close()}></div>
                <div className="modal__wrapper">
                    <div className="modal__header">
                        Add an expense
                        <span onClick={() => this.props.close()}>&times;</span>
                    </div>
                    <div className="modal__body">
                        <div className="formgroup">
                            <label htmlFor="expances">Enter a description</label>
                            <input id='expenses' type='text' onChange={e => {this.handleChange(e, 'expenses')}}/>
                        </div>
                        <div className="formgroup">
                            <label htmlFor="expances">Amount</label>
                            <input id='expenses' type='text' onChange={e => {this.handleChange(e, 'amount')}}/>
                        </div>
                        <div className="formgroup">
                            <label htmlFor="expances">Select Friends to split</label>
                            <select multiple onChange={e => {this.addExpenses(e)}}>
                                {
                                    userData.map((usr, idx) => {
                                        return(
                                            <option value={usr.id}>{usr.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="formgroup">
                            <label htmlFor="expances">Paid by</label>
                            <select onChange={e => {this.handleChange(e, 'paidby')}}>
                                {
                                    userData.map((usr, idx) => {
                                        return(
                                            <option value={usr.id}>{usr.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <button className="cta">Submit</button>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Expense;
