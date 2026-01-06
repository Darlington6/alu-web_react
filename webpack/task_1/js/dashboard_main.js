import $ from 'jquery';
import _ from 'lodash';

// Create and append elements
$('body').append('<p>Holberton Dashboard</p>');
$('body').append('<p>Dashboard data for the students</p>');
$('body').append('<button id="startBtn">Click here to get started</button>');
$('body').append('<p id="count"></p>');
$('body').append('<p>Copyright - Holberton School</p>');

// Counter variable
let count = 0;

// Function to update counter
function updateCounter() {
  count++;
  $('#count').text(`${count} clicks on the button`);
}

// Bind debounced function to button click
$('#startBtn').on('click', _.debounce(updateCounter, 500));
