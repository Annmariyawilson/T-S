import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AddStudentModal = ({ onClose, onAddStudent, studentToEdit, onEditStudent }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    cohort: 'AY 2024-25',
    courses: '',
    dateJoined: new Date().toLocaleDateString(),
    lastLogin: new Date().toLocaleString(),
    status: 'active',
  });

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        ...formData,
        ...studentToEdit,
        courses: studentToEdit.courses.join(', '), 
      });
    }
  }, [studentToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.courses.trim()) {
      toast.error('Please fill in all fields before submitting!');
      return;
    }

    const coursesArray = formData.courses
      .split(',')
      .map((course) => course.trim())
      .filter((course) => course); 

    if (studentToEdit) {
      const updatedStudent = {
        ...studentToEdit,
        name: formData.name,
        cohort: formData.cohort,
        courses: coursesArray,
        lastLogin: new Date().toLocaleString(), 
      };
      onEditStudent(updatedStudent);
      toast.success('Student updated successfully!');
    } else {
      const newStudent = {
        ...formData,
        id: Date.now().toString(),
        courses: coursesArray,
      };
      onAddStudent(newStudent);
      toast.success('New student added successfully!');
    }

    setFormData({
      id: '',
      name: '',
      cohort: 'AY 2024-25',
      courses: '',
      dateJoined: new Date().toLocaleDateString(),
      lastLogin: new Date().toLocaleString(),
      status: 'active',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">
          {studentToEdit ? 'Edit Student' : 'Add New Student'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Student Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
            <select
              name="cohort"
              value={formData.cohort}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option>AY 2024-25</option>
              <option>AY 2023-24</option>
              <option>AY 2022-23</option>
              <option>AY 2021-22</option>
              <option>AY 2020-21</option>
            </select>
            <textarea
              name="courses"
              placeholder="Courses (comma separated)"
              value={formData.courses}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md"
            >
              {studentToEdit ? 'Save Changes' : 'Add Student'}
            </button>
          </div>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-gray-600 text-sm underline"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddStudentModal;
