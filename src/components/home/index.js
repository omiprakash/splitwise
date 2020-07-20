import React from 'react';
import { getLocalStorage } from './../../utils/commonUtils';

class Bills extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: getLocalStorage('users')
        }
    }

    render() {
        return (
            <div className="container">
                <h1>User bill summary</h1>
                {this.state.users.length > 0 ? (
                    <table>
                        <colgroup>
                            <col width="10%" />
                            <col width="20%" />
                            <col width="20%" />
                            <col width="20%" />
                            <col width="20%" />
                        </colgroup>
                        <thead>

                            <tr>
                                <th>UserId</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
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
                                            <td>{item.email}</td>
                                            <td>{item.mobile}</td>
                                            <td>&#8377; {item.totalAmt}</td>
                                            <td>{item.totalAmt !== 0 ? (item.totalAmt > 0 ? `You owe ${item.totalAmt} to others` : `You borrow ${item.totalAmt} to others`) : `You don't own to anyone`}</td>

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