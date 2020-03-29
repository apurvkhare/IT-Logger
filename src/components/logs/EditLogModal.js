import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateLog } from "../../actions/logActions";
import M from "materialize-css/dist/js/materialize.min.js";

const EditLogModal = ({ current, updateLog, tech: { techs } }) => {
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");

  useEffect(() => {
    if (current !== null) {
      setMessage(current.message);
      setAttention(current.attention);
      setTech(current.tech);
    }
  }, [current]);

  const onSubmit = () => {
    if (message === "" || tech === "")
      M.toast({ html: "Please enter a message and a technician" });
    else {
      const updatedLog = {
        id: current.id,
        message,
        attention,
        tech,
        date: new Date()
      };
      updateLog(updatedLog);
      M.toast({ html: `Log updated by ${tech}` });
      setMessage("");
      setTech("");
      setAttention(false);
    }
  };

  return (
    <div id='edit-log-modal' className='modal' style={modalStyle}>
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
              {/* <option value='' disabled>
                Select Technician
              </option>
              <option value='John Doe'>John Doe</option>
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

EditLogModal.propType = {
  updateLog: PropTypes.func.isRequired,
  current: PropTypes.object
};

const mapStateToProp = state => ({
  current: state.log.current,
  tech: state.tech
});

export default connect(mapStateToProp, { updateLog })(EditLogModal);
