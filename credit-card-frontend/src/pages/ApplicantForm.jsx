import React, { useState, useRef, useEffect } from 'react';
import {ROLES, FormField} from '../common/constant';

const ApplicantForm = ( role ) => {
     const [isUser, setIsUser] = useState(true);
   useEffect(() => {   
      if(role.role !== 0){
        setIsUser(false);
     }
}, [role])


  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    panNo: '',
    annualIncome: '',
      address: '', phone: '', creditLimit: 0,
       applicationNo: '',
    cibilScore: '',
    approver1Comments: '',
    approver2Comments: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenSubmit, setIsModalOpenSubmit] = useState(false);
 
  const closeButtonRef = useRef(null);
  const [errors, setErrors] = useState({
    dob: '',
    panNo: ''
  });
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    
  const handleChange = (e) => {
    const { name, value } = e.target;
    const upperValue = name === 'panNo' ? value.toUpperCase() : value;
    
   // setFormData({ ...formData, [name]: upperValue });
     setFormData((prev) => ({ ...prev, [name]: upperValue }));
     // Real-time Validation Logic
    let currentErrors = { ...errors };

    if (name === 'dob') {
      currentErrors.dob = (value && calculateAge(value) < 18) 
        ? "Not eligible: Must be 18 or older." 
        : "";
    }

    if (name === 'panNo') {
      // Only validate format if the length is 10
      if (upperValue.length > 0 && !panRegex.test(upperValue)) {
        currentErrors.panNo = "Invalid PAN format (e.g., ABCDE1234F).";
      } else {
        currentErrors.panNo = "";
      }
    }
console.log("on change");
    setErrors(currentErrors);
  };

 const handleIncomeBlur = () => {
      console.log("Blur event fired on Annual Income");
      
  const income = parseFloat(formData.annualIncome);
  console.log(income);
  // If input is empty or not a number, clear the limit and exit
  if (isNaN(income)) {
    setFormData(prev => ({ ...prev, creditLimit: '' }));
    return;
  }

  let suggestedLimit = '';

  if (income > 0 && income <= 200000) {
    suggestedLimit = '50000';
  } else if (income > 200000 && income <= 300000) {
    suggestedLimit = '75000';
  } else if (income > 300000 && income <= 500000) {
    suggestedLimit = '100000';
  } else if (income > 500000) {
    suggestedLimit = '150000';
  }

  setFormData(prev => ({ 
    ...prev, 
    creditLimit: suggestedLimit 
  }));
};
const handleCreditLimitBlur = () => {
      console.log("Blur event fired on credit limit");
      
  const income = parseFloat(formData.annualIncome);
   const crdLimit = parseFloat(formData.creditLimit);
  console.log(income);
  // If input is empty or not a number, clear the limit and exit
  if (isNaN(income)) {
    setFormData(prev => ({ ...prev, creditLimit: '' }));
    return;
  }

  let suggestedLimit = '';
 let currentErrors = { ...errors };
  if (crdLimit > income) {
     currentErrors.creditLimit = "Credit limit cannot be larger than annual income";
  } else {
    suggestedLimit = crdLimit;
  } 
console.log("limit ----",suggestedLimit);

  setFormData(prev => ({ 
    ...prev, 
    creditLimit: suggestedLimit 
  }));
};

  const calculateAge = (dobString) => {
    const today = new Date();
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };
 const isFormValid = () => {
    const requiredFields = ['name', 'dob', 'panNo', 'annualIncome'];
    // Add CIBIL if Approver 1 is viewing
    if (role.role === ROLES.APPROVER_1) requiredFields.push('cibilScore');

    const allFieldsFilled = requiredFields.every(field => formData[field].toString().trim() !== '');
    const noErrors = !errors.dob && !errors.panNo;

    return allFieldsFilled && noErrors;
  };
  
  const isButtonDisabled = () => {
    if (isUser) {
      return !isFormValid(); // Disabled if incomplete
    }
    // For Approvers, the button is always enabled so they can take action
    return false; 
  };
   const handleSubmit = (e) => {
    e.preventDefault();
      const newAppNo = "CC"+Math.floor(Math.random() * 1000000);
        const timestamp = new Date().toISOString();
    // Final check before submission
    if (calculateAge(formData.dob) < 18 || !panRegex.test(formData.panNo)) {
      setIsModalOpen(true);
      setTimeout(() => closeButtonRef.current?.focus(), 100);
      return;
    }
     setFormData(prev => ({
      ...prev,   
       applicationNo: newAppNo,
    createdAt: timestamp
    }));
    isModalOpenSubmit(true);

    //alert(`Form submitted successfully, your application number to track status is  ${newAppNo}`);
  };
 const getCBILScore = (e) => {
    e.preventDefault();
    // Final check before submission
    
    alert(`getCBILSCore`);
  };
   const approvedClick = (e) => {
    e.preventDefault();
    // Final check before submission
    
    alert(`approvedclick`);
  };
   const rejectClick = (e) => {
    e.preventDefault();
    // Final check before submission
    
    alert(`rejectClick`);
  };

   const dispatched = (e) => {
    e.preventDefault();
    // Final check before submission
    
    alert(`dispatched`);
  };
  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'Arial, sans-serif' }}>
      <h2 id="form-title" style={{ textAlign: 'center' }}>
        {isUser ? "Credit Card Application" : "Review Application Details  "}
      </h2>
      
      <form onSubmit={handleSubmit}>
       <FormField 
        label="Application No"
        value={formData.applicationNo}
        readOnly
        placeholder="Generated on submit"
      />
        <FormField label="Full Name" id="name" type="text" name="name" value={formData.name} onChange={handleChange} required  readOnly={role.role !== ROLES.USER}/>
        <div style={{ display: 'flex', gap: '15px' }}>
        <FormField label="Date of Birth" id="dob" type="date" name="dob" value={formData.dob} onChange={handleChange} required hint="Must be 18+" readOnly={role.role !== ROLES.USER}/>
        <FormField label="PAN Number" id="panNo" type="text" name="panNo" value={formData.panNo} onChange={handleChange} required pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" title="Format: ABCDE1234F" readOnly={role.role !== ROLES.USER} />
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
        <FormField label="Annual Income" id="annualIncome" type="number" name="annualIncome" value={formData.annualIncome} onChange={handleChange}  onBlur={() => {   
    handleIncomeBlur(); 
  }}    style={{ flex: 1 }} required  readOnly={role.role !== ROLES.USER}/>
       <FormField label="Credit Limit" id="creditLimit" type="number" name="creditLimit" value={formData.creditLimit} onChange={handleChange}  onBlur={() => {   
    handleCreditLimitBlur(); 
  }} style={{ flex: 1 }}   hint={!isUser ? "Auto-calculated based on income" : "Final approval limit"}
