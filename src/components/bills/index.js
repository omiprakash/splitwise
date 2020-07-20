import React from 'react';

import './index.scss';

class Bills extends React.Component {
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
        // const userData = this.state.users && JSON.parse(this.state.users)
        const userData = [{'id': 1, 'name': 'omi', 'email': 'testing@mail.com', 'mobile': '9962983727', 'totalAmt': 20}, {'id': 2, 'name': 'test', 'email': 'testing@mail.com', 'mobile': '9655059125', 'totalAmt': 20}];
        return (
            <React.Fragment>
                <div>
                <label htmlFor="expances">Expance For</label>
                <input id='expenses' type='text' onChange={e => {this.handleChange(e, 'expenses')}}/>
                <label htmlFor="expances">Amount</label>
                <input id='expenses' type='text' onChange={e => {this.handleChange(e, 'amount')}}/>
                <label htmlFor="expances">Select Friends to split</label>
                <select name="cars" id="cars" multiple onChange={e => {this.addExpenses(e)}}>
                    {
                        userData.map((usr, idx) => {
                                return(
                                    <option value={usr.id}>{usr.name}</option>
                                )
                        })
                    }
                  
                </select>
                </div>
            </React.Fragment>

        );
    }
}

export default Bills;