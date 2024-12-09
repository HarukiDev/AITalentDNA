import React, { useState } from 'react';
import { AddCompetencyModal } from '../component/competency/addCompetency';
import DeleteCompetency from '../component/competency/deleteCompetency';
import { EditCompetencyModal } from '../component/competency/editCompetency';
import LoadFromLibraryCompetencyModal from '../component/competency/loadFromLibraryModal';
import { AddJobRoleModal } from '../component/jobRole/addJobRoleModal';
import DeleteJobRole from '../component/jobRole/deleteJobRole';
import { EditJobRoleModal } from '../component/jobRole/editJobRoleModal';
import LoadFromLibraryModal from '../component/jobRole/loadFromLibraryModal';
import TabsJobRole from "../component/jobRole/tabsJobRole";
import Competency from '../pageSection/jobRole/competency';
import JobRole from '../pageSection/jobRole/jobRolesSection';
import Navbar from '../pageSection/navBarDashboard';

export default function JobRolesPage() {
  const [activeTab, setActiveTab] = useState('jobrole');
  const [jobRoles, setJobRoles] = useState([
    {
      id: 1,
      name: 'Nurse Practitioner',
      competency: [
        'Asuhan Keperawatan Holistik',
        'Kemampuan Komunikasi Efektif',
        'Kepatuhan terhadap Protokol dan Prosedur Medis',
      ],
      additionalCompetency: ['Manajemen Gawat Darurat', 'Manajemen Kasus Kompleks'],
    },
    {
      id: 2,
      name: 'Dokter Umum',
      competency: [
        'Kemampuan Diagnosis Klinis',
        'Komunikasi Efektif',
        'Manajemen Gawat Darurat',
      ],
      additionalCompetency: ['Penelitian Klinis', 'Pengembangan Protokol'],
    },
    {
      id: 3,
      name: 'Medical Assistant',
      competency: ['Komunikasi Efektif', 'Empati dan Kepedulian'],
      additionalCompetency: ['Kemampuan Manajemen'],
    },
    {
      id: 4,
      name: 'Therapist',
      competency: ['Pemulihan Fisik', 'Kerjasama Tim'],
      additionalCompetency: ['Teknik Pemulihan'],
    },
    {
      id: 5,
      name: 'Pharmacist',
      competency: ['Manajemen Obat', 'Pengambilan Keputusan Klinis'],
      additionalCompetency: ['Etika Profesi'],
    },
  ]);

  const [competencies, setCompetencies] = useState([
    {
      id: 1,
      name: "Adaptabilitas",
      level: "-",
      description: "Mampu beradaptasi dengan perubahan tugas atau prioritas secara fleksibel.",
      indicators: [
        "Menyesuaikan diri dengan cepat ketika ada perubahan instruksi",
        "Bersedia melakukan tugas mendadak",
        "Tetap tenang dalam situasi yang berubah-ubah",
      ],
    },
    {
      id: 2,
      name: "Komunikasi",
      level: "-",
      description: "Menyampaikan informasi secara efektif kepada orang lain.",
      indicators: [
        "Menggunakan bahasa yang mudah dipahami",
        "Mendengarkan dengan aktif",
        "Memberikan umpan balik yang konstruktif",
      ],
    },
    {
      id: 3,
      name: "Kepemimpinan",
      level: "-",
      description: "Kemampuan untuk memimpin dan mengarahkan tim dengan efektif.",
      indicators: [
        "Memberikan arahan yang jelas",
        "Memotivasi tim untuk mencapai tujuan",
        "Menyelesaikan konflik dalam tim secara bijak",
      ],
    },
  ]);

  // Job Role State Management
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditJobRoleModalOpen, setIsEditJobRoleModalOpen] = useState(false);
  const [selectedJobRole, setSelectedJobRole] = useState(null);
  const [isAddJobRoleModalOpen, setIsAddJobRoleModalOpen] = useState(false);
  const [isLoadFromLibraryModalOpen, setIsLoadFromLibraryModalOpen] = useState(false);
  

  // Competency State Management
  const [isDeleteCompetencyModalOpen, setIsDeleteCompetencyModalOpen] = useState(false);
  const [isEditCompetencyModalOpen, setIsEditCompetencyModalOpen] = useState(false);
  const [selectedCompetencies, setSelectedCompetency] = useState(null);
  const [isAddCompetencyModalOpen, setIsAddCompetencyModalOpen] = useState(false);
  const [isLoadFromLibraryCompetencyModalOpen, setIsLoadFromLibraryCompetencyModalOpen] = useState(false);

  // Job Role Handlers
  const addJobRole = (newJobRole) => {
    setJobRoles((prevValues) => [...prevValues, newJobRole]);
    setIsAddJobRoleModalOpen(false);
  };

  const updateJobRole = (updatedJobRole) => {
    setJobRoles((prevValues) =>
      prevValues.map((jobRole) =>
        jobRole.id === updatedJobRole.id ? updatedJobRole : jobRole
      )
    );
    setIsEditJobRoleModalOpen(false);
  };

  const deleteJobRole = () => {
    setJobRoles((prevValues) =>
      prevValues.filter((value) => value.id !== selectedJobRole.id)
    );
    setIsDeleteModalOpen(false);
  };

  const loadJobRoles = (jobRole) => {
    setJobRoles((prevValues) => [...prevValues, jobRole]);
    setIsLoadFromLibraryModalOpen(false);
  };

  // Competency Handlers
  const addCompetency = (newCompetency) => {
    setCompetencies((prevValues) => [...prevValues, newCompetency]);
    setIsAddCompetencyModalOpen(false);
  };

  const updateCompetency = (updatedCompetency) => {
    setCompetencies((prevValues) =>
      prevValues.map((competency) =>
        competency.id === updatedCompetency.id ? updatedCompetency : competency
      )
    );
    setIsEditCompetencyModalOpen(false);
  };

  const deleteCompetency = () => {
    setCompetencies((prevValues) =>
      prevValues.filter((value) => value.id !== selectedCompetencies.id)
    );
    setIsDeleteCompetencyModalOpen(false);
  };


  const loadCompetencies = (competenciesToAdd) => {
    setCompetencies((prevValues) => [...prevValues, ...competenciesToAdd]);
    setIsLoadFromLibraryCompetencyModalOpen(false);
  };
  

  return (
    <div>
      <Navbar />
      <div className="px-[12%] h-full py-32">
        <TabsJobRole activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'jobrole' ? (
          <JobRole
            jobRoles={jobRoles}
            openEditJobRoleModal={(jobRole) => {
              setSelectedJobRole(jobRole);
              setIsEditJobRoleModalOpen(true);
            }}
            openAddJobRoleModal={() => setIsAddJobRoleModalOpen(true)}
            openLoadFromLibraryModal={() => setIsLoadFromLibraryModalOpen(true)}
            openDeleteModal={(jobRole) => {
              setSelectedJobRole(jobRole);
              setIsDeleteModalOpen(true);
            }}
          />
        ) : (
          <Competency
            competencies={competencies}
            openEditCompetencyModal={(competency) => {
              setSelectedCompetency(competency);
              setIsEditCompetencyModalOpen(true);
            }}
            openAddCompetencyModal={() => setIsAddCompetencyModalOpen(true)}
            openLoadFromLibraryModal={() => setIsLoadFromLibraryCompetencyModalOpen(true)}
            openDeleteModal={(competency) => {
              setSelectedCompetency(competency);
              setIsDeleteCompetencyModalOpen(true);
            }}
          />
        )}

        {/* Job Role Modals */}
        <AddJobRoleModal
          isOpen={isAddJobRoleModalOpen}
          onClose={() => setIsAddJobRoleModalOpen(false)}
          addJobRole={addJobRole}
        />
        <EditJobRoleModal
          isOpen={isEditJobRoleModalOpen}
          onClose={() => setIsEditJobRoleModalOpen(false)}
          jobRole={selectedJobRole}
          updateJobRole={updateJobRole}
        />
        <LoadFromLibraryModal
          isOpen={isLoadFromLibraryModalOpen}
          onClose={() => setIsLoadFromLibraryModalOpen(false)}
          loadJobRoles={loadJobRoles}
        />
        <DeleteJobRole
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={deleteJobRole}
          jobRole={selectedJobRole}
        />

        {/* Competency Modals */}
        <AddCompetencyModal
          isOpen={isAddCompetencyModalOpen}
          onClose={() => setIsAddCompetencyModalOpen(false)}
          addCompetency={addCompetency}
        />
        <EditCompetencyModal
          isOpen={isEditCompetencyModalOpen}
          onClose={() => setIsEditCompetencyModalOpen(false)}
          competency={selectedCompetencies}
          updateCompetency={updateCompetency}
        />
        <LoadFromLibraryCompetencyModal
          isOpen={isLoadFromLibraryCompetencyModalOpen}
          onClose={() => setIsLoadFromLibraryCompetencyModalOpen(false)}
          loadCompetencies={loadCompetencies}
        />
        <DeleteCompetency
          isOpen={isDeleteCompetencyModalOpen}
          onClose={() => setIsDeleteCompetencyModalOpen(false)}
          onDelete={deleteCompetency}
          competency={selectedCompetencies}
        />
      </div>
    </div>
  );
}