import React,{useState, useEffect} from "react";
import NavigationButtons from "../../../Common/CommonButtons/NavigationButtons";
import ActionButtonGroup from "../../../Common/CommonButtons/ActionButtonGroup";
import { useNavigate, useLocation } from "react-router-dom";
// import "./FinicialGroups.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = process.env.REACT_APP_API;
const Year_Code=sessionStorage.getItem("Year_Code")
const companyCode = sessionStorage.getItem("Company_Code");

const OtherPurchase = () => {
  const [updateButtonClicked, setUpdateButtonClicked] = useState(false);
  const [saveButtonClicked, setSaveButtonClicked] = useState(false);
  const [addOneButtonEnabled, setAddOneButtonEnabled] = useState(false);
  const [saveButtonEnabled, setSaveButtonEnabled] = useState(true);
  const [cancelButtonEnabled, setCancelButtonEnabled] = useState(true);
  const [editButtonEnabled, setEditButtonEnabled] = useState(false);
  const [deleteButtonEnabled, setDeleteButtonEnabled] = useState(false);
  const [backButtonEnabled, setBackButtonEnabled] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [highlightedButton, setHighlightedButton] = useState(null);
  const [cancelButtonClicked, setCancelButtonClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
 
  const navigate = useNavigate();
  //In utility page record doubleClicked that recod show for edit functionality
  const location = useLocation();
  const selectedRecord = location.state?.selectedRecord;
  const initialFormData = {
    Doc_No: "",
    Doc_Date: "",
    Supplier_Code: "",
    Exp_Ac: "",
    Narration: "",
    Taxable_Amount: "",
    GST_RateCode: "",
    CGST_Rate: "",
    CGST_Amount: "",
    SGST_Rate: "",
    SGST_Amount: "",
    IGST_Rate: "",
    IGST_Amount: "",
    Other_Amount: "",
    Bill_Amount: "",
    Company_Code: companyCode,
    Created_By: "",
    Modified_By: "",
    Created_Date: "",
    Modified_Date: "",
    Year_Code: Year_Code,
    TDS_Amt: "",
    TDS_Per: "",
    TDS: "",
    TDS_Cutt_AcCode: "",
    TDS_AcCode: "",
    sc: "",
    ea: "",
    tca: "",
    tac: "",
    billno: "",
    ASN_No: "",
    einvoiceno: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  // Handle change for all inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => {
      // Create a new object based on existing state
      const updatedFormData = { ...prevState, [name]: value };
      return updatedFormData;
    });
  };
  const fetchLastRecord = () => {
    fetch(`${API_URL}/get-OtherPurchase-lastRecord?Company_Code=${companyCode}`)
      .then((response) => {
        console.log("response", response);
        if (!response.ok) {
          throw new Error("Failed to fetch last record");
        }
        return response.json();
      })
      .then((data) => {
        // Set the last company code as the default value for Company_Code
        setFormData((prevState) => ({
          ...prevState,
          Doc_No: data.Doc_No + 1,
        }));
      })
      .catch((error) => {
        console.error("Error fetching last record:", error);
      });
  };

  const handleAddOne = () => {
    setAddOneButtonEnabled(false);
    setSaveButtonEnabled(true);
    setCancelButtonEnabled(true);
    setEditButtonEnabled(false);
    setDeleteButtonEnabled(false);
    setIsEditing(true);
    fetchLastRecord();
    setFormData(initialFormData);
  };

  const handleSaveOrUpdate = () => {
    if (isEditMode) {
      axios
        .put(
          `${API_URL}/update-OtherPurchase?Doc_No=${formData.Doc_No}&Company_Code=${companyCode}`,
          formData
        )
        .then((response) => {
          console.log("Data updated successfully:", response.data);
        //   toast.success("_____ update successfully!");
          setIsEditMode(false);
          setAddOneButtonEnabled(true);
          setEditButtonEnabled(true);
          setDeleteButtonEnabled(true);
          setBackButtonEnabled(true);
          setSaveButtonEnabled(false);
          setCancelButtonEnabled(false);
          setUpdateButtonClicked(true);
          setIsEditing(false);
        })
        .catch((error) => {
          handleCancel();
          console.error("Error updating data:", error);
        });
    } else {
      axios
        .post(
          `${API_URL}/create-Record-OtherPurchase?Company_Code=${companyCode}`,
          formData
        )
        .then((response) => {
          console.log("Data saved successfully:", response.data);
        //   toast.success("_____ Create successfully!");
          setIsEditMode(false);
          setAddOneButtonEnabled(true);
          setEditButtonEnabled(true);
          setDeleteButtonEnabled(true);
          setBackButtonEnabled(true);
          setSaveButtonEnabled(false);
          setCancelButtonEnabled(false);
          setUpdateButtonClicked(true);
          setIsEditing(false);
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        });
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
    setAddOneButtonEnabled(false);
    setSaveButtonEnabled(true);
    setCancelButtonEnabled(true);
    setEditButtonEnabled(false);
    setDeleteButtonEnabled(false);
    setBackButtonEnabled(true);
    setIsEditing(true);
  };
  const handleCancel = () => {
    axios
      .get(
        `${API_URL}/get-OtherPurchase-lastRecord?Company_Code=${companyCode}`
      )
      .then((response) => {
        const data = response.data;
        setFormData({
          ...formData,
          ...data,
        });
      })
      .catch((error) => {
        console.error("Error fetching latest data for edit:", error);
      });
    // Reset other state variables
    setIsEditing(false);
    setIsEditMode(false);
    setAddOneButtonEnabled(true);
    setEditButtonEnabled(true);
    setDeleteButtonEnabled(true);
    setBackButtonEnabled(true);
    setSaveButtonEnabled(false);
    setCancelButtonEnabled(false);
    setCancelButtonClicked(true);
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete this _____ ${formData._____}?`
    );

    if (isConfirmed) {
      setIsEditMode(false);
      setAddOneButtonEnabled(true);
      setEditButtonEnabled(true);
      setDeleteButtonEnabled(true);
      setBackButtonEnabled(true);
      setSaveButtonEnabled(false);
      setCancelButtonEnabled(false);

      try {
        const deleteApiUrl = `${API_URL}/delete-OtherPurchase?_____=${formData._____}&Company_Code=${companyCode}`;
        const response = await axios.delete(deleteApiUrl);
        // toast.success("Record deleted successfully!");
        handleCancel();
      } catch (error) {
        // toast.error("Deletion cancelled");
        console.error("Error during API call:", error);
      }
    } else {
      console.log("Deletion cancelled");
    }
  };

  const handleBack = () => {
    navigate("/OtherPurchase-utility");
  };
  //Handle Record DoubleCliked in Utility Page Show that record for Edit
  const handlerecordDoubleClicked = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/get-OtherPurchaseSelectedRecord?Company_Code=${companyCode}&group_Code=${selectedRecord._____}`
      );
      const data = response.data;
      setFormData(data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setIsEditMode(false);
    setAddOneButtonEnabled(true);
    setEditButtonEnabled(true);
    setDeleteButtonEnabled(true);
    setBackButtonEnabled(true);
    setSaveButtonEnabled(false);
    setCancelButtonEnabled(false);
    setUpdateButtonClicked(true);
    setIsEditing(false);
  };

  useEffect(() => {
    if (selectedRecord) {
      handlerecordDoubleClicked();
    } else {
      handleAddOne();
    }
  }, [selectedRecord]);

  //change No functionality to get that particular record
  const handleKeyDown = async (event) => {
    if (event.key === "Tab") {
      const changeNoValue = event.target.value;
      try {
        const response = await axios.get(
          `${API_URL}/get-OtherPurchaseSelectedRecord?Company_Code=${companyCode}&______=${changeNoValue}`
        );
        const data = response.data;
        setFormData(data);
        setIsEditing(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  //Navigation Buttons
  const handleFirstButtonClick = async () => {
    try {
      const response = await fetch(`${API_URL}/get-first-OtherPurchase`);
      if (response.ok) {
        const data = await response.json();
        // Access the first element of the array
        const firstUserCreation = data[0];

        setFormData({
          ...formData,
          ...firstUserCreation,
        });
      } else {
        console.error(
          "Failed to fetch first record:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const handlePreviousButtonClick = async () => {
    try {
      // Use formData.Company_Code as the current company code
      const response = await fetch(
        `${API_URL}/get-previous-OtherPurchase?key_code=${formData.key_code}`
      );

      if (response.ok) {
        const data = await response.json();

        // Assuming setFormData is a function to update the form data
        setFormData({
          ...formData,
          ...data,
        });
      } else {
        console.error(
          "Failed to fetch previous record:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const handleNextButtonClick = async () => {
    try {
      const response = await fetch(
        `${API_URL}/get-next-OtherPurchase?key_code=${formData.key_code}`
      );

      if (response.ok) {
        const data = await response.json();
        // Assuming setFormData is a function to update the form data
        setFormData({
          ...formData,
          ...data.nextSelectedRecord,
        });
      } else {
        console.error(
          "Failed to fetch next record:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const handleLastButtonClick = async () => {
    try {
      const response = await fetch(`${API_URL}/get-last-OtherPurchase`);
      if (response.ok) {
        const data = await response.json();
        // Access the first element of the array
        const last_Navigation = data[0];

        setFormData({
          ...formData,
          ...last_Navigation,
        });
      } else {
        console.error(
          "Failed to fetch last record:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  return (
    <>
      <div className="container">
        <ToastContainer />
        <ActionButtonGroup
          handleAddOne={handleAddOne}
          addOneButtonEnabled={addOneButtonEnabled}
          handleSaveOrUpdate={handleSaveOrUpdate}
          saveButtonEnabled={saveButtonEnabled}
          isEditMode={isEditMode}
          handleEdit={handleEdit}
          editButtonEnabled={editButtonEnabled}
          handleDelete={handleDelete}
          deleteButtonEnabled={deleteButtonEnabled}
          handleCancel={handleCancel}
          cancelButtonEnabled={cancelButtonEnabled}
          handleBack={handleBack}
          backButtonEnabled={backButtonEnabled}
        />
        <div>
          {/* Navigation Buttons */}
          <NavigationButtons
            handleFirstButtonClick={handleFirstButtonClick}
            handlePreviousButtonClick={handlePreviousButtonClick}
            handleNextButtonClick={handleNextButtonClick}
            handleLastButtonClick={handleLastButtonClick}
            highlightedButton={highlightedButton}
            isEditing={isEditing}
            isFirstRecord={formData.Company_Code === 1}
          />
        </div>
      </div>

      <div className="form-container">
        <form>
          <h2>Group Master</h2>
          <br />
          <div className="form-group ">
            <label htmlFor="changeNo">Change No:</label>
            <input
              type="text"
              id="changeNo"
              Name="changeNo"
              onKeyDown={handleKeyDown}
              disabled={!addOneButtonEnabled}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Doc_No">Entry No:</label>
            <input
              type="text"
              id="Doc_No"
              Name="Doc_No"
              value={formData.Doc_No}
              onChange={handleChange}
              disabled={!isEditing && addOneButtonEnabled}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Doc_Date">Date:</label>
            <input
              type="date"
              id="Doc_Date"
              Name="Doc_Date"
              value={formData.Doc_Date}
              onChange={handleChange}
              disabled={!isEditing && addOneButtonEnabled}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Supplier_Code">Supplier:</label>
            <input
              type="text"
              id="Supplier_Code"
              Name="Supplier_Code"
              value={formData.Supplier_Code}
              onChange={handleChange}
              disabled={!isEditing && addOneButtonEnabled}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Exp_Ac">Exp A/C:</label>
            <input
              type="text"
              id="Exp_Ac"
              Name="Exp_Ac"
              value={formData.Exp_Ac}
              onChange={handleChange}
              disabled={!isEditing && addOneButtonEnabled}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Narration">Narration:</label>
            <input
              type="text"
              id="Narration"
              Name="Narration"
              value={formData.Narration}
              onChange={handleChange}
              disabled={!isEditing && addOneButtonEnabled}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Taxable_Amount">Taxable Amount:</label>
            <input
              type="text"
              id="Taxable_Amount"
              Name="Taxable_Amount"
              value={formData.Taxable_Amount}
              onChange={handleChange}
              disabled={!isEditing && addOneButtonEnabled}
            />
          </div>
          <div className="form-group">
            <label htmlFor="GST_RateCode">GST Code:</label>
            <input
              type="text"
              id="GST_RateCode"
              Name="GST_RateCode"
              value={formData.GST_RateCode}
              onChange={handleChange}
              disabled={!isEditing && addOneButtonEnabled}
            />
          </div>
          <div className="form-group">
            <label htmlFor="CGST_Rate">CGST %:</label>
            <input
              type="text"
              id="CGST_Rate"
              Name="CGST_Rate"
              value={formData.CGST_Rate}
              onChange={handleChange}
              disabled={!isEditing && addOneButtonEnabled}
            />
          </div>
          <div className="form-group">
            <label htmlFor="CGST_Amount">:</label>
            <input
              type="text"
              id="CGST_Amount"
              Name="CGST_Amount"
              value={formData.CGST_Amount}
              onChange={handleChange}
              disabled={!isEditing && addOneButtonEnabled}
            />
          </div>
          <div className="form-group">
            <label htmlFor="SGST_Rate">SGST %:</label>
            <input
              type="text"
              id="SGST_Rate"
              Name="SGST_Rate"
              value={formData.SGST_Rate}
              onChange={handleChange}
              disabled={!isEditing && addOneButtonEnabled}
            />
          </div>
          <div className="form-group">
            <label htmlFor="SGST_Amount">:</label>
            <input
              type="text"
              id="SGST_Amount"
              Name="SGST_Amount"
              value={formData.SGST_Amount}
              onChange={handleChange}
              disabled={!isEditing && addOneButtonEnabled}
            />
          </div>
          <div className="form-group">
            <label htmlFor="IGST_Rate">IGST %:</label>
            <input
              type="text"
              id="IGST_Rate"
              Name="IGST_Rate"
              value={formData.IGST_Rate}
              onChange={handleChange}
              disabled={!isEditing && addOneButtonEnabled}
            />
          </div>
          <div className="form-group">
            <label htmlFor="IGST_Amount">:</label>
            <input
              type="text"
              id="IGST_Amount"
              Name="IGST_Amount"
              value={formData.IGST_Amount}
              onChange={handleChange}
              disabled={!isEditing && addOneButtonEnabled}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Other_Amount">Other Amount:</label>
            <input
              type="text"
              id="Other_Amount"
              Name="Other_Amount"
              value={formData.Other_Amount}
              onChange={handleChange}
              disabled={!isEditing && addOneButtonEnabled}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Bill_Amount">Bill Amount:</label>
            <input
              type="text"
              id="Bill_Amount"
              Name="Bill_Amount"
              value={formData.Bill_Amount}
              onChange={handleChange}
              disabled={!isEditing && addOneButtonEnabled}
            />
          </div>
          <div className="form-group">
            <label htmlFor="TDS_Amt">TDS Deductable Amount:</label>
            <input
              type="text"
              id="TDS_Amt"
              Name="TDS_Amt"
              value={formData.TDS_Amt}
              onChange={handleChange}
              disabled={!isEditing && addOneButtonEnabled}
            />
          </div>
          <div className="form-group">
            <label htmlFor="TDS_Per">TDS %:</label>
            <input
              type="text"
              id="TDS_Per"
              Name="TDS_Per"
              value={formData.TDS_Per}
              onChange={handleChange}
              disabled={!isEditing && addOneButtonEnabled}
            />
          </div>
          <div className="form-group">
            <label htmlFor="TDS">TDS Amount:</label>
            <input
              type="text"
              id="TDS"
              Name="TDS"
              value={formData.TDS}
              onChange={handleChange}
              disabled={!isEditing && addOneButtonEnabled}
            />
          </div>
          <div className="form-group">
            <label htmlFor="TDS_Cutt_AcCode">TDS Cutting Ac:</label>
            <input
              type="text"
              id="TDS_Cutt_AcCode"
              Name="TDS_Cutt_AcCode"
              value={formData.TDS_Cutt_AcCode}
              onChange={handleChange}
              disabled={!isEditing && addOneButtonEnabled}
            />
          </div>
          <div className="form-group">
            <label htmlFor="TDS_AcCode">TDS Payable Ac:</label>
            <input
              type="text"
              id="TDS_AcCode"
              Name="TDS_AcCode"
              value={formData.TDS_AcCode}
              onChange={handleChange}
              disabled={!isEditing && addOneButtonEnabled}
            />
          </div>
          <div className="form-group">
            <label htmlFor="billno">Bill No:</label>
            <input
              type="text"
              id="billno"
              Name="billno"
              value={formData.billno}
              onChange={handleChange}
              disabled={!isEditing && addOneButtonEnabled}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ASN_No">ASN No:</label>
            <input
              type="text"
              id="ASN_No"
              Name="ASN_No"
              value={formData.ASN_No}
              onChange={handleChange}
              disabled={!isEditing && addOneButtonEnabled}
            />
          </div>
          <div className="form-group">
            <label htmlFor="einvoiceno">EInvoice No:</label>
            <input
              type="text"
              id="einvoiceno"
              Name="einvoiceno"
              value={formData.einvoiceno}
              onChange={handleChange}
              disabled={!isEditing && addOneButtonEnabled}
            />
          </div>
        </form>
      </div>
    </>
  );
};
export default OtherPurchase;
