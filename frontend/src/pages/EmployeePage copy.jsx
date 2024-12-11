import React, { useState } from 'react';
import { AddEmployeeModal } from '../component/Employee/addEmployee';
import { EditEmployeeModal } from '../component/Employee/editEmployeeModal';
import Navbar from '../pageSection/navBarDashboard';
import TabsEmployee from "../component/Employee/tabsEmployee";
import Employee from '../pageSection/Employee/employee';
import Candidate from '../pageSection/Employee/candidate';
import Category from '../pageSection/Employee/category';
import LoadFromLibraryModal from '../component/Employee/loadFromLibraryModal';
// import ImportModal from '../component/Employee/importModal';
import DeleteEmployee from '../component/Employee/deleteEmployee';

export default function EmployeePage() {
  const [activeTab, setActiveTab] = useState('Employee');
  const [Employees, setEmployees] = useState([
    { id: '1', name: 'Kemampuan Komunikasi', candidate: 'Lorem ipsum dolor sit amet' },
    { id: '2', name: 'Kerjasama Tim', candidate: 'Consectetur adipiscing elit' },
    { id: '3', name: 'Kepemimpinan', candidate: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
  ]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditEmployeeModalOpen, setIsEditEmployeeModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [actionMenuVisible, setActionMenuVisible] = useState(false);
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  
  const [isLoadFromLibraryModalOpen, setIsLoadFromLibraryModalOpen] = useState(false);

  // Toggle action menu visibility
  const toggleActionMenu = () => setActionMenuVisible(!actionMenuVisible);

  // Open Add Employee Modal
  const openAddEmployeeModal = () => {
    setIsAddEmployeeModalOpen(true);
    setActionMenuVisible(false); // Close action menu when modal opens
  };

  // Close Add Employee Modal
  const closeAddEmployeeModal = () => setIsAddEmployeeModalOpen(false);

  // Open Edit Employee Modal
  const openEditEmployeeModal = (Employee) => {
    setSelectedEmployee(Employee);
    setIsEditEmployeeModalOpen(true);
    setActionMenuVisible(false); // Close action menu when modal opens
  };

  // Close Edit Employee Modal
  const closeEditEmployeeModal = () => {
    setIsEditEmployeeModalOpen(false);
    setSelectedEmployee(null); // Reset selected value when modal closes
  };

  // Open Load From Library Modal
  const openLoadFromLibraryModal = () => {
    setIsLoadFromLibraryModalOpen(true);
    setActionMenuVisible(false); // Close action menu when modal opens
  };

  // Close Load From Library Modal
  const closeLoadFromLibraryModal = () => setIsLoadFromLibraryModalOpen(false);

  // Load Employees from the library
  const loadEmployees = (Employee) => {
    setEmployees((prevValues) => [...prevValues, Employee]);
    closeLoadFromLibraryModal();
  };

  // Update Employee
  const updateEmployee = (updatedEmployee) => {
    setEmployees((prevValues) =>
      prevValues.map((Employee) =>
        Employee.id === updatedEmployee.id // Use ID to identify the Employee
          ? updatedEmployee
          : Employee
      )
    );
    closeEditEmployeeModal(); // Close modal after update
  };

  // Add new Employee
  const addEmployee = (newEmployee) => {
    setEmployees((prevValues) => [...prevValues, newEmployee]);
    closeAddEmployeeModal();
  };

  const openDeleteModal = (Employee) => {
    setSelectedEmployee(Employee);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedEmployee(null);
  };

  const deleteEmployee = (Employee) => {
    setEmployees((prevValues) =>
      prevValues.filter((value) => value.name !== Employee.name)
    );
    closeDeleteModal();
  };

  return (
    <div>
      <Navbar />
      <div className="px-[12%] h-full py-32">
        <TabsEmployee activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Show Employee, Candidate, or Category based on the active tab */}
        {activeTab === 'Employee' ? (
          <Employee
            Employees={Employees}
            openEditEmployeeModal={openEditEmployeeModal}
            actionMenuVisible={actionMenuVisible}
            toggleActionMenu={toggleActionMenu}
            openAddEmployeeModal={openAddEmployeeModal}
            openLoadFromLibraryModal={openLoadFromLibraryModal}
            openDeleteModal={openDeleteModal}
          />
        ) : activeTab === 'candidate' ? (
          <Candidate />
        ) : (
          <Category />
        )}

        {/* Modals */}
        <>
          <AddEmployeeModal
            isOpen={isAddEmployeeModalOpen}
            onClose={closeAddEmployeeModal}
            addEmployee={addEmployee}
          />
          <EditEmployeeModal
            isOpen={isEditEmployeeModalOpen}
            onClose={closeEditEmployeeModal}
            Employee={selectedEmployee}
            updateEmployee={updateEmployee}
          />
          <LoadFromLibraryModal
            isOpen={isLoadFromLibraryModalOpen}
            onClose={closeLoadFromLibraryModal}
            loadEmployees={loadEmployees}
          />
          <DeleteEmployee
            isOpen={isDeleteModalOpen}
            onClose={closeDeleteModal}
            onDelete={deleteEmployee}
            Employee={selectedEmployee}
          />
        </>
      </div>
    </div>
  );
}