/>
      </div>
       <FormField label="Address" id="address" type="text" name="address" value={formData.address} onChange={handleChange} required style={{height: '60px'}} readOnly={role.role !== ROLES.USER}/>
        <FormField label="Phone Number" id="phoneNumber" type="number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required  readOnly={role.role !== ROLES.USER}/>
        
         
        {(role.role === ROLES.APPROVER_1 || role.role === ROLES.APPROVER_2) && (
          <FormField label="CIBIL Score" id="cibilScore" type="number" name="cibilScore" value={formData.cibilScore} onChange={handleChange} required min="300" max="900" hint="Range: 300-900"  />
        )}
       
        {role.role === ROLES.APPROVER_1 && (
          <FormField label="Approver 1 Remarks" id="approver1Comments" type="text" name="approver1Comments" value={formData.approver1Comments} onChange={handleChange} required />
        )}

       
        {role.role === ROLES.APPROVER_2 && (
          <>
            <FormField label="Approver 1 Remarks (View)" id="v-a1" type="text" value={formData.approver1Comments} readOnly/>
            <FormField label="Final Decision/Comments" id="approver2Comments" type="text" name="approver2Comments" value={formData.approver2Comments} onChange={handleChange} required />
          </>
        )}
           {isUser && (
        <button type="submit" style={buttonStyle}     disabled={isButtonDisabled()}  >
          Submit Application
        </button> 
           )}
        {role.role === ROLES.APPROVER_1 && (
          <button onClick={getCBILScore} style={buttonStyle}      >
          Get CBIL Score
        </button>)} 

        {role.role === ROLES.APPROVER_2 && ( <>
          <button onClick={approvedClick} style={buttonStyle}      >
         Approve
        </button> <></><button onClick={rejectClick} style={buttonRejectStyle}      >
         Reject
        </button></>)} 

          {role.role === ROLES.APPROVER_3 && (
          <button onClick={dispatched} style={buttonStyle}      >
         Dispatch
        </button>)} 

      </form>

     
   

       {isModalOpen && (
        <div style={overlayStyle}>
          <div style={modalStyle} role="dialog" aria-modal="true">
            <h3>Validation Error</h3>
            <p>{errors.dob || errors.panNo || "Please check your inputs."}</p>
            <button ref={closeButtonRef} onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {isModalOpenSubmit && (
        <div style={overlayStyle}>
          <div style={modalStyle} role="dialog" aria-modal="true">
            <h3>Application Submitted</h3>
            <p>Application No {formData.applicationNo} for tracking</p>
            <button ref={closeButtonRef} onClick={() => setIsModalOpenSubmit(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const buttonStyle = { width: '100%', padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' };
const overlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
const modalStyle = { backgroundColor: 'white', padding: '30px', borderRadius: '8px', textAlign: 'center', maxWidth: '400px' };
const buttonRejectStyle = { width: '100%', marginTop:'20px',padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' };

export default ApplicantForm;