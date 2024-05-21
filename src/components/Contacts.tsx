import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegTrashAlt, FaPen } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import useStore from "../store/store";
import FetchContacts from "../store/fetchContacts";
import Man from "../assets/img/man.png";
import Girl from "../assets/img/girl.png";
import Ellipse01 from "../assets/img/Ellipse 1.png";
import RightImg from "../assets/img/Right_back.png";
import LeftImg from "../assets/img/Left_back.png";
import logoutIMG from "../assets/img/bx_log-out-circle.png";
import logo from "../assets/img/Logo-white.png";
import contactIMG from "../assets/img/contacts portal white.png";
import { FiRefreshCw } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import ConfirmationSave from "./ConfirmationSave";
import ConfirmationDialog from "./ConfirmationDialog";
import ConfirmationDelete from "./ConfirmationDelete";

interface User {
  id: string;
  name: string;
  gender: string;
  email: string;
  phone: string;
}

function Contacts() {
  const navigate = useNavigate();
  const { contacts, editContact, deleteContact } = useStore();
  FetchContacts();

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const [userID, setUserID] = useState<string | null>(null);

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
    setIsConfirmationDialogOpen(false);
  };

  const deleteHandleCloseConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const handleEdit = (index: number) => {
    // Enter edit mode for the specified row
    setEditIndex(index);
    setEditedUser(contacts[index]);
  };

  const handleSaveEdit = async () => {
    if (editIndex !== null && editedUser) {
      try {
        // Update locally
        editContact(editedUser.id, editedUser);

        // Update remotely
        const token = localStorage.getItem("jwt");

        if (!token) {
          throw new Error("JWT token not found in local storage");
        }

        // Send a PUT request to update the user
        await axios.put(
          `http://localhost:3333/contacts/update/${editedUser.id}`,
          {
            name: editedUser.name,
            gender: editedUser.gender,
            email: editedUser.email,
            phone: editedUser.phone,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setIsConfirmationOpen(true);

        toast.success("User updated successfully");
        // Exit edit mode
        setEditIndex(null);
        setEditedUser(null);
      } catch (error) {
        toast.error("Failed to update user. Please try again.");
        console.error("Error updating user:", error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditedUser(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof User
  ) => {
    if (editedUser) {
      setEditedUser({
        ...editedUser,
        [field]: e.target.value,
      });
    }
  };

  const handleLogout = () => {
    // Remove JWT token from local storage
    localStorage.removeItem("jwt");

    // Redirect to login page
    navigate("/login");
    toast.success("Logged out successfully");
  };

  const handleConfirm = () => {
    if (userID !== null) {
      deleteContact(userID);
      setIsConfirmationDialogOpen(false);
      setIsDeleteConfirmationOpen(true);
    }
  };

  const handleDeleteContact = (id: string) => {
    setIsConfirmationDialogOpen(true);
    setUserID(id);
  };

  return (
    <main
      className="w-full min-h-screen flex flex-col lg:items-center lg:relative"
      style={{ fontFamily: "FuturaMediumBT" }}
    >
      <div className="relative w-full h-screen flex">
        <img
          src={Ellipse01}
          alt=""
          className="w-full h-full object-cover z-10"
        />
        <div className="absolute left-0 bottom-ConfirmationDelete0">
          <img src={LeftImg} alt="" className="" />
        </div>
        <div className="absolute right-0 top-0">
          <img src={RightImg} alt="" className="" />
        </div>
        <div className="absolute top-0 z-20 w-full flex justify-center max-h-screen min-h-screen overflow-scroll">
          <div className="lg:w-3/4 w-[90%]">
            {/* Header Section */}
            <div className="w-full flex flex-col items-center lg:items-start mt-[72px]">
              <div>
                <Link to="/">
                  <img
                    src={logo}
                    alt="Logo"
                    height={24.03}
                    width={72.94}
                    className="cursor-pointer mb-3"
                  />
                </Link>
                <img
                  src={contactIMG}
                  alt="Contact img"
                  height={60.77}
                  width={136.76}
                  className=""
                />
              </div>
            </div>
            {/* Contacts Header and Add Button */}
            <div className="flex justify-between items-center lg:mt-14 sm:px-5">
              <h1 className="text-[30px] md:text-[50px] my-10 font-bold text-white text-left">
                Contacts
              </h1>
              <Link to="/contacts/new">
                <button
                  type="button"
                  className="text-white leading-4 bg-customGreen border-2 focus:outline-none focus:ring-gray-300 border-white w-[150px] sm:w-[255px] h-[38px] md:h-[48px] rounded-full text-[14px] md:text-[25px] sm:text-[20px] font-normal"
                >
                  Add New Contact
                </button>
              </Link>
            </div>
            {/* Contacts Table */}
            <div className="relative overflow-x-auto shadow-md bg-white rounded-[30px] mb-32">
              <table className="w-full text-sm text-left rtl:text-right overflow-scroll">
                <thead className="text-customGreen font-bold md:text-[18px] text-[15px] uppercase">
                  <tr>
                    <th scope="col" className="px-6 py-3"></th>
                    <th scope="col" className="px-6 py-3 md:pt-6">
                      Full Name
                    </th>
                    <th scope="col" className="px-6 py-3 md:pt-6">
                      Gender
                    </th>
                    <th scope="col" className="px-6 py-3 md:pt-6">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 md:pt-6">
                      Phone
                    </th>
                    <th scope="col" className="py-3 md:pt-6"></th>
                    <th scope="col" className="py-3 md:pt-6"></th>
                  </tr>
                </thead>
                <tbody>
                  {contacts && contacts.length > 0 ? (
                    contacts.map((user, index) => (
                      <tr
                        key={index}
                        className="text-[17px] font-normal text-customGreen"
                      >
                        <th
                          scope="row"
                          className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <img
                            className="w-[59px] h/[59px] cursor-pointer rounded-full"
                            src={user.gender === "Male" ? Man : Girl}
                            alt={`${user.name} image`}
                          />
                        </th>
                        {/* Edit Mode or Display Mode */}
                        {editIndex === index ? (
                          <>
                            <td className=" px-3 py-3">
                              <div className=" relative">
                                <input
                                  type="text"
                                  value={editedUser?.name}
                                  onChange={(e) => handleChange(e, "name")}
                                  className="h-[35px]  bg-customGreen bg-opacity-10 pl-3 border-customGreen"
                                />
                                <div className="h-[30px] w-[2px] bg-customGreen bg-opacity-75 absolute top-[2px] right-2 lg:right-5"></div>
                              </div>
                            </td>
                            <td className="px-3 py-3">
                              <div className="relative">
                                <input
                                  type="text"
                                  value={editedUser?.gender}
                                  onChange={(e) => handleChange(e, "gender")}
                                  className="h-[35px] bg-customGreen bg-opacity-10 pl-3 border-customGreen w-full pr-8"
                                />
                                {/* Event handler for the refresh button */}
                                <FiRefreshCw
                                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                  onClick={() => {
                                    // Toggle gender value between 'female' and 'male'
                                    const newGender =
                                      editedUser?.gender === "Female"
                                        ? "Male"
                                        : "Female";
                                    handleChange(
                                      {
                                        target: { value: newGender },
                                      } as React.ChangeEvent<HTMLInputElement>,
                                      "gender"
                                    );
                                  }}
                                />
                              </div>
                            </td>

                            <td className=" px-3 py-3">
                              <div className=" relative">
                                <input
                                  type="text"
                                  value={editedUser?.email}
                                  onChange={(e) => handleChange(e, "email")}
                                  className="h-[35px]  bg-customGreen bg-opacity-10 pl-3 border-customGreen"
                                />
                                <div className="h-[30px] w-[2px] bg-customGreen bg-opacity-75 absolute top-[2px] lg:right-7 right-4 "></div>
                              </div>
                            </td>
                            <td className=" px-3 py-3">
                              <div className=" relative">
                                <input
                                  type="text"
                                  value={editedUser?.phone}
                                  onChange={(e) => handleChange(e, "phone")}
                                  className="h-[35px]  bg-customGreen bg-opacity-10 pl-3 border-customGreen"
                                />
                                <div className="h-[30px] w-[2px] bg-customGreen bg-opacity-75 absolute top-[2px] right-2 lg:right-5"></div>
                              </div>
                            </td>
                            <td className="text-right">
                              {/* Save and Cancel Buttons */}
                              <div className="  flex space-x-3 justify-between items-center">
                                <button
                                  className="w-[72px] h-[35px] bg-customGreen text-white rounded-[50px] text-[16px] font-normal leading-3"
                                  onClick={handleSaveEdit}
                                >
                                  Save
                                </button>
                                <MdCancel
                                  className="ml-1 cursor-pointer text-red-500 text-2xl"
                                  onClick={handleCancelEdit}
                                />
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            {/* Display Mode: Render user details */}
                            <td className="px-6 py-4">{user.name}</td>
                            <td className="px-6 py-4">{user.gender}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">{user.phone}</td>
                            <td className="px-6 py-4">
                              <FaPen
                                className="cursor-pointer"
                                onClick={() => handleEdit(index)}
                              />
                            </td>
                            <td className="px-6 py-4">
                              <FaRegTrashAlt
                                className="cursor-pointer"
                                onClick={() => handleDeleteContact(user.id)}
                              />

                              <ConfirmationDialog
                                isOpen={isConfirmationDialogOpen}
                                onCancel={handleCloseConfirmation}
                                onConfirm={handleConfirm}
                                message={`Do you want to delete the contact ${user.name}?`}
                              />
                              <ConfirmationDelete
                                isOpen={isDeleteConfirmationOpen}
                                onCancel={deleteHandleCloseConfirmation}
                              />
                              <ConfirmationSave
                                isOpen={isConfirmationOpen}
                                onCancel={handleCloseConfirmation}
                              />
                            </td>
                          </>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="px-6 py-4 text-xl mb-5 text-center">
                        No contacts found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div
          onClick={handleLogout}
          className="flex space-x-3 items-center justify-center cursor-pointer 2xl:mt-14 w-full 2xl:w-auto absolute  2xl:right-14 bottom-0 2xl:bottom-14  z-50 "
        >
          <img
            src={logoutIMG}
            alt="logout IMG"
            className="md:w-[43px] md:h-[43px] h-8 w-8"
          />
          <p className="underline underline-offset-4 text-white font-normal text-[20px] md:text-[25px]">
            Logout
          </p>
        </div>
      </div>
    </main>
  );
}

export default Contacts;
