import React, { useState } from 'react';
import { AddEmployeeModal } from '../component/Employee/addEmployee';
import { EditEmployeeModal } from '../component/Employee/editEmployeeModal';
import Navbar from '../pageSection/navBarDashboard';
import TabsEmployee from "../component/Employee/tabsEmployee";
import Employee from '../pageSection/Employee/employee';
import Candidate from '../pageSection/Employee/candidate';
import Category from '../pageSection/Employee/category';
import ImportCSVModal from '../component/Employee/importCSVModal'; // Ensure this import is correct
import DeleteEmployee from '../component/Employee/deleteEmployee';

export default function EmployeePage() {
  const [activeTab, setActiveTab] = useState('Employee');
  const [Employees, setEmployees] = useState([
    // Sample employee data
    { id: '1', 
      name: 'Rai Julianti', 
      email: 'rai.julianti@lintasarta.co.id', 
      category: 'category 1', 
      topTalent: 'EQUITABLE, FIXER, FORGIVING, COLLABORATOR, NOBLE, COMPETITIVE, INITIATOR, EXPLORER, ENERGIZER, DEVELOPER',
      bottomTalent: 'PERFECTIONIST, ARTICULATIVE, COURAGEOUS, PERSONALIZER, ADVISOR',
      candidate: 'Lorem ipsum dolor sit amet' },
    { id: '2', 
      name: 'Adam Bagus Habibie', 
      email: 'adam.bagus@lintasarta.co.id', 
      category: 'category 1', 
      topTalent: 'EQUITABLE, FIXER, FORGIVING, COLLABORATOR, NOBLE, COMPETITIVE, INITIATOR, EXPLORER, ENERGIZER, DEVELOPER',
      bottomTalent: 'PERFECTIONIST, ARTICULATIVE, COURAGEOUS, PERSONALIZER, ADVISOR',
      candidate: 'Lorem ipsum dolor sit amet' },
    { id: '3', 
      name: 'Annisa Nuraini', 
      email: 'annisa.nuraini@lintasarta.co.id', 
      category: 'category 1', 
      topTalent: 'EQUITABLE, FIXER, FORGIVING, COLLABORATOR, NOBLE, COMPETITIVE, INITIATOR, EXPLORER, ENERGIZER, DEVELOPER',
      bottomTalent: 'PERFECTIONIST, ARTICULATIVE, COURAGEOUS, PERSONALIZER, ADVISOR',
      candidate: 'Lorem ipsum dolor sit amet' },
    { id: '4', 
      name: 'Sahla Sholiha', 
      email: 'sahla.sholiha@lintasarta.co.id', 
      category: 'category 1', 
      topTalent: 'EQUITABLE, FIXER, FORGIVING, COLLABORATOR, NOBLE, COMPETITIVE, INITIATOR, EXPLORER, ENERGIZER, DEVELOPER',
      bottomTalent: 'PERFECTIONIST, ARTICULATIVE, COURAGEOUS, PERSONALIZER, ADVISOR',
      candidate: 'Lorem ipsum dolor sit amet' },
    { id: '5', 
      name: 'Lultfi Fauzie', 
      email: 'luthfi.fauzie@lintasarta.co.id', 
      category: 'category 1', 
      topTalent: 'EQUITABLE, FIXER, FORGIVING, COLLABORATOR, NOBLE, COMPETITIVE, INITIATOR, EXPLORER, ENERGIZER, DEVELOPER',
      bottomTalent: 'PERFECTIONIST, ARTICULATIVE, COURAGEOUS, PERSONALIZER, ADVISOR',
      candidate: 'Lorem ipsum dolor sit amet' },
  ]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditEmployeeModalOpen, setIsEditEmployeeModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [actionMenuVisible, setActionMenuVisible] = useState(false);
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [isImportCSVModalOpen, setIsImportCSVModalOpen] = useState(false); // State for the ImportCSVModal

  const toggleActionMenu = () => setActionMenuVisible(!actionMenuVisible);

  // Open Add Employee Modal
  const openAddEmployeeModal = () => {
    setIsAddEmployeeModalOpen(true);
    setActionMenuVisible(false); // Close action menu when modal opens
  };

  // Close Add Employee Modal
  const closeAddEmployeeModal = () => setIsAddEmployeeModalOpen(false);

  // Open ImportCSV Modal
  const openImportCSVModal = () => {
    setIsImportCSVModalOpen(true); // Open ImportCSVModal
    setActionMenuVisible(false); // Close action menu when modal opens
  };

  // Close ImportCSV Modal
  const closeImportCSVModal = () => setIsImportCSVModalOpen(false);

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
            openImportCSVModal={openImportCSVModal} // Pass function to open the ImportCSV modal
            openDeleteModal={openDeleteModal}
          />
        ) : activeTab === 'candidate' ? (
          <Candidate />
        ) : (
          <Category />
        )}

        {/* Modals */}
        <AddEmployeeModal
          isOpen={isAddEmployeeModalOpen}
          onClose={closeAddEmployeeModal}
          // Additional props for Add Employee Modal
        />
        <EditEmployeeModal
          isOpen={isEditEmployeeModalOpen}
          onClose={closeEditEmployeeModal}
          Employee={selectedEmployee}
          // Additional props for Edit Employee Modal
        />
      
        <DeleteEmployee
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onDelete={deleteEmployee}
          Employee={selectedEmployee}
        />

        {/* Import CSV Modal */}
        <ImportCSVModal
          isOpen={isImportCSVModalOpen}
          onClose={closeImportCSVModal} // Close handler for the ImportCSVModal
          // Additional props for ImportCSVModal
        />
      </div>
    </div>
  );
}
