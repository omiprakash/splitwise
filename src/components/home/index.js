import React from 'react';
import { getLocalStorage, formatCurrency } from './../../utils/commonUtils';

class Bills extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: getLocalStorage('users'),
            bills: getLocalStorage('bills'),
        }
    }

    totalSpending = (e) => {
        let totalAmt = this.state.bills.reduce( (acc, index) => {
            acc = acc + parseInt(index.amount)
            return acc;
        }, 0)
        return formatCurrency(totalAmt);
    }

    render() {
        const totalSpending = this.totalSpending()
        return (
            <div className="container">
                <h1>User bill summary</h1>
                <h2>Total Spending <span>{totalSpending}</span></h2>
                {this.state.users.length > 0 ? (
                    <table>
                        <colgroup>
                            <col width="10%" />
                            <col width="40%" />
                            <col width="40%" />
                            <col width="40%" />
                        </colgroup>
                        <thead>

                            <tr>
                                <th>UserId</th>
                                <th>Name</th>
                                <th>Total Amt</th>
                                <th>Summary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.length > 0 && this.state.users.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{formatCurrency(item.totalAmt)}</td>
                                            <td>{item.totalAmt !== 0 ? (item.totalAmt > 0 ? `You owe ${formatCurrency(item.totalAmt)} to others` : `You borrow ${formatCurrency(item.totalAmt)} to others`) : `You don't own to anyone`}</td>

                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>) : <div>Do some activity to get summary here...</div>}
            </div>

        );
    }
}

export default Bills;