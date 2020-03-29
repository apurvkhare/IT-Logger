import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import { addLog } from "../../actions/logActions";

const AddLogModal = ({ addLog, tech: { techs } }) => {
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");

  const onSubmit = () => {
    if (message === "" || tech === "")
      M.toast({ html: "Please enter a message and a technician" });
    else {
      const newLog = {
        message,
        tech,
        attention,
        date: new Date()
      };

      addLog(newLog);
      M.toast({ html: `Log successfully added by ${tech}` });
      setMessage("");
      setTech("");
      setAttention(false);
    }
  };

  return (
    <div id='add-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Enter System Log</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='message'
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <label htmlFor='message' className='active'>
              Log Message
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <select
              name='tech'
              value={tech}
              className='browser-default'
              onChange={e => setTech(e.target.value)}
            >
              <option value='' disabled>
                Select Technician
              </option>
              {techs &&
                techs.map(tech => (
                  <option
                    value={`${tech.firstName} ${tech.lastName}`}
                    key={tech.id}
                  >
                    {tech.firstName} {tech.lastName}
                  </option>
                ))}
              {/* <option value='John Doe'>John Doe</option>
              <option value='Sam Smith'>Sam Smith</option>
              <option value='Sara Wilson'>Sara Wilson</option> */}
            </select>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <p>
              <label>
                <input
                  type='checkbox'
                  className='filled-in'
                  checked={attention}
                  value={attention}
                  onChange={e => setAttention(!attention)}
                />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className='modal-footer center-align'>
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

const modalStyle = {
  width: "50%",
  height: "55%"
};

AddLogModal.propType = {
  addLog: PropTypes.func.isRequired
};

const mapStateToProp = state => ({
  tech: state.tech
});

export default connect(mapStateToProp, { addLog })(AddLogModal);
