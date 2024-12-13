import React, { useState, useEffect } from 'react';
import Navbar from '../pageSection/navBarDashboard';
import TabsEmployee from "../component/Employee/tabsEmployee";
import Employee from '../pageSection/Employee/employee';
import Candidate from '../pageSection/Employee/candidate';
import Category from '../pageSection/Employee/category';
import AddEmployeeModal from '../component/Employee/addEmployee';
import AddCandidateModal from '../component/Employee/addCandidate';
import EditEmployeeModal from '../component/Employee/editEmployeeModal';
import EditCandidateModal from '../component/Employee/editCandidate';
import ImportCSVModal from '../component/Employee/importCSVModal';
import DeleteModal from '../component/coreValue/deleteModal';

export default function EmployeePage() {
  const [activeTab, setActiveTab] = useState('Employee');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#ExistingEmployee') setActiveTab('Employee');
      else if (hash === '#NewCandidate') setActiveTab('candidate');
      else if (hash === '#Category') setActiveTab('category');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check hash on initial load

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // State to hold Employees and Candidates
  const [Employees, setEmployees] = useState([
    { id: '1', name: 'Rai Julianti', email: 'rai.julianti@lintasarta.co.id', category: 'category 1', topTalent: 'EQUITABLE, FIXER', bottomTalent: 'PERFECTIONIST' },
    { id: '2', name: 'Adam Bagus Habibie', email: 'adam.bagus@lintasarta.co.id', category: 'category 1', topTalent: 'COLLABORATOR, NOBLE', bottomTalent: 'ARTICULATIVE' },
  ]);
  
  const [Candidates, setCandidates] = useState([
    { id: '1', name: 'Fathur', email: 'fathur@gmail.com', role: 'member', topTalent: 'EQUITABLE, FIXER', bottomTalent: 'PERFECTIONIST' },
  ]);

  // Modal state for managing open/close modals
  const [modalState, setModalState] = useState({
    isDeleteModalOpen: false,
    isEditEmployeeModalOpen: false,
    isEditCandidateModalOpen: false,
    isAddEmployeeModalOpen: false,
    isAddCandidateModalOpen: false,
    isImportCSVModalOpen: false,
    selectedEntity: null,
    selectedEmployee: null,
    selectedCandidate: null,
    entityType: null
  });

  // Function to open modals
  const openModal = (modalName, entity = null, type = null) => {
    setModalState(prevState => ({
      ...prevState,
      [modalName]: true,
      selectedEntity: entity,
      entityType: type,
    }));
  };

  // Function to close modals
  const closeModal = (modalName) => {
    setModalState(prevState => ({
      ...prevState,
      [modalName]: false,
      selectedEntity: null,
      selectedEmployee: null,
      selectedCandidate: null,
      entityType: null
    }));
  };

  // Function to delete an entity (Employee or Candidate)
  const deleteEntity = () => {
    if (modalState.entityType === 'Employee') {
      setEmployees(prev => prev.filter(emp => emp.id !== modalState.selectedEntity.id));
    } else if (modalState.entityType === 'Candidate') {
      setCandidates(prev => prev.filter(cand => cand.id !== modalState.selectedEntity.id));
    }
    closeModal('isDeleteModalOpen');
  };

  // Function to update employee details
  const updateEmployee = (updatedEmployee) => {
    console.log('Updating employee:', updatedEmployee);
    setEmployees(prev => prev.map(emp => (emp.id === updatedEmployee.id ? { ...emp, ...updatedEmployee } : emp)));
    closeModal('isEditEmployeeModalOpen');
  };  

  // Function to update candidate details
  const updateCandidate = (updatedCandidate) => {
    setCandidates(prev => prev.map(cand => (cand.id === updatedCandidate.id ? updatedCandidate : cand)));
    closeModal('isEditCandidateModalOpen');
  };

  const addEmployee = (newEmployee) => {
    setEmployees(prev => [...prev, newEmployee]);
    closeModal('isAddEmployeeModalOpen');
  };  

  // Function to add a new candidate
  const addCandidate = (newCandidate) => {
    setCandidates(prev => [...prev, newCandidate]);
  };

  return (
    <div>
      <Navbar />
      <div className="px-[12%] h-full py-32">
        <TabsEmployee activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'Employee' ? (
          <Employee
            Employees={Employees}
            openEditEmployeeModal={(emp) => openModal('isEditEmployeeModalOpen', emp, 'Employee')}
            openDeleteModal={(emp) => openModal('isDeleteModalOpen', emp, 'Employee')}
            openAddEmployeeModal={() => openModal('isAddEmployeeModalOpen')}
            openImportCSVModal={() => openModal('isImportCSVModalOpen')}
          />
        ) : activeTab === 'candidate' ? (
          <Candidate
            Candidates={Candidates}
            openEditCandidateModal={(cand) => openModal('isEditCandidateModalOpen', cand, 'Candidate')}
            openDeleteModal={(cand) => openModal('isDeleteModalOpen', cand, 'Candidate')}
            openAddCandidateModal={() => openModal('isAddCandidateModalOpen')}
          />
        ) : (
          <Category />
        )}

        <AddEmployeeModal 
          isOpen={modalState.isAddEmployeeModalOpen} 
          onClose={() => closeModal('isAddEmployeeModalOpen')} 
          addEmployee={addEmployee} // Pastikan addEmployee diteruskan sebagai prop
        />
        <AddCandidateModal 
          isOpen={modalState.isAddCandidateModalOpen} 
          onClose={() => closeModal('isAddCandidateModalOpen')} 
          addCandidate={addCandidate} // Passing the addCandidate function
        />
        <EditEmployeeModal
          isOpen={modalState.isEditEmployeeModalOpen}
          onClose={() => closeModal('isEditEmployeeModalOpen')}
          employee={modalState.selectedEmployee}
          updateEmployee={updateEmployee}
        />
        <EditCandidateModal
          isOpen={modalState.isEditCandidateModalOpen}
          onClose={() => closeModal('isEditCandidateModalOpen')}
          candidate={modalState.selectedCandidate}
          updateCandidate={updateCandidate}
        />
        <DeleteModal 
          isOpen={modalState.isDeleteModalOpen} 
          onClose={() => closeModal('isDeleteModalOpen')} 
          onDelete={deleteEntity} 
        />
        <ImportCSVModal 
          isOpen={modalState.isImportCSVModalOpen} 
          onClose={() => closeModal('isImportCSVModalOpen')} 
        />
      </div>
    </div>
  );
}
