import React, { useState, useEffect } from "react";
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

const EditForm = ({ openEditForm, customer, handleCloseEditForm }) => {
  // State variables for customer data
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");  // For error handling
  const [successMessage, setSuccessMessage] = useState("");  // For success message

  // Set the state from props when the component mounts
  useEffect(() => {
    if (customer) {
      setId(customer.id);
      setName(customer.name);
      setContact(customer.contact);
      setStartDate(customer.startDate);
      setEndDate(customer.endDate);
    }
  }, [customer]);

  // Function to update the user (PUT request)
  const updateUser = async () => {
    const url = `http://localhost:3000/customers/${id}`;

    try {
      let response = await fetch(url, {
        method: "PUT", // Use PUT for updating the resource
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
        console.log("User updated successfully", data);
        setSuccessMessage("Customer updated successfully!");  // Show success message
        handleCloseEditForm(); // Close the dialog after updating the user
      } else {
        // If response is not OK, handle the error
        setErrorMessage("Failed to update customer. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while updating the customer."); // In case of network error
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
              height: "600px", // Ensures the custom width is applied
            },
          }}
        >
          <DialogTitle>
            <h1 className="text-white">Edit Customer</h1>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <div className="border-t-2 text-white text-sm">
                <h1 className="pt-2">Customer Information: </h1>
                <div>
                  <form className="space-y-6 max-w-7xl mx-auto">
                    {/* Editable fields */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div>
                        <label className="block mb-1">ID</label>
                        <input
                          className="w-full p-1 bg-[#1e1e1e] border rounded"
                          type="text"
                          value={id}
                          onChange={(e) => setId(e.target.value)} // Update ID state
                        />
                      </div>
                      <div>
                        <label className="block mb-1">Name</label>
                        <input
                          className="w-full p-1 bg-[#1e1e1e] border rounded"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)} // Update Name state
                        />
                      </div>
                      <div>
                        <label className="block mb-1">Contact</label>
                        <input
                          className="w-full p-1 bg-[#1e1e1e] border rounded"
                          type="text"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)} // Update Contact state
                        />
                      </div>
                    </div>

                    {/* Start and End Date (Editable) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block">Start Date</label>
                        <input
                          className="w-full p-2 bg-[#1e1e1e] border rounded"
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)} // Update Start Date state
                        />
                      </div>
                      <div>
                        <label className="block">End Date</label>
                        <input
                          className="w-full p-2 bg-[#1e1e1e] border rounded"
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)} // Update End Date state
                        />
                      </div>
                    </div>

                    {/* Other fields (read-only) */}
                    <div>
                      <label className="block">Email</label>
                      <input
                        className="w-full p-1 bg-[#1e1e1e] border rounded"
                        type="email"
                        readOnly // Make email field read-only
                      />
                    </div>

                    <div>
                      <label className="block">Platform</label>
                      <select
                        className="w-full p-2 bg-[#1e1e1e] border rounded"
                        readOnly // Make platform field read-only
                      >
                        <option>Netflix</option>
                        <option>Amazon Prime</option>
                        <option>Disney+</option>
                      </select>
                    </div>

                      {/* Account Info Section */}
                    <div>
                      <h2 className="text-lg font-semibold mb-2">
                        Account Information:
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block mb-1">Account Email</label>
                          <input
                            className="w-full p-1 bg-[#1e1e1e] border rounded"
                            type="email"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block mb-1">Account Username</label>
                          <input
                            className="w-full p-1 bg-[#1e1e1e] border rounded"
                            type="text"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block mb-1">Account Password</label>
                          <input
                            className="w-full p-1 bg-[#1e1e1e] border rounded"
                            type="password"
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block mb-1">Total Price</label>
                          <input
                            className="w-full p-1 bg-[#1e1e1e] border rounded"
                            type="number"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block mb-1">Profit</label>
                          <input
                            className="w-full p-1 bg-[#1e1e1e] border rounded"
                            type="number"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}

                    {/* Error or Success Message */}
                    {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                    {successMessage && <div className="text-green-500">{successMessage}</div>}

                    {/* Submit Button */}
                    <div className="flex justify-end mt-1">
                      <Button
                        onClick={updateUser} // Call updateUser on click
                        className=" px-4 bg-green-600 text-white"
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

export default EditForm;
