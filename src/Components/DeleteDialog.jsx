import React from 'react';

const DeleteDialog = ({ openDelete, confirmDelete, onCancel, id ,customer }) => {
const deleteUser = async () => {
    const url = `http://localhost:3000/customers/${id}`;
    try {
      let response = await fetch(url, {
        method: "DELETE",
       
      });

      if (response.ok) {
        console.log("User deleted successfully");
        setSuccessMessage("Customer deleted successfully!"); // Show success message
        handleCloseEditForm(); // Close the dialog after deleting the user
      } else {
        setErrorMessage("Failed to delete customer. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while deleting the customer."); // In case of network error
    }
  };


  return (
    <div
      className={`fixed inset-0 z-50 ${
        openDelete ? 'flex' : 'hidden'
      } items-center justify-center  bg-black/50`}
    >
      <div className="bg-[#1e1e1e] p-1 md:p-5 md:px-2 rounded-lg shadow-lg w-full lg:w-[50%] ">
        <h3 className="text-white text-sm md:text-xl  text-nowrap mb-6 text-center">
          Are you sure you want to delete this customer?
        </h3>
        <div className="flex justify-around gap-4 text-sm lg:text-base ">
         
          <button
            onClick={onCancel}
            className="bg-green-600  text-white px-3 py-2 lg:px-6 lg:py-2 rounded-lg  hover:bg-green-700 transition"
          >
            Cancel
          </button>
          <button
           onClick={() => {
            confirmDelete();
            deleteUser();
            
          }}
            className="bg-red-800 text-white px-6 py-2 rounded-lg  hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;