import React, { createContext, useReducer } from 'react';

// Reducer function to update the state based on actions
export const AppReducer = (state, action) => {
    let newExpenses = []; // Renamed variable for clarity
    switch (action.type) {
        case 'ADD_QUANTITY':
            state.expenses.forEach((expense) => {
                if (expense.name === action.payload.name) {
                    expense.quantity += action.payload.quantity; // Update quantity
                }
                newExpenses.push(expense);
            });
            return {
                ...state,
                expenses: newExpenses,
            };
        case 'RED_QUANTITY':
            state.expenses.forEach((expense) => {
                if (expense.name === action.payload.name) {
                    expense.quantity -= action.payload.quantity; // Reduce quantity
                    expense.quantity = expense.quantity < 0 ? 0 : expense.quantity; // Ensure quantity is not negative
                }
                newExpenses.push(expense);
            });
            return {
                ...state,
                expenses: newExpenses,
            };
        case 'DELETE_ITEM':
            state.expenses.forEach((expense) => {
                if (expense.name === action.payload.name) {
                    expense.quantity = 0; // Reset quantity to zero
                }
                newExpenses.push(expense);
            });
            return {
                ...state,
                expenses: newExpenses,
            };
        case 'CHG_LOCATION':
            return {
                ...state,
                Location: action.payload, // Change location
            };
        default:
            return state;
    }
};

// Initial state when the app loads
const initialState = {
    expenses: [
        { id: "Shirt", name: 'Shirt', quantity: 0, unitprice: 500 },
        { id: "Jeans", name: 'Jeans', quantity: 0, unitprice: 300 },
        { id: "Dress", name: 'Dress', quantity: 0, unitprice: 400 },
        { id: "Dinner set", name: 'Dinner set', quantity: 0, unitprice: 600 },
        { id: "Bags", name: 'Bags', quantity: 0, unitprice: 200 },
    ],
    Location: '£'
};

// Create the context for accessing state
export const AppContext = createContext();

// Provider component to wrap components that need access to the state
export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Calculate total expenses
    const totalExpenses = state.expenses.reduce((total, item) => {
        return total + (item.unitprice * item.quantity);
    }, 0);

    // Add total expenses to state
    state.CartValue = totalExpenses;

    // Provide state and dispatch function to wrapped components
    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                CartValue: state.CartValue,
                dispatch,
                Location: state.Location
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
