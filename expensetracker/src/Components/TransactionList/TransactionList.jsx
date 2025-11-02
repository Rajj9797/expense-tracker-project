import styles from "./TransactionList.module.css";
import TransactionCard from "../TransactionCard/TransactionCard";
// Modal is not used here; remove import
import Pagination from "../Pagination/Pagination";
import { useState, useEffect } from "react";


export default function TransactionList({ transactions, title, editTransactions, balance, setBalance }) {

    // editor-related state removed because editor/modal isn't used in this list component
    const [currentTransactions, setCurrentTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const maxRecords = 3;
    const [totalPages, setTotalPages] = useState(0);

    const handleDelete = (id) => {
        const item = transactions.find(i => i.id === id);
        const price = Number(item.price);
        setBalance(prev => prev + price);

        editTransactions(prev => (
            prev.filter(item => item.id !== id)
        ))
    }

    const handleEdit = (id) => {
        // Edit functionality/modal not implemented in this component.
        // Placeholder to satisfy callers.
        return;
    }

    useEffect(() => {
        const startIndex = (currentPage - 1) * maxRecords;
        const endIndex = Math.min(currentPage * maxRecords, transactions.length);

        setCurrentTransactions([...transactions].slice(startIndex, endIndex));
        setTotalPages(Math.ceil(transactions.length / maxRecords));
    }, [currentPage, transactions]);

    useEffect(() => {

        if(totalPages < currentPage && currentPage > 1){
            setCurrentPage(prev => prev -1);
        }
    }, [totalPages, currentPage]);

    return (
        <div className={styles.transactionsWrapper}>
            {title && <h2>{title}</h2>}
            {transactions.length > 0 ?
                <div className={styles.list}>
                    <div>
                        {currentTransactions.map(transaction => (
                            <TransactionCard
                                details={transaction}
                                key={transaction.id}
                                handleDelete={() => handleDelete(transaction.id)}
                                handleEdit={() => handleEdit(transaction.id)}
                                />
                        ))}
                    </div>
                    {totalPages > 1 &&
                        <Pagination
                            updatePage={setCurrentPage}
                            currentPage={currentPage}
                            totalPages={totalPages}
                        />
                    }
                </div>
                : (
                    <div className={styles.emptyTransactionsWrapper}>
                        <p>No transactions!</p>
                        </div>
                )
            }

               
        </div>
    )
}