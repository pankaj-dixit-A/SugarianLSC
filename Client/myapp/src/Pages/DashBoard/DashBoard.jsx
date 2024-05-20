// DashBoard.js
import React from 'react';
import { Button } from "react-bootstrap";
import "./DashBoard.css"; // Importing external CSS file
import { useNavigate } from 'react-router-dom';

const DashBoard = () => {

  const navigate = useNavigate()

  const handleRegister = () => { 
    navigate("/")
  }

  return (
    <>
    <div>
      <Button
        variant="primary"
        className="button"
        onClick={handleRegister}
      >
        <img
          src=""
          alt=""
          style={{ height: "70px", width: "70px", borderRadius: "25%" }}
        />
        Register
      </Button>


      <Button
        variant="primary"
        className="button"
        onClick={handleRegister}
      >
        <img
          src=""
          alt=""
          style={{ height: "70px", width: "70px", borderRadius: "25%" }}
        />
        Delivery Order
      </Button>

      <Button
        variant="primary"
        className="button"
        onClick={handleRegister}
      >
        <img
          src=""
          alt=""
          style={{ height: "70px", width: "70px", borderRadius: "25%" }}
        />
        UTR Entry
      </Button>

      <Button
        variant="primary"
        className="button"
        onClick={handleRegister}
      >
        <img
          src=""
          alt=""
          style={{ height: "70px", width: "70px", borderRadius: "25%" }}
        />
        Tender Purchase
      </Button>

      <Button
        variant="primary"
        className="button"
        onClick={handleRegister}
      >
        <img
          src=""
          alt=""
          style={{ height: "70px", width: "70px", borderRadius: "25%" }}
        />
        Database Backup
      </Button>
    </div>
    <div>
      <Button
        variant="primary"
        className="button"
        onClick={handleRegister}
      >
        <img
          src=""
          alt=""
          style={{ height: "70px", width: "70px", borderRadius: "25%" }}
        />
        Carporate Sale
      </Button>


      <Button
        variant="primary"
        className="button"
        onClick={handleRegister}
      >
        <img
          src=""
          alt=""
          style={{ height: "70px", width: "70px", borderRadius: "25%" }}
        />
       Multiple Receipt
      </Button>

      <Button
        variant="primary"
        className="button"
        onClick={handleRegister}
      >
        <img
          src=""
          alt=""
          style={{ height: "70px", width: "70px", borderRadius: "25%" }}
        />
        Receipt Payment
      </Button>

      <Button
        variant="primary"
        className="button"
        onClick={handleRegister}
      >
        <img
          src=""
          alt=""
          style={{ height: "70px", width: "70px", borderRadius: "25%" }}
        />
        Trial Balance screen
      </Button>

      <Button
        variant="primary"
        className="button"
        onClick={handleRegister}
      >
        <img
          src=""
          alt=""
          style={{ height: "70px", width: "70px", borderRadius: "25%" }}
        />
        Sugar Balance Stock
      </Button>
    </div>
    <div>
      <Button
        variant="primary"
        className="button"
        onClick={handleRegister}
      >
        <img
          src=""
          alt=""
          style={{ height: "70px", width: "70px", borderRadius: "25%" }}
        />
        Dispatch Summary
      </Button>


      <Button
        variant="primary"
        className="button"
        onClick={handleRegister}
      >
        <img
          src=""
          alt=""
          style={{ height: "70px", width: "70px", borderRadius: "25%" }}
        />
      Transport SMS
      </Button>

      <Button
        variant="primary"
        className="button"
        onClick={handleRegister}
      >
        <img
          src=""
          alt=""
          style={{ height: "70px", width: "70px", borderRadius: "25%" }}
        />
        Stock Book
      </Button>

      <Button
        variant="primary"
        className="button"
        onClick={handleRegister}
      >
        <img
          src=""
          alt=""
          style={{ height: "70px", width: "70px", borderRadius: "25%" }}
        />
       Stock Summary
      </Button>

      <Button
        variant="primary"
        className="button"
        onClick={handleRegister}
      >
        <img
          src=""
          alt=""
          style={{ height: "70px", width: "70px", borderRadius: "25%" }}
        />
       Grain Purchase Bill
      </Button>
    </div>
    <div>
      <Button
        variant="primary"
        className="button"
        onClick={handleRegister}
      >
        <img
          src=""
          alt=""
          style={{ height: "70px", width: "70px", borderRadius: "25%" }}
        />
       Daily Report
      </Button>


      <Button
        variant="primary"
        className="button"
        onClick={handleRegister}
      >
        <img
          src=""
          alt=""
          style={{ height: "70px", width: "70px", borderRadius: "25%" }}
        />
      Ledger
      </Button>

      <Button
        variant="primary"
        className="button"
        onClick={handleRegister}
      >
        <img
          src=""
          alt=""
          style={{ height: "70px", width: "70px", borderRadius: "25%" }}
        />
       Carporate Register
      </Button>

      <Button
        variant="primary"
        className="button"
        onClick={handleRegister}
      >
        <img
          src=""
          alt=""
          style={{ height: "70px", width: "70px", borderRadius: "25%" }}
        />
        Broker Report
      </Button>

      <Button
        variant="primary"
        className="button"
        onClick={handleRegister}
      >
        <img
          src=""
          alt=""
          style={{ height: "70px", width: "70px", borderRadius: "25%" }}
        />
        Grain Sale Bill
      </Button>
    </div>
    </>
    
  )
}

export default DashBoard;
