import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SelectAccountingYear.css';

const API_URL = process.env.REACT_APP_API_URL;
const SelectAccoungYear = () => {
    const [AccountingYear, setAccountingYear] = useState([]);
    const firstCompanyRef = useRef(null);
    const navigate = useNavigate()

    //The the all data from API
    useEffect(() => {
        const fetchAccountingYears = async () => {
            const companyCode = sessionStorage.getItem('Company_Code'); 
            try {
                const response = await axios.get(`${API_URL}/get_accounting_years?Company_Code=${companyCode}`);
                setAccountingYear(response.data);
                if (firstCompanyRef.current) {
                    firstCompanyRef.current.focus();
                }
            } catch (error) {
                console.error('Failed to fetch companies', error);
            }
        };

        fetchAccountingYears();

    }, []);

    //Handle show and hide the popup
    const handleAccountYear = (accountingyear) => {
       // setAccountingYear(accountingyear);
    };

    // //OnKeyBoard Button Functionality 
    // const handleKeyDown = (event, accountingyear) => {
    //     if (event.keyCode === 13) {
    //         handleAccountYear(accountingyear);
    //     }
    // };

    return (
        <div className="companyListContainer">
            <div className="companyList">
                {AccountingYear.map((accountingyear, index) => (
                    <div
                        key={accountingyear.yearCode}
                        className="companyItem"
                        onClick={() => handleAccountYear(accountingyear)}
                        // onKeyDown={(event) => handleKeyDown(event, company)}
                        ref={index === 0 ? firstCompanyRef : null}
                        tabIndex={0}
                    >
                        <span>{accountingyear.yearCode}</span>
                        <span>{accountingyear.year}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SelectAccoungYear;
