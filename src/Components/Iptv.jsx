import React from "react";
import {
  FaWhatsapp,
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import DeleteDialog from "./DeleteDialog";
import EditForm from "./EditForm";

const customerData = [
  {
    id: 1,
    name: "Ayesha Khan",
    contact: "+92 3312345678",
    start: "01-09-2024",
    end: "25-10-2024",
  },
  {
    id: 2,
    name: "Bilal Ahmed",
    contact: "+92 3009876543",
    start: "15-08-2024",
    end: "25-10-2024",
  },
  {
    id: 3,
    name: "Sara Iqbal",
    contact: "+92 3234567890",
    start: "20-07-2024",
    end: "25-10-2024",
  },
];

const Iptv = () => {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedCustomer, setSelectedCustomer] = React.useState(null);
  const [customers, setCustomers] = React.useState(customerData);
  const [openEditForm, setopenEditForm] = React.useState(false);

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

  const handleCloseEditForm = () => {
    setopenEditForm(false);
    setSelectedCustomer(null);
  };

  return (
    <div className="bg-[#1e1e1e] rounded-lg p-1 md:p-6 w-[100%]">
    <h3 className="text-sm lg:text-xl font-bold text-center mb-6">
      Message Your Customers
    </h3>

    <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
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
          {customerData.map((customer) => (
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
                {customer.start}
              </td>
              <td className="p-1 md:p-2 text-xs sm:text-sm text-red-500 whitespace-nowrap">
                {customer.end}
              </td>
              <td className="p-1 md:p-2 text-xs sm:text-sm space-x-2 text-nowrap">
                

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
    />

    <DeleteDialog
      openDelete={openDelete}
      customer={selectedCustomer}
      confirmDelete={confirmDelete}
      onCancel={() => setOpenDelete(false)}
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
  );
};

export default Iptv;
