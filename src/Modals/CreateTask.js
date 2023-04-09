import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CreateTaskPopup = ({ modal, toggle, save }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");



  const storedValue = JSON.parse(localStorage.getItem("taskList"));

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "taskName") {
      setTaskName(value);
    } else {
      setDescription(value);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    let taskObj = {};
    taskObj["Name"] = taskName;
    const nameExists = storedValue?.some((item) => item.Name === taskName);
    if (nameExists) {
      alert("Title already exists in the data!");
      return null
    }
    taskObj["Description"] = description;
    if (taskName.length <= 0) {
      alert("please fill all the fields");
      return null;
    
    } 
    if(taskName.length<=10){
      alert("please add description")
    }
     
     
    // if(taskName<=0 || description <=0 ){
    //   alert("Please fill all the fileds")
    //   return null
    // }
    save(taskObj);
    setTaskName("");
    setDescription("");
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Note</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={taskName}
            onChange={handleChange}
            name="taskName"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="5"
            className="form-control"
            value={description}
            onChange={handleChange}
            name="description"
          ></textarea>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>
          Create
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateTaskPopup;