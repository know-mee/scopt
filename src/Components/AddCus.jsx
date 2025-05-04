import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddCus = ({ openEditForm, handleCloseEditForm }) => {
  // UseState for managing the input values
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");  // For error handling
  const [successMessage, setSuccessMessage] = useState("");  // For success message

  // Function to create a new user (post to API)
  const createUser = async () => {
    const url = "http://localhost:3000/customers";
    try {
      let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          id,
          name,
          contact,
          startDate,
          endDate,
        }),
        headers: {
          "Content-Type": "application/json", // Ensure that content type is set to JSON
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User created successfully", data);
        setSuccessMessage("Customer created successfully!");  // Show success message
        handleCloseEditForm(); // Close the dialog after creating the user
      } else {
        // If response is not OK, handle the error
        setErrorMessage("Failed to create customer. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while creating the customer."); // In case of network error
    }
  };






  return (
    <div>
      <React.Fragment>
        <Dialog
          open={openEditForm}
          TransitionComponent={Transition}
          keepMounted
          fullWidth={true} // Ensures the dialog takes the full width of the container
          maxWidth="lg" // Sets the maximum width to a larger predefined size
          onClose={handleCloseEditForm}
          aria-describedby="alert-dialog-slide-description"
          PaperProps={{
            sx: {
              backgroundColor: "#121212",
              width: "750px", // Custom width
              maxWidth: "none",
              height: "410px", // Ensures the custom width is applied
            },
          }}
        >
          <DialogTitle>
            <h1 className="text-white">Add Customer</h1>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <div className="border-t-2 text-white text-sm">
                <h1 className="pt-4">Customer Information: </h1>
                <div>
                  <form className="space-y-6 max-w-7xl mx-auto">
                    {/* ID, Name, Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div>
                        <label className="block mb-1">ID</label>
                        <input
                          className="w-full p-1 bg-[#1e1e1e] border rounded"
                          type="text"
                          value={id} // Bind input value to state
                          onChange={(e) => setId(e.target.value)} // Handle input change correctly
                        />
                      </div>
                      <div>
                        <label className="block mb-1">Name</label>
                        <input
                          className="w-full p-1 bg-[#1e1e1e] border rounded"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)} // Correct event handler
                        />
                      </div>
                      <div>
                        <label className="block mb-1">Contact</label>
                        <input
                          className="w-full p-1 bg-[#1e1e1e] border rounded"
                          type="text"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)} // Correct event handler
                        />
                      </div>
                    </div>

                    {/* Start and End Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block">Start Date</label>
                        <input
                          className="w-full p-2 bg-[#1e1e1e] border rounded"
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)} // Correct event handler
                        />
                      </div>
                      <div>
                        <label className="block">End Date</label>
                        <input
                          className="w-full p-2 bg-[#1e1e1e]  border rounded"
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)} // Correct event handler
                        />
                      </div>
                    </div>

                    <hr className="border-gray-600" />

                    {/* Error or Success Message */}
                    {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                    {successMessage && <div className="text-green-500">{successMessage}</div>}

                    {/* Submit Button */}
                    <div className="flex justify-end mt-4">
                      <Button
                        onClick={createUser} // Call createUser on click
                        className="py-1 px-4 bg-green-600 text-white"
                      >
                        Save
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
};

export default AddCus;
