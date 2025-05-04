import React from "react"; 
import {
  FaWhatsapp,
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import DeleteDialog from "../Components/DeleteDialog";
import EditForm from "../Components/EditForm";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import { useState, useEffect } from "react";
import AddCus from "@/Components/AddCus";

const CustomerTable = () => {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedCustomer, setSelectedCustomer] = React.useState(null);
  const [customers, setCustomers] = React.useState([]);
  const [openEditForm, setopenEditForm] = React.useState(false);
  const [openAddForm, setopenAddForm] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = (customer) => {
    setSelectedCustomer(customer);
    setOpenDelete(true);
  };

  const confirmDelete = () => {
    setCustomers(customers.filter((c) => c.id !== selectedCustomer.id));
    setOpenDelete(false);
    setSelectedCustomer(null);
  };

  const handleOpenEditForm = (customer) => {
    setSelectedCustomer(customer);
    setopenEditForm(true);
  };


  const handleOpenAddForm = () => {
    setopenAddForm(true);
  };

  const handleCloseEditForm = () => {
    setopenEditForm(false);
    setSelectedCustomer(null);
  };
  const handleCloseAddForm = () => {
    setopenAddForm(false);
    fetchCustomers();

  };

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/customers");
      if (!response.ok) throw new Error("Failed to fetch customers");
      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      setError("Error loading customers. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  
  return (
    <div className="max-h-screen bg-[#121212] text-white md:w-full p-1 lg:p-5 ">
      <h2 className="text-2xl font-bold mb-4 underline underline-offset-4">
        <i className="mr-2">📷</i> Daily Actions :-
      </h2>

      <div className="bg-[#1e1e1e] rounded-lg p-1 md:p-6 w-[100%]">
        <h3 className="text-sm lg:text-xl font-bold text-center mb-6">
          Message Your Customers
        </h3>

        <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
          {/* Button to open EditForm */}
          <button
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={() => handleOpenAddForm()} // Example: Open EditForm for the first customer
          >
            Add Customer
          </button>

          <input
            type="text"
            placeholder="Search"
            className="p-2 rounded-md bg-[#2a2a2a] border border-gray-600 w-full sm:w-1/4"
          />
          <select className="p-2 rounded-md bg-[#2a2a2a] border border-gray-600 w-full sm:w-1/4">
            <option>Time Order</option>
            <option value="">1 day back</option>
            <option value="">2 day back</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-2 text-xs sm:text-sm">ID</th>
                <th className="p-2 text-xs sm:text-sm">Name</th>
                <th className="p-2 text-xs sm:text-sm ">Contact</th>
                <th className="p-2 text-xs sm:text-sm">Start Date</th>
                <th className="p-2 text-xs sm:text-sm text-red-500">
                  End Date
                </th>
                <th className="p-1 md:p-2 text-xs sm:text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan="6" className="text-center text-red-500 py-4">
                    {error}
                  </td>
                </tr>
              )}
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-gray-700 hover:bg-[#2a2a2a]"
                >
                  <td className="p-1 md:p-2 text-xs sm:text-sm whitespace-nowrap">
                    {customer.id}
                  </td>
                  <td className="p-1 md:p-2 text-xs sm:text-sm whitespace-nowrap">
                    {customer.name}
                  </td>
                  <td className="p-1 md:p-2 text-xs sm:text-sm whitespace-wrap">
                    {customer.contact}
                  </td>
                  <td className="p-1 md:p-2 text-xs sm:text-sm whitespace-nowrap">
                    {customer.startDate}
                  </td>
                  <td className="p-1 md:p-2 text-xs sm:text-sm text-red-500 whitespace-nowrap">
                    {customer.endDate}
                  </td>
                  <td className="p-1 md:p-2 text-xs sm:text-sm space-x-2 text-nowrap">
                    <button
                      className="text-green-500"
                      onClick={() => setOpenDrawer(true)}
                    >
                      <FaWhatsapp />
                    </button>

                    <button
                      className="text-white"
                      onClick={() => handleOpenEditForm(customer)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-white"
                      onClick={() => handleDelete(customer)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <EditForm
          openEditForm={openEditForm}
          customer={selectedCustomer}
          handleCloseEditForm={handleCloseEditForm}
          id={selectedCustomer?.id}
        />
        <AddCus
          openEditForm={openAddForm}
          handleCloseEditForm={handleCloseAddForm}
        />

        <DeleteDialog
          openDelete={openDelete}
          customer={selectedCustomer}
          confirmDelete={confirmDelete}
          onCancel={() => setOpenDelete(false)}
          id={selectedCustomer?.id}
        />

        <div className="flex justify-end items-center mt-6 gap-2 text-xs sm:text-sm">
          <button className="bg-gray-700 p-2 rounded text-white">
            <FaChevronLeft />
          </button>
          <span className="text-xs sm:text-sm">
            Page <b>1</b> of <b>10</b>
          </span>
          <button className="bg-gray-700 text-black p-2 rounded">
            <FaChevronRight />
          </button>
          <span>
            Total : <b>100</b>
          </span>
        </div>
      </div>

      {/* Drawer */}
      {openDrawer && (
        <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
          <DrawerContent className="bg-[#121212]">
            <DrawerHeader>
              <DrawerTitle>
                <div className="mx-auto w-[80%]">
                  <h1 className="text-md font-semibold text-white">
                    Send Message to Your Customer:{" "}
                    <span className="font-bold">{selectedCustomer?.name}</span>
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    You can also customize your message
                  </p>
                </div>
              </DrawerTitle>
              <DrawerDescription>
                <div className="mt-4 space-y-8 mx-auto w-[80%] text-md h-60 bg-[#2a2a2a] text-white p-2">
                  <h1>Hi {selectedCustomer?.name}</h1>
                  <p>
                    Your Netflix account has expired today (on [Date]). If you
                    would like to renew your subscription, please contact us at
                    your earliest convenience.
                    <br /> Thank you for using our services!
                  </p>
                </div>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <button
                onClick={() => setOpenDrawer(false)}
                className="bg-green-500 w-[60%] lg:w-[17%] m-auto px-3 py-2 rounded hover:bg-green-600"
              >
                Send Message
              </button>
              <DrawerClose>
                <button className="bg-[#2a2a2a] w-[60%] lg:w-[17%] m-auto text-white px-3 py-2 rounded hover:bg-gray-800">
                  Cancel
                </button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default CustomerTable;
