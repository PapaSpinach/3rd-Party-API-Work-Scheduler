const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  displayCurrentDay();

  addTimeClasses();

  $('.saveBtn').click(handleSaveButtonClick);

  displayEvents();
});

// Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour.
function addTimeClasses() {
  const now = dayjs();

  for (let i = 0; i < hours.length; i++) {
    const hour = hours[i];

    const element = $('#hour-' + hour);

    const dateWithHour = dayjs().hour(hour);

    if (dateWithHour.isSame(now, 'hour')) {
      element.addClass('present');
    } else if (dateWithHour.isBefore(now)) {
      element.addClass('past');
    } else {
      element.addClass('future');
    }
  }
}

function displayCurrentDay() {
  const now = dayjs();

  const currentDayElement = $('#currentDay');

  currentDayElement.text(now.format('MMMM D, YYYY'));
}

function handleSaveButtonClick(event) {
  const buttonElement = this;

  const row = $(buttonElement).closest('.time-block');

  // Get the user input
  const textArea = row.find('.description');
  const eventDescription = textArea.val();

  // Get the hour
  const rowId = row.attr('id');
  const hour = rowId.replace('hour-', '');

  // Save user input and date and hour to local storage
  saveEventToLocalStorage(hour, eventDescription);
}

function saveEventToLocalStorage(hour, eventDescription) {
  const dateWithHour = dayjs().hour(hour);
  const key = dateWithHour.format('DD/MM/YYYY H');
  localStorage.setItem(key, eventDescription);
}

function displayEvents() {
  // For every hour
  for (let i = 0; i < hours.length; i++) {
    const hour = hours[i];
    // 	Get event for hour from local storage
    const eventDescription = getEventFromLocalStorage(hour);

    // If there is an event for the hour
    if (eventDescription !== null) {
      // Update the corresponding text area with the event description:
      // Get text area element
      const timeBlockId = 'hour-' + hour;
      const timeBlockElement = $('#' + timeBlockId);
      const textArea = timeBlockElement.find('.description');

      // 	Set the 'value' attribute of the text area element to the event description
      textArea.val(eventDescription);
    }
  }
}

function getEventFromLocalStorage(hour) {
  const dateWithHour = dayjs().hour(hour);
  const key = dateWithHour.format('DD/MM/YYYY H');
  const value = localStorage.getItem(key);

  return value;
}
