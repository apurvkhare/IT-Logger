import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTech } from "../../actions/techActions";
import M from "materialize-css/dist/js/materialize.min.js";

const AddTechModal = ({ addTech }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onSubmit = () => {
    if (firstName === "" || lastName === "")
      M.toast({ html: "Please enter Full Name" });
    else {
      const newTech = {
        firstName,
        lastName
      };
      addTech(newTech);
      M.toast({
        html: `${firstName} ${lastName} has been added as a Technician`
      });
      setFirstName("");
      setLastName("");
    }
  };

  return (
    <div id='add-tech-modal' className='modal'>
      <div className='modal-content'>
        <h4>Enter Technician Details</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='firstName'
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            <label htmlFor='firstName' className='active'>
              First Name
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='lastName'
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
            <label htmlFor='lastName' className='active'>
              Last Name
            </label>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='btn waves-effect waves-light'
        >
          Submit<i className='material-icons right'>send</i>
        </a>
      </div>
    </div>
  );
};

AddTechModal.propType = {
  addTech: PropTypes.func.isRequired
};

export default connect(null, { addTech })(AddTechModal);
