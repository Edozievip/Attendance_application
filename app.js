document.getElementById('student-form').addEventListener('submit', function (event) { 
    event.preventDefault();

    var name = document.getElementById('name').value;
    var seatNo = document.getElementById('seat-no').value;
    var studentClass = document.getElementById('studentClass').value;
    var attendance = localStorage.getItem('attendance');

    var studentData = {
        name: name,
        seatNo: seatNo,
        studentClass: studentClass,
        attendance: attendance
    };

    localStorage.setItem('studentData', JSON.stringify(studentData));
    alert('Student data saved successfully!');
});

function markAttendance(status) {
    var name = document.getElementById('name').value;
    var attendance = JSON.parse(localStorage.getItem('attendance')) || {};

    attendance[name] = status;
    localStorage.setItem('attendance', JSON.stringify(attendance));
    alert('Attendance marked as ' + status + ' for ' + name );
}