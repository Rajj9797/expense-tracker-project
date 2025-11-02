import styles from './Pagination.module.css';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';

export default function Pagination({ updatePage, currentPage, totalPages }) {

    const handlePrev = () => {
        if(currentPage > 1){
            updatePage(prev => prev - 1);
        }
    }

    const handleNext = () => {
        if(currentPage < totalPages){
            updatePage(prev => prev + 1);
        }
    }

    return (
        <div className={styles.paginationWrapper}>
            <button onClick={handlePrev} disabled={currentPage === 1}>
                <IoIosArrowRoundBack size={24} />
            </button>

            <p>{currentPage}</p>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
                <IoIosArrowRoundForward size={24} />
            </button>
        </div>  
    )
}
