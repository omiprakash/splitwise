import React from 'react';

import './index.scss';

class Expense extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bill: props.currentBill,
            disableBtn: props.currentBill.id ? false : true
        }
        this.selectedUserId = [];
    }

    handleChange = (e, name) => {
        const val = name === 'owedBy' ? [...e.target.selectedOptions].map(option => option.value) : e.target.value;
        const bill = this.state.bill;
        bill[name] = val
        this.setState(bill, () => {
            this.validatePayload();
        })
    }

    validatePayload = () => {
        console.log(this.state.description ,this.state.amount,this.state.paidBy,this.state.owedBy, this.state.owedBy.length>0);
        if (this.state.description && this.state.amount && this.state.paidBy && this.state.owedBy && this.state.owedBy.length>0) {
            this.setState({
                disableBtn: false
            })
        } else {
            this.setState({
                disableBtn: true
            })
        }
    }

    submitExpense = () => {
        const { bills, userMap } = this.props;
        if(this.state.bill.id) {
            const billIndex = bills.findIndex((bill) => bill.id === this.state.bill.id);
            bills[billIndex] = this.state.bill;
        } else {
            const { bill } = this.state;
            bills.push({...bill, id: bills.length+1});
        }
        for (const userId in userMap) {
            userMap[userId].totalAmt = 0
        }
        bills.forEach(bill => {
            const individualAmt = parseInt(bill.amount)/bill.owedBy.length;
            bill.owedBy.forEach(owedId => {
                userMap[owedId].totalAmt += -individualAmt;
            });
            userMap[bill.paidBy].totalAmt += parseInt(bill.amount);
        });
        const users = Object.values(userMap);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('bills', JSON.stringify(bills));
        this.props.close(bills);
    }
   
    render() {
        // const userData = [{"id":1,"name":"test","email":"skdjh@kkfghjk.com","mobile":"9087654321","totalAmt":0},{"id":2,"name":"qwer","email":"sdfh@hsdgk.com","mobile":"8097654321","totalAmt":0}];
        const userData = this.props.users;
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
                            <label>Enter a description</label>
                            <input  type='text' value={this.state.bill.description} onChange={e => {this.handleChange(e, 'description')}}/>
                        </div>
                        <div className="formgroup">
                            <label>Amount</label>
                            <input type='text' value={this.state.bill.amount} onChange={e => {this.handleChange(e, 'amount')}}/>
                        </div>
                        <div className="formgroup">
                            <label htmlFor="expances">Select Friends to split</label>
                            <select className="multiple" multiple size="1" value={this.state.bill.owedBy} onChange={e => {this.handleChange(e, 'owedBy')}}>
                                {
                                    userData.map((usr, idx) => {
                                        return(
                                            <option key={idx} value={usr.id}>{usr.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="formgroup">
                            <label htmlFor="expances">Paid by</label>
                            <select onChange={e => {this.handleChange(e, 'paidBy')}} placeholder="Select" value={this.state.bill.paidBy}>
                                <option value="" disabled hidden>Select who paid the bill</option>
                                {
                                    userData.map((usr, idx) => {
                                        return(
                                            <option key={usr.id} value={usr.id}>{usr.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <button disabled={this.state.disableBtn} className="cta" onClick={() => this.submitExpense()}>Submit</button>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Expense;
