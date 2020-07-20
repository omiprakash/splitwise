import React from 'react';

import Expense from '../expense';

import './index.scss';

class Bills extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           showModal: false
        }
        this.selectedItems = [];
    }

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    }
   
    render() {
        return (
            <div className="container bills-wrapper">
                {this.state.showModal && <Expense close={this.toggleModal} />}
                <button className="cta" onClick={() => this.toggleModal()}>Add an expense</button>
            </div>
        );
    }
}

export default Bills;