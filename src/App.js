import React, { useState } from 'react';

// Test data - Do not modify
const students = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Diana" },
  { id: 5, name: "Edward" }
];

function App() {
  // Step 1: Set up state to track seat assignments (empty string indicates unassigned seat)
  const [seats, setSeats] = useState({
    seat1: "",
    seat2: "",
    seat3: "",
    seat4: "",
    seat5: ""
  });

  // Step 2: Function to handle the assignment of a student to a seat
  const handleSeatAssignment = (seat, studentId) => {
    setSeats(prevSeats => {
      const newSeats = { ...prevSeats };
      newSeats[seat] = studentId;
      return newSeats;
    });
  };

  // Step 3: Get the available students for each seat (those not already assigned)
  const getAvailableStudents = (assignedSeats) => {
    const assignedStudentIds = Object.values(assignedSeats).filter(Boolean);
    return students.filter(student => !assignedStudentIds.includes(student.id));
  };

  // Step 4: Calculate the number of assigned and available students
  const assignedStudents = Object.values(seats).filter(studentId => studentId !== "");
  const availableStudents = students.length - assignedStudents.length;

  // Step 5: Function to reset all seat assignments
  const resetAll = () => {
    setSeats({
      seat1: "",
      seat2: "",
      seat3: "",
      seat4: "",
      seat5: ""
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'left' }}>Classroom Seat Assignment</h1>

      {/* Step 6: Display total seats, assigned students, and available students in a row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ textAlign: 'center', backgroundColor: '#ADD8E6', padding: '10px', borderRadius: '5px', width: '30%' }}>
          <p><strong>Total Seats:</strong> 5</p>
        </div>
        <div style={{ textAlign: 'center', backgroundColor: '#90EE90', padding: '10px', borderRadius: '5px', width: '30%' }}>
          <p><strong>Assigned Students:</strong> {assignedStudents.length}</p>
        </div>
        <div style={{ textAlign: 'center', backgroundColor: '#FFFFE0', padding: '10px', borderRadius: '5px', width: '30%' }}>
          <p><strong>Available Students:</strong> {availableStudents}</p>
        </div>
      </div>

      {/* Step 7: Seats layout in 3 columns */}
      <div style={seatsGridStyle}>
        {Object.keys(seats).map(seat => {
          const seatNumber = seat.replace('seat', '');
          const assignedStudentId = seats[seat];
          const availableStudentsList = getAvailableStudents(seats);

          // Determine the seat's background color
          const seatBackgroundColor = assignedStudentId ? '#90EE90' : '#f9f9f9'; // Light green if assigned, light gray if empty

          return (
            <div key={seat} style={{ ...seatCardStyle, backgroundColor: seatBackgroundColor }}>
              {/* Seat Status (Occupied or Empty) */}
              <div style={seatCardHeader}>
                {assignedStudentId ? 'Occupied' : 'Empty'}
              </div>
              <div style={{ marginTop: '10px' }}>
                <label>Seat {seatNumber}: </label>

                {/* If the seat is assigned, show the student's name in the dropdown */}
                <select
                  value={assignedStudentId || ""}
                  onChange={(m) => handleSeatAssignment(seat, m.target.value)}
                  style={selectStyle}
                  disabled={assignedStudentId} // Disable dropdown if the seat is already occupied
                >
                  {!assignedStudentId && <option value="">Select Student</option>}
                  {availableStudentsList.map(student => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                  {assignedStudentId && (
                    <option value={assignedStudentId} disabled>
                      {students.find(student => student.id === assignedStudentId)?.name}
                    </option>
                  )}
                </select>
              </div>
            </div>
          );
        })}
      </div>

      {/* Step 8: Reset All Button */}
      <button onClick={resetAll} style={resetButtonStyle}>Reset All</button>
    </div>
  );
}

// Layout for seats in 3 columns
const seatsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',  // 3 columns
  gap: '20px',
  marginBottom: '20px'
};

// Individual seat card styling
const seatCardStyle = {
  padding: '15px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  position: 'relative'
};

// Seat header (top-right position for 'Occupied' or 'Empty' text)
const seatCardHeader = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#888'
};

// Select dropdown styling
const selectStyle = {
  marginLeft: '10px',
  padding: '5px',
  fontSize: '14px',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

// Reset button styling with red color and full width
const resetButtonStyle = {
  marginTop: '20px',
  padding: '15px 20px',
  fontSize: '16px',
  backgroundColor: '#FF6347', // Red color
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  width: '100%' // Full width
};

export default App;
