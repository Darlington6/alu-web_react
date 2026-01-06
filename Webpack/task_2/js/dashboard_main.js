require('../css/main.css');

const $ = require("jquery");
const _ = require("lodash");

let count = 0;

function updateCounter() {
  count++;
  $("#count").text(`${count} clicks on the button`);
}

const $button = $("<button>Click here to get started</button>").on(
  "click",
  _.debounce(updateCounter, 500, { leading: true, trailing: false })
);

$('body').append('<div id="logo"></div>');
$('body').append("<p>Holberton Dashboard</p>");
$('body').append("<p>Dashboard data for the students</p>");
$('body').append("<div>");
$('body').append($button);
$('body').append("<span id='count'></span>");
$('body').append("</div>");
$('body').append("<p>Copyright - Holberton School</p>");
