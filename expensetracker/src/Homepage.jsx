import React, { useEffect, useState } from "react";
import styles from "./Homepage.module.css";
import Card from "./Components/Cards/Card";

function Homepage() {
    const [balance, setBalance] = useState(0);
    const [expense, setExpense] = useState(0);
    const [expenseList, setExpenseList] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [isOpenExpense, setIsOpenExpense] = useState(false);
    const [isOpenBalance, setIsOpenBalance] = useState(false);

    const [categorySpends, setCategorySpends] = useState({
        food: 0,
        entertainment: 0,
        travel: 0,
    });

    const [categoryCount, setCategoryCount] = useState({
        food: 0,
        entertainment: 0,
        travel: 0,
    });

    return (
        <div className={styles.container}>
            <h1>Expense Tracker</h1>
            <div className={styles.cardsWrapper}>
                <Card
                    title="Wallet Balance"
                    money={balance}
                    buttonText="+ Add Income"
                    buttonType="success"
                    handleClick={() => {
                        setIsOpenBalance(true);
                    }}
                />
                <Card
                    title="Expenses"
                    money={expense}
                    buttonText="+ Add Expense"
                    buttonType="failure"
                    success={false}
                    handleClick={() => {
                        setIsOpenExpense(true);
                    }}
                />
            </div>
        </div>
    );
}

export default Homepage;