import React, { useState, useEffect } from 'react';
import { AddCoreValueModal } from '../component/coreValue/addCoreValue';
import { AddDimensionModal } from '../component/coreValue/addDimension'
import { EditCoreValueModal } from '../component/coreValue/editCoreValueModal';
import Navbar from '../pageSection/navBarDashboard';
import TabsCoreValue from "../component/coreValue/tabsCoreValue";
import CoreValue from '../pageSection/coreValue/coreValue';
import Dimension from '../pageSection/coreValue/dimension';
import LoadFromLibraryModal from '../component/coreValue/loadFromLibraryModal';
import DeleteModal from '../component/coreValue/deleteModal';
import { EditDimensionModal } from '../component/coreValue/editDimension';

export default function CoreValuePage() {
  const [activeTab, setActiveTab] = useState('corevalue');
    // Watch for URL hash change
    useEffect(() => {
      const handleHashChange = () => {
        const hash = window.location.hash;
        if (hash === '#corevalue') {
          setActiveTab('corevalue');
        } else if (hash === '#dimension') {
          setActiveTab('dimension');
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
  const [coreValues, setCoreValues] = useState([
    { id: '1', name: 'Kemampuan Komunikasi', dimension: 'Lorem ipsum dolor sit amet' },
    { id: '2', name: 'Kerjasama Tim', dimension: 'Consectetur adipiscing elit' },
    { id: '3', name: 'Kepemimpinan', dimension: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
  ]);

  const [dimensions, setDimensions] = useState([
    { id: '1', name: 'Dimension 1', description: 'Deskripsi Dimension 1', indicators: ['Indicator 3'] },
    { id: '2', name: 'Dimension 2', description: 'Deskripsi Dimension 2', indicators: ['Indicator 3'] },
  ]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [entityType, setEntityType] = useState(null);
  const [isEditCoreValueModalOpen, setIsEditCoreValueModalOpen] = useState(false);
  const [selectedCoreValue, setSelectedCoreValue] = useState(null);
  const [isEditDimensionModalOpen, setIsEditDimensionModalOpen] = useState(false); // Added state for Edit Dimension Modal
  const [selectedDimension, setSelectedDimension] = useState(null); // Added state for selected dimension
  const [actionMenuVisible, setActionMenuVisible] = useState(false);
  const [isAddCoreValueModalOpen, setIsAddCoreValueModalOpen] = useState(false);
  const [isAddDimensionModalOpen, setIsAddDimensionModalOpen] = useState(false);
  const [isLoadFromLibraryModalOpen, setIsLoadFromLibraryModalOpen] = useState(false);

  // Toggle action menu visibility
  const toggleActionMenu = () => setActionMenuVisible(!actionMenuVisible); 

  // Open Add Core Value Modal
  const openAddCoreValueModal = () => {
    setIsAddCoreValueModalOpen(true);
    setActionMenuVisible(false); // Close action menu when modal opens
  };

  const openAddDimensionModal = () => {
    setIsAddDimensionModalOpen(true);
    setActionMenuVisible(false);
  }

  // Close Add Core Value Modal
  const closeAddCoreValueModal = () => setIsAddCoreValueModalOpen(false);
  const closeAddDimensionModal = () => setIsAddDimensionModalOpen(false);

  // Open Edit Core Value Modal
  const openEditCoreValueModal = (coreValue) => {
    setSelectedCoreValue(coreValue); 
    setIsEditCoreValueModalOpen(true);
    setActionMenuVisible(false); // Close action menu when modal opens
  };

  // Close Edit Core Value Modal
  const closeEditCoreValueModal = () => {
    setIsEditCoreValueModalOpen(false);
    setSelectedCoreValue(null); // Reset selected value when modal closes
  };

  // Open Edit Dimension Modal
  const openEditDimensionModal = (dimension) => {
    setSelectedDimension(dimension); 
    setIsEditDimensionModalOpen(true);
    setActionMenuVisible(false); 
  };

  // Close Edit Dimension Modal
  const closeEditDimensionModal = () => { 
    setIsEditDimensionModalOpen(false);
    setSelectedDimension(null); 
  };

  // Open Load From Library Modal
  const openLoadFromLibraryModal = () => {
    setIsLoadFromLibraryModalOpen(true);
    setActionMenuVisible(false); // Close action menu when modal opens
  };

  // Close Load From Library Modal
  const closeLoadFromLibraryModal = () => setIsLoadFromLibraryModalOpen(false);

  // Load core values from the library
  const loadCoreValues = (coreValue) => {
    setCoreValues((prevValues) => [...prevValues, coreValue]);
    closeLoadFromLibraryModal();
  };

  // Update core value
  const updateCoreValue = (updatedCoreValue) => {
    setCoreValues((prevValues) =>
      prevValues.map((coreValue) =>
        coreValue.id === updatedCoreValue.id 
          ? updatedCoreValue
          : coreValue
      )
    );
    closeEditCoreValueModal();  
  };  

  const updateDimension = (updatedDimension) => {
    setDimensions((prevDimensions) =>
      prevDimensions.map((dimension) =>
        dimension.id === updatedDimension.id 
          ? updatedDimension
          : dimension
      )
    );
    closeEditDimensionModal();
  };  

  // Add new core value
  const addCoreValue = (newCoreValue) => {
    setCoreValues((prevValues) => [...prevValues, newCoreValue]);
    closeAddCoreValueModal();
  };

  // Add Dimension 
  const addDimension = (newDimension) => {
    setDimensions((prevDimensions) => [...prevDimensions, newDimension]);
    closeAddDimensionModal(); 
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

  const deleteEntity = (entity) => {
    if (entityType === 'corevalue') {
      setCoreValues((prevValues) => prevValues.filter((value) => value.id !== entity.id));
    } else if (entityType === 'dimension') {
      setDimensions((prevDimensions) => prevDimensions.filter((d) => d.id !== entity.id));
    }
    closeDeleteModal();
  };

  return (
    <div>
      <Navbar />
      <div className="px-[12%] h-full py-32">
        <TabsCoreValue activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Show CoreValue or Dimension based on the active tab */}
        {activeTab === 'corevalue' ? (
          <CoreValue
            coreValues={coreValues}
            openEditCoreValueModal={openEditCoreValueModal}
            actionMenuVisible={actionMenuVisible}
            toggleActionMenu={toggleActionMenu}
            openAddCoreValueModal={openAddCoreValueModal}
            openLoadFromLibraryModal={openLoadFromLibraryModal}
            openDeleteModal={openDeleteModal}
            id="corevalue"
          />
        ) : (
          <Dimension
            dimensions={dimensions}
            openEditDimensionModal={openEditDimensionModal}
            actionMenuVisible={actionMenuVisible}
            toggleActionMenu={toggleActionMenu}
            openAddDimensionModal={openAddDimensionModal}
            openDeleteModal={openDeleteModal} 
            id="dimension"
          />
        )}

        {/* Modals */}
        <AddCoreValueModal 
          isOpen={isAddCoreValueModalOpen} 
          onClose={closeAddCoreValueModal} 
          addCoreValue={addCoreValue} 
        />
        <AddDimensionModal
          isOpen={isAddDimensionModalOpen} 
          onClose={closeAddDimensionModal} 
          addDimension={addDimension}
        />
        <EditCoreValueModal
          isOpen={isEditCoreValueModalOpen}
          onClose={closeEditCoreValueModal}
          coreValue={selectedCoreValue}
          updateCoreValue={updateCoreValue}
        />
        <EditDimensionModal
          isOpen={isEditDimensionModalOpen}
          onClose={closeEditDimensionModal}
          dimension={selectedDimension}
          updateDimension={updateDimension}
        />
        <LoadFromLibraryModal
          isOpen={isLoadFromLibraryModalOpen}
          onClose={closeLoadFromLibraryModal}
          loadCoreValues={loadCoreValues}
        />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onDelete={deleteEntity}
          entity={selectedEntity}
          type={entityType} // Pass entity type to distinguish CoreValue from Dimension
        />
      </div>
    </div>
  );
}
