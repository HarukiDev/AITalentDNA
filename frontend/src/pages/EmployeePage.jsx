import React, { useState, useEffect } from 'react';
import { AddEmployeeModal } from '../component/Employee/addEmployee';
import { AddCandidateModal } from '../component/Employee/addCandidate';
import { EditEmployeeModal } from '../component/Employee/editEmployeeModal';
import { EditCandidateModal } from '../component/Employee/editCandidate';
import Navbar from '../pageSection/navBarDashboard';
import TabsEmployee from "../component/Employee/tabsEmployee";
import Employee from '../pageSection/Employee/employee';
import Candidate from '../pageSection/Employee/candidate';
import Category from '../pageSection/Employee/category';
import ImportCSVModal from '../component/Employee/importCSVModal';
import DeleteModal from '../component/coreValue/deleteModal';

export default function EmployeePage() {
  const [activeTab, setActiveTab] = useState('Employee');
  // Watch for URL hash change
      useEffect(() => {
        const handleHashChange = () => {
          const hash = window.location.hash;
          if (hash === '#ExistingEmployee') {
            setActiveTab('Employee');
          } else if (hash === '#NewCandidate') {
            setActiveTab('candidate');
          } else if (hash === '#Category') {
            setActiveTab('category');
          }
        };
    
        // Listen for hash changes
        window.addEventListener('hashchange', handleHashChange);
    
        // Check on initial load
        handleHashChange();
    
        // Cleanup listener when component unmounts
        return () => {
          window.removeEventListener('hashchange', handleHashChange);
        };
      }, []);
      
  const [Employees, setEmployees] = useState([
    { id: '1', name: 'Rai Julianti', email: 'rai.julianti@lintasarta.co.id', category: 'category 1', topTalent: 'EQUITABLE, FIXER', bottomTalent: 'PERFECTIONIST' },
    { id: '2', name: 'Adam Bagus Habibie', email: 'adam.bagus@lintasarta.co.id', category: 'category 1', topTalent: 'COLLABORATOR, NOBLE', bottomTalent: 'ARTICULATIVE' },
  ]);
  const [Candidates, setCandidates] = useState([
    { id: '1', name: 'Fathur', email: 'fathur@gmail.com', role: 'member', topTalent: 'EQUITABLE, FIXER', bottomTalent: 'PERFECTIONIST' },
  ]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [entityType, setEntityType] = useState(null);
  const [isEditEmployeeModalOpen, setIsEditEmployeeModalOpen] = useState(false);
  const [isEditCandidateModalOpen, setIsEditCandidateModalOpen] = useState(false);
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [isAddCandidateModalOpen, setIsAddCandidateModalOpen] = useState(false);
  const [isImportCSVModalOpen, setIsImportCSVModalOpen] = useState(false);
  const [actionMenuVisible, setActionMenuVisible] = useState(false);

  // Toggle action menu visibility
  const toggleActionMenu = () => setActionMenuVisible(!actionMenuVisible);

  const openAddEmployeeModal = () => setIsAddEmployeeModalOpen(true);
  const closeAddEmployeeModal = () => setIsAddEmployeeModalOpen(false);

  const openAddCandidateModal = () => setIsAddCandidateModalOpen(true);
  const closeAddCandidateModal = () => setIsAddCandidateModalOpen(false);

  const openEditEmployeeModal = (employee) => {
    setSelectedEmployee(employee);
    setIsEditEmployeeModalOpen(true);
  };
  const closeEditEmployeeModal = () => {
    setIsEditEmployeeModalOpen(false);
    setSelectedEmployee(null);
  };

  const openEditCandidateModal = (candidate) => {
    setSelectedCandidate(candidate);
    setIsEditCandidateModalOpen(true);
  };
  const closeEditCandidateModal = () => {
    setIsEditCandidateModalOpen(false);
    setSelectedCandidate(null);
  };

  const openDeleteModal = (entity, type) => {
    setSelectedEntity(entity);
    setEntityType(type);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedEntity(null);
    setEntityType(null);
  };

  const deleteEntity = () => {
    if (entityType === 'Employee') {
      setEmployees((prev) => prev.filter((item) => item.id !== selectedEntity.id));
    } else if (entityType === 'Candidate') {
      setCandidates((prev) => prev.filter((item) => item.id !== selectedEntity.id));
    }
    closeDeleteModal();
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
    );
    closeEditEmployeeModal();
  };

  const updateCandidate = (updatedCandidate) => {
    setCandidates((prev) =>
      prev.map((cand) => (cand.id === updatedCandidate.id ? updatedCandidate : cand))
    );
    closeEditCandidateModal();
  };

  return (
    <div>
      <Navbar />
      <div className="px-[12%] h-full py-32">
        <TabsEmployee activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'Employee' ? (
          <Employee
            Employees={Employees}
            openEditEmployeeModal={openEditEmployeeModal}
            actionMenuVisible={actionMenuVisible}
            toggleActionMenu={toggleActionMenu}
            openAddEmployeeModal={openAddEmployeeModal}
            openImportCSVModal={() => setIsImportCSVModalOpen(true)}
            openDeleteModal={(entity) => openDeleteModal(entity, 'Employee')}
          />
        ) : activeTab === 'candidate' ? (
          <Candidate
            Candidates={Candidates}
            openEditCandidateModal={openEditCandidateModal}
            actionMenuVisible={actionMenuVisible}
            toggleActionMenu={toggleActionMenu}
            openAddCandidateModal={openAddCandidateModal}
            openDeleteModal={(entity) => openDeleteModal(entity, 'Candidate')}
          />
        ) : (
          <Category />
        )}

        {/* Modals */}
        <AddEmployeeModal isOpen={isAddEmployeeModalOpen} onClose={closeAddEmployeeModal} />
        <AddCandidateModal isOpen={isAddCandidateModalOpen} onClose={closeAddCandidateModal} />
        <EditEmployeeModal
          isOpen={isEditEmployeeModalOpen}
          onClose={closeEditEmployeeModal}
          Employee={selectedEmployee}
          updateEmployee={updateEmployee}
        />
        <EditCandidateModal
          isOpen={isEditCandidateModalOpen}
          onClose={closeEditCandidateModal}
          Candidate={selectedCandidate}
          updateCandidate={updateCandidate}
        />
        <DeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} onDelete={deleteEntity} />
        <ImportCSVModal isOpen={isImportCSVModalOpen} onClose={() => setIsImportCSVModalOpen(false)} />
      </div>
    </div>
  );
}
