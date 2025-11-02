import React, { useEffect, useState } from "react";
import styles from "./Homepage.module.css";
import Card from "./Components/Cards/Card";
import PieChartComponent from "./Components/PieChart/PieChart";
import BarChart from "./Components/BarChart/BarChart";
import TransactionList from "./Components/TransactionList/TransactionList";
function Homepage() {
    const [balance, setBalance] = useState(0);
    const [expense, setExpense] = useState(0);
    const [expenseList, setExpenseList] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [, setIsOpenExpense] = useState(false);
    const [, setIsOpenBalance] = useState(false);

    const [categorySpends, setCategorySpends] = useState({
        food: 0,
        entertainment: 0,
        travel: 0,
    });

    const [, setCategoryCount] = useState({
        food: 0,
        entertainment: 0,
        travel: 0,
    });

    useEffect(() => {

        const localBalance = localStorage.getItem("balance");

        if(localBalance){
            setBalance(Number(localBalance));
        }else{
            setBalance(5000);
            localStorage.setItem("balance", 5000);
        }

        const items = JSON.parse(localStorage.getItem("expenses"));

        setExpenseList(items || []);
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (expenseList.length > 0 || isMounted) {
            localStorage.setItem("expenses", JSON.stringify(expenseList));
        }

        if(expenseList.length > 0){
            setExpense(
                expenseList.reduce(
                    (total, item) => total + Number(item.price),
                    0
                )
            );
        } else {
            setExpense(0);
        }

        let foodSpends = 0,
        entertainmentSpends = 0,
        travelSpends = 0;

        let foodCount = 0,
        entertainmentCount = 0,
        travelCount = 0;

        expenseList.forEach((item) => {
            if(item.category === "food"){
                foodSpends += Number(item.price);
                foodCount += 1;
            } else if(item.category === "entertainment"){
                entertainmentSpends += Number(item.price);
                entertainmentCount += 1;
            } else if(item.category === "travel"){
                travelSpends += Number(item.price);
                travelCount += 1;
            }
        });

        setCategorySpends({
            food: foodSpends,
            entertainment: entertainmentSpends,
            travel: travelSpends,
        });

        setCategoryCount({
            food: foodCount,
            entertainment: entertainmentCount,
            travel: travelCount,
        });

    }, [expenseList, isMounted]);


    useEffect(() => {
        if(isMounted){
            localStorage.setItem("balance", balance);
        }
    }, [balance, isMounted]);

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
                <PieChartComponent
                    data={
                        [
                            { name: "Food", value: categorySpends.food},
                            { name: "Entertainment", value: categorySpends.entertainment},
                            { name: "travel", value: categorySpends.travel},
                        ]
                    }
                />
            </div>
            <div className={styles.transactionsWrapper}>

                <TransactionList 
                    transactions={expenseList}
                    editTransactions={setExpenseList}
                    title="Recent Transactions"
                    balanace={balance}
                    setBalance={setBalance}
                />


                <BarChart
                    data = {[
                        { name: "Food", value: categorySpends.food},
                        { name: "Entertainment", value: categorySpends.entertainment},
                        { name: "travel", value: categorySpends.travel},
                    ]}
                />

            </div>


        </div>
    );
}

export default Homepage;