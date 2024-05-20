import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import ForgotPasswordModal from './Modal/ForgotPassword';
import ChangePasswordModal from './Modal/ChangePassword';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [accountingYears, setAccountingYears] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [selectedAccountingYear, setSelectedAccountingYear] = useState(null);
  //Manage the state of application and error handling
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  //Keyboard Events
  const [selectedIndex, setSelectedIndex] = useState(0);
  const companyRefs = useRef(null);

  //set foucs to the first company after page load.
  const firstCompanyRef = useRef(null);

  //Navigate after user login successfully to the next page.
  const navigate = useNavigate();
  //import API credentials 
  const API_URL = process.env.REACT_APP_API_URL;

  //Get all Company List from database
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${API_URL}/get_company_data_All`);
        setCompanies(response.data);
        if (firstCompanyRef.current) {
          firstCompanyRef.current.focus();
        }
      } catch (error) {
        console.error('Failed to fetch companies', error);
      }
    };

    fetchCompanies();
  }, []);

  //Fetch all accounting years after selecting that particular company and set into the dropdownbox
  useEffect(() => {
    if (selectedCompany) {
      fetchAccountingYears(selectedCompany.Company_Code);
    }
  }, [selectedCompany]);

  const fetchAccountingYears = async (companyCode) => {
    try {
      const response = await axios.get(`${API_URL}/get_accounting_years?Company_Code=${companyCode}`);
      const years = response.data;
   
      years.sort((a, b) => b.yearCode - a.yearCode);
      setAccountingYears(years);
      if (years.length > 0) {
        setSelectedAccountingYear(years[0]);
      }
    } catch (error) {
      console.error('Failed to fetch accounting years', error);
      setAccountingYears([]);
      setSelectedAccountingYear(null);
    }
  };

  //after Clicked by particular company set that Company_Code in session for future use in application
  const handleCompanyClick = (company) => {
    sessionStorage.setItem('Company_Code', company.Company_Code);
    setSelectedCompany(company);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedCompany(null);
    setUsername('');
    setPassword('');
  };

  //Login Functionality and Validation Checks
  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Both Login Name and Password are required!");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/api/userlogin`, {
        User_Name: username,
        User_Password: password
      });
      if (selectedAccountingYear) {
        sessionStorage.setItem('Year_Code', selectedAccountingYear.yearCode);
      }
      setIsLoggedIn(true);
      toast.success("Logged in successfully!");
      setTimeout(() => {
        navigate('/dashboard');
    }, 1000);

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error || 'Invalid login credentials');
      } else if (error.request) {
        // The request was made but no response was received
        setLoginError('No response from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        setLoginError('Error: ' + error.message);
      }
    }
  };

  useEffect(() => {
    if (companyRefs.current[selectedIndex]) {
      companyRefs.current[selectedIndex].focus();
    }
  }, [selectedIndex]);

  // Initialize the refs array to hold a ref for each company
  companyRefs.current = companies.map((_, i) => companyRefs.current[i]);

  //Handling Keyboard Events 
  const handleKeyDown = (event, company, index) => {
    switch (event.keyCode) {
      case 13:
        handleCompanyClick(company);
        break;
      case 38:
        if (selectedIndex > 0) {
          setSelectedIndex(selectedIndex - 1);
        }
        break;
      case 40:
        if (selectedIndex < companies.length - 1) {
          setSelectedIndex(selectedIndex + 1);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="companyListContainer">
         <ToastContainer />
      <div className="companyList">
        {companies.map((company, index) => (
          <div
            key={company.Company_Code}
            className={`companyItem ${index === selectedIndex ? 'selected' : ''}`}
            onClick={() => handleCompanyClick(company)}
            onKeyDown={(event) => handleKeyDown(event, company, index)}
            ref={el => companyRefs.current[index] = el}
            tabIndex={0}
          >
            <span>{company.Company_Code}</span>
            <span>{company.Company_Name_E}</span>
          </div>
        ))}
      </div>

      {/* Bootstrap Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Company Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={e => {
            e.preventDefault();
            handleLogin();
          }}>

            {loginError && <p className="text-danger">{loginError}</p>}

            <Form.Group controlId="formBasicEmail">
              <Form.Label>User Name <span className="required-star">*</span></Form.Label>
              <Form.Control type="text" placeholder="Enter User Name" required value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>User Password <span className="required-star">*</span> </Form.Label>
              <Form.Control type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="accountYearSelect">
              <Form.Label>Account Year <span className="required-star">*</span></Form.Label>
              <Form.Control
                as="select"
                value={selectedAccountingYear ? selectedAccountingYear.yearCode : ''}
                onChange={e => {
                  const newSelectedYear = accountingYears.find(year => year.yearCode.toString() === e.target.value);
                  setSelectedAccountingYear(newSelectedYear);
                  sessionStorage.setItem('Year_Code', newSelectedYear.yearCode);
                }}
              >
                {accountingYears.map(year => (
                  <option key={year.yearCode} value={year.yearCode}>{year.year}</option>
                ))}
              </Form.Control>
            </Form.Group>


            <Form.Group controlId="currentBranchSelect">
              <Form.Label>Current Branch</Form.Label>
              <Form.Control as="select">

              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <ForgotPasswordModal show={showForgotPassword} handleClose={() => setShowForgotPassword(false)} />
          <ChangePasswordModal show={showChangePassword} handleClose={() => setShowChangePassword(false)} />
          <a href="#" onClick={() => setShowForgotPassword(true)}>Forgot Password?</a>
          <Button variant="primary" onClick={handleLogin} type="submit">Login</Button>

          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <a href="#" onClick={() => setShowChangePassword(true)}>Change Password</a>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CompanyList;
