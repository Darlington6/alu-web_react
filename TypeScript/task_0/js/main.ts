export interface Student {
  firstName: string;
  lastName: string;
  age: number;
  location: string;
}

const student1: Student = {
  firstName: 'First',
  lastName: 'Student',
  age: 20,
  location: 'Nairobi',
};

const student2: Student = {
  firstName: 'Second',
  lastName: 'Student',
  age: 100,
  location: 'Nairobi',
};

const studentsList: Array<Student> = [student1, student2];

function render(students: Array<Student>): void {
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  
  students.forEach((student: Student) => {
    const tr = document.createElement('tr');
    
    const tdFirstName = document.createElement('td');
    tdFirstName.innerText = student.firstName;
    tr.appendChild(tdFirstName);
    
    const tdLocation = document.createElement('td');
    tdLocation.innerText = student.location;
    tr.appendChild(tdLocation);
    
    tbody.appendChild(tr);
  });
  
  table.appendChild(tbody);
  const body = document.querySelector('body');
  if (body) {
    body.appendChild(table);
  }
}

render(studentsList);
