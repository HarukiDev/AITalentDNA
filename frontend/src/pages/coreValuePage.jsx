import React, { useState } from 'react';
import { AddCoreValueModal } from '../component/coreValue/addCoreValue';
import { EditCoreValueModal } from '../component/coreValue/editCoreValueModal';
import Navbar from '../pageSection/navBarDashboard';
import TabsCoreValue from "../component/coreValue/tabsCoreValue";
import CoreValue from '../pageSection/coreValue/coreValue';
import Dimension from '../pageSection/coreValue/dimension';
import LoadFromLibraryModal from '../component/coreValue/loadFromLibraryModal';
import DeleteCoreValue from '../component/coreValue/deleteCoreValue';

export default function CoreValuePage() {
  const [activeTab, setActiveTab] = useState('corevalue');
  const [coreValues, setCoreValues] = useState([
    { id: '1', name: 'Kemampuan Komunikasi', dimension: 'Lorem ipsum dolor sit amet' },
    { id: '2', name: 'Kerjasama Tim', dimension: 'Consectetur adipiscing elit' },
    { id: '3', name: 'Kepemimpinan', dimension: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
  ]);  

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [isEditCoreValueModalOpen, setIsEditCoreValueModalOpen] = useState(false);
  const [selectedCoreValue, setSelectedCoreValue] = useState(null);
  const [actionMenuVisible, setActionMenuVisible] = useState(false);
  const [isAddCoreValueModalOpen, setIsAddCoreValueModalOpen] = useState(false);
  const [isLoadFromLibraryModalOpen, setIsLoadFromLibraryModalOpen] = useState(false);

  // Toggle action menu visibility
  const toggleActionMenu = () => setActionMenuVisible(!actionMenuVisible); 

  // Open Add Core Value Modal
  const openAddCoreValueModal = () => {
    setIsAddCoreValueModalOpen(true);
    setActionMenuVisible(false); // Close action menu when modal opens
  };

  // Close Add Core Value Modal
  const closeAddCoreValueModal = () => setIsAddCoreValueModalOpen(false);

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
        coreValue.id === updatedCoreValue.id  // Use ID to identify the core value
          ? updatedCoreValue
          : coreValue
      )
    );
    closeEditCoreValueModal();  // Close modal after update
  };  

  // Add new core value
  const addCoreValue = (newCoreValue) => {
    setCoreValues((prevValues) => [...prevValues, newCoreValue]);
    closeAddCoreValueModal();
  };

  const openDeleteModal = (coreValue) => {
    setSelectedCoreValue(coreValue);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedCoreValue(null);
  };

  const deleteCoreValue = (coreValue) => {
    setCoreValues((prevValues) =>
      prevValues.filter((value) => value.name !== coreValue.name)
    );
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
          />
        ) : (
          <Dimension />
        )}

        {/* Modals */}
        <AddCoreValueModal 
          isOpen={isAddCoreValueModalOpen} 
          onClose={closeAddCoreValueModal} 
          addCoreValue={addCoreValue} 
        />
        <EditCoreValueModal
          isOpen={isEditCoreValueModalOpen}
          onClose={closeEditCoreValueModal}
          coreValue={selectedCoreValue}
          updateCoreValue={updateCoreValue}
        />
        <LoadFromLibraryModal
          isOpen={isLoadFromLibraryModalOpen}
          onClose={closeLoadFromLibraryModal}
          loadCoreValues={loadCoreValues}
        />
        <DeleteCoreValue
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onDelete={deleteCoreValue}
          coreValue={selectedCoreValue}
        />
      </div>
    </div>
  );
}
