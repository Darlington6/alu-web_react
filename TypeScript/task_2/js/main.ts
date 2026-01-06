// Create the DirectorInterface interface with the 3 expected methods:
interface DirectorInterface {
  workFromHome: () => string;
  getCoffeeBreak: () => string;
  workDirectorTasks: () => string;
}

// Create the TeacherInterface interface with the 3 expected methods:
interface TeacherInterface {
  workFromHome: () => string;
  getCoffeeBreak: () => string;
  workTeacherTasks: () => string;
}

// Create a class Director that will implement DirectorInterface
class Director implements DirectorInterface {
  workFromHome = () => 'Working from home';
  getCoffeeBreak = () => 'Getting a coffee break';
  workDirectorTasks = () => 'Getting to director tasks';
}

// Create a class Teacher that will implement TeacherInterface
class Teacher implements TeacherInterface {
  workFromHome = () => 'Cannot work from home';
  getCoffeeBreak = () => 'Cannot have a break';
  workTeacherTasks = () => 'Getting to work';
}

// Create a function createEmployee
function createEmployee(salary: number | string): Teacher | Director {
  const salaryNum = typeof salary === 'number' 
    ? salary 
    : parseFloat(salary.replace(/[^0-9.]/g, ''));
  
  return salaryNum < 500 ? new Teacher() : new Director();
}

// Solution for task 6:
function isDirector(employee: Director | Teacher): employee is Director {
  return (employee as Director).workDirectorTasks !== undefined;
}

function executeWork(employee: Director | Teacher): string {
  return isDirector(employee)
    ? employee.workDirectorTasks()
    : employee.workTeacherTasks();
}

// Solution for task 7:
type Subjects = "Math" | "History";

function teachClass(todayClass: Subjects): string {
  return `Teaching ${todayClass}`;
}

// Examples:

// task 5:
console.log(createEmployee(200));
console.log(createEmployee(1000));
console.log(createEmployee('$500'));

// task 6:
console.log(executeWork(createEmployee(200)));
console.log(executeWork(createEmployee(1000)));

// task 7:
console.log(teachClass('Math'));
console.log(teachClass('History'));
