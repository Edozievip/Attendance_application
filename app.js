function markAttendance(status) {
    const studentName = document.getElementById("studentName").value;
    const seatNumber = document.getElementById("seatNumber").value;
    const studentClass = document.getElementById("studentClass").value;
  
    if (studentName && seatNumber && studentClass) {
      // Create an object to store student data and attendance status
      const studentData = {
        name: studentName,
        seat: seatNumber,
        classNo: studentClass,
        attendance: status,
      };
  
      // Check if there is already data in local storage
      let attendanceData =
        JSON.parse(localStorage.getItem("attendanceData")) || [];
  
      // check if the student is already marked present or absent
      const student = attendanceData.find(
        (student) =>
          student.name === studentName &&
          student.seat === seatNumber &&
          student.classNo === studentClass
      );
      if (student) {
        alert(`${student.name} is already marked ${student.attendance}.`);
        return;
      }
  
      // Add new student data to the array
      attendanceData.push(studentData);
  
      // Save the updated data back to local storage
      localStorage.setItem("attendanceData", JSON.stringify(attendanceData));
  
      // Clear input fields
      document.getElementById("studentName").value = "";
      document.getElementById("seatNumber").value = "";
      document.getElementById("studentClass").value = "";
  
      // Update the table
      updateTable();
    } else {
      alert("Please fill out all fields.");
    }
  }
  
  function updateTable() {
    const table = document.getElementById("attendanceTable");
    table.innerHTML = `
          <tr>
              <th>S/N</th>
              <th>Student Name</th>
              <th>Seat Number</th>
              <th>Class</th>
              <th>Attendance</th>
          </tr>
      `;
  
    const attendanceData =
      JSON.parse(localStorage.getItem("attendanceData")) || [];
    attendanceData.forEach((student, index) => {
      const row = table.insertRow(-1);
      const cell0 = row.insertCell(0);
      const cell1 = row.insertCell(1);
      const cell2 = row.insertCell(2);
      const cell3 = row.insertCell(3);
      const cell4 = row.insertCell(4);
  
      cell0.textContent = index + 1;
      cell1.textContent = student.name;
      cell2.textContent = student.seat;
      cell3.textContent = student.classNo;
      cell4.textContent = student.attendance;
  
      // Set text color based on attendance status
      if (student.attendance === "Present") {
        cell4.style.color = "green";
        cell4.textContent = "P";
      } else if (student.attendance === "Absent") {
        cell4.style.color = "red";
        cell4.textContent = "A";
      }
    });
  }
  
  // Call updateTable function on page load to display existing data from local storage
  updateTable();
  