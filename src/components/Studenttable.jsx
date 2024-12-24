import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStudent, deleteStudent, addStudent } from '../redux/studentSlice'; 
import AddStudentModal from './AddStudentModal';
import { toast } from 'react-toastify';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const StudentTable = ({ searchTerm }) => {
  const students = useSelector((state) => state.students.students); 
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCohort, setSelectedCohort] = useState('All'); 
  const [selectedStatus, setSelectedStatus] = useState(''); 
  const [studentToEdit, setStudentToEdit] = useState(null); 

  const memoizedStudents = useMemo(() => students, [students]);

  const filteredStudents = useMemo(() => {
    return memoizedStudents.filter((student) => {
      const nameMatch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
      const courseMatch = student.courses.some((course) =>
        course.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const cohortMatch = selectedCohort === 'All' || student.cohort === selectedCohort; 
      const statusMatch = selectedStatus === '' || student.status === selectedStatus; 
      return (nameMatch || courseMatch) && cohortMatch && statusMatch;
    });
  }, [memoizedStudents, searchTerm, selectedCohort, selectedStatus]);

  const handleEditStatus = (studentId, newStatus) => {
    const updatedStudent = {
      ...students.find((student) => student.id === studentId),
      status: newStatus,
    };
    dispatch(updateStudent(updatedStudent));
    toast.success('Student status updated successfully!');
  };

  const handleEditStudent = (student) => {
    setStudentToEdit(student);
    setIsModalOpen(true);
  };

  const handleDeleteStudent = (studentId) => {
    dispatch(deleteStudent(studentId)); 
    toast.success('Student deleted successfully!');
  };

  const handleAddStudent = (newStudent) => {
    dispatch(addStudent(newStudent));
  };

  return (
    <div className="p-8 bg-gray-100 flex justify-end">
      <div className="overflow-x-auto w-4/5">
        <div className="flex justify-between mb-5">
          <div className="flex space-x-4">
            <select
              className="px-2 py-1 border border-gray-300 rounded-md text-sm"
              value={selectedCohort}
              onChange={(e) => setSelectedCohort(e.target.value)}
            >
              <option value="All">All</option>
              <option>AY 2024-25</option>
              <option>AY 2023-24</option>
              <option>AY 2022-23</option>
              <option>AY 2021-22</option>
              <option>AY 2020-21</option>
            </select>
            <select
              className="px-2 py-1 border border-gray-300 rounded-md text-sm"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="px-3 py-1 bg-gray-500 text-white text-sm rounded-md shadow-md hover:bg-gray-600"
              onClick={() => {
                setStudentToEdit(null); 
                setIsModalOpen(true);
              }}
            >
              + Add New Student
            </button>
          </div>
        </div>

        <table className="min-w-full bg-white shadow-md rounded-lg mx-auto">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Student Name</th>
              <th className="px-4 py-2 text-left">Cohort</th>
              <th className="px-4 py-2 text-left">Courses</th>
              <th className="px-4 py-2 text-left">Date Joined</th>
              <th className="px-4 py-2 text-left">Last Login</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{student.name}</td>
                  <td className="px-4 py-2 border-b">{student.cohort}</td>
                  <td className="px-4 py-2 border-b">{student.courses.join(', ')}</td>
                  <td className="px-4 py-2 border-b">{student.dateJoined}</td>
                  <td className="px-4 py-2 border-b">{student.lastLogin}</td>
                  <td className="px-4 py-2 border-b">
                    <span
                      className={`inline-block px-3 py-1 text-xs rounded-full ${student.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                    >
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b flex gap-2">
                    <button onClick={() => handleEditStudent(student)} className="text-yellow-500">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDeleteStudent(student.id)} className="text-red-500">
                      <FaTrashAlt />
                    </button>
                    <button
                      onClick={() => handleEditStatus(student.id, student.status === 'active' ? 'inactive' : 'active')}
                      className="text-blue-500"
                    >
                      Toggle Status
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center px-4 py-2">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <AddStudentModal
          studentToEdit={studentToEdit}
          onClose={() => setIsModalOpen(false)}
          onAddStudent={handleAddStudent} 
          onEditStudent={(updatedStudent) => dispatch(updateStudent(updatedStudent))}
        />
      )}
    </div>
  );
};

export default StudentTable;
