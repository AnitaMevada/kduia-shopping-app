import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const CartValue = () => {
    // Accessing the global state using useContext hook
    const { expenses, Location } = useContext(AppContext);

    // Calculating total expenses
    const totalExpenses = expenses.reduce((total, item) => {
        return total += (item.unitprice * item.quantity);
    }, 0);

    return (
        <div className='alert alert-primary'>
            <span>Cart Value: {Location}{totalExpenses}</span>
        </div>
    );
};

export default CartValue;
