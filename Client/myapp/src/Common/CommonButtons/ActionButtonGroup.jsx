import React from 'react';

const ActionButtonGroup = ({
  handleAddOne,
  addOneButtonEnabled,
  handleSaveOrUpdate,
  saveButtonEnabled,
  isEditMode,
  handleEdit,
  editButtonEnabled,
  handleDelete,
  deleteButtonEnabled,
  handleCancel,
  cancelButtonEnabled,
  handleBack,
  backButtonEnabled,
  addButtonRef
}) => {
  return (
    <div
      style={{
        marginTop: "10px",
        marginBottom: "10px",
        display: "flex",
        gap: "10px",
      }}
    >
      <button
        onClick={handleAddOne}
        disabled={!addOneButtonEnabled}

        style={{
          backgroundColor: addOneButtonEnabled ? "blue" : "white",
          color: addOneButtonEnabled ? "white" : "black",
          border: "1px solid #ccc",
          cursor: "pointer",
          width: "4%",
          height: "35px",
          fontSize: "12px",
        }}
        ref={addButtonRef}
      >
        Add
      </button>
      {isEditMode ? (
        <button
          onClick={handleSaveOrUpdate}
          id="update"
          style={{
            backgroundColor: "blue",
            color: "white",
            border: "1px solid #ccc",
            cursor: "pointer",
            width: "4%",
            height: "35px",
            fontSize: "12px",
          }}
        >
          Update
        </button>
      ) : (
        <button
          onClick={handleSaveOrUpdate}
          disabled={!saveButtonEnabled}
          id="save"
          style={{
            backgroundColor: saveButtonEnabled ? "blue" : "white",
            color: saveButtonEnabled ? "white" : "black",
            border: "1px solid #ccc",
            cursor: saveButtonEnabled ? "pointer" : "not-allowed",
            width: "4%",
            height: "35px",
            fontSize: "12px",
          }}
        >
          Save
        </button>
      )}
      <button
        onClick={handleEdit}
        disabled={!editButtonEnabled}
        style={{
          backgroundColor: editButtonEnabled ? "blue" : "white",
          color: editButtonEnabled ? "white" : "black",
          border: "1px solid #ccc",
          cursor: editButtonEnabled ? "pointer" : "not-allowed",
          width: "4%",
          height: "35px",
          fontSize: "12px",
        }}
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        disabled={!deleteButtonEnabled}
        style={{
          backgroundColor: deleteButtonEnabled ? "blue" : "white",
          color: deleteButtonEnabled ? "white" : "black",
          border: "1px solid #ccc",
          cursor: deleteButtonEnabled ? "pointer" : "not-allowed",
          width: "4%",
          height: "35px",
          fontSize: "12px",
        }}
      >
        Delete
      </button>
      <button
        onClick={handleCancel}
        disabled={!cancelButtonEnabled}
        style={{
          backgroundColor: cancelButtonEnabled ? "blue" : "white",
          color: cancelButtonEnabled ? "white" : "black",
          border: "1px solid #ccc",
          cursor: cancelButtonEnabled ? "pointer" : "not-allowed",
          width: "4%",
          height: "35px",
          fontSize: "12px",
        }}
      >
        Cancel
      </button>
      <button
        onClick={handleBack}
        disabled={!backButtonEnabled}
        style={{
          backgroundColor: backButtonEnabled ? "blue" : "white",
          color: backButtonEnabled ? "white" : "black",
          border: "1px solid #ccc",
          cursor: backButtonEnabled ? "pointer" : "not-allowed",
          width: "4%",
          height: "35px",
          fontSize: "12px",
        }}
      >
        Back
      </button>
    </div>
  );
};

export default ActionButtonGroup;
