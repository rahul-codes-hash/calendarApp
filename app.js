import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  getDay,
  getMonth,
  getYear
} from "https://cdn.skypack.dev/date-fns";

const monthYear = document.getElementById('monthYear');

const activeDate = new Date();
let currentView = "monthView"

console.log(activeDate);

const startDayOfMonth = (today) => {
  return startOfMonth(today);
};

const endDayOfMonth = (today) => {
  return endOfMonth(today);
};

const render = (view) => {
  const calendarGrid = document.getElementById("calendarGrid");
  calendarGrid.innerHTML = "";

  if (view == "monthView") {
    const startDate = startDayOfMonth(activeDate);
    const endDate = endDayOfMonth(activeDate);
    monthYear.textContent = `${format(activeDate, "LLLL")} ${format(activeDate, "yyyy")}` ;

    // Step 1: Add empty divs before the first day of the month
    const firstWeekday = startDate.getDay(); // 0 = Sunday, 6 = Saturday
    for (let i = 0; i < firstWeekday; i++) {
      calendarGrid.appendChild(document.createElement("div"));
    }

    // Step 2: Loop from startDate to endDate and insert day cells
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const day = currentDate.getDate();
      const cell = document.createElement("div");

      // Check if it's today
      const isToday =
        currentDate.getDate() === activeDate.getDate() &&
        currentDate.getMonth() === activeDate.getMonth() &&
        currentDate.getFullYear() === activeDate.getFullYear();

      // Check if it's weekend
      const isWeekend =
        currentDate.getDay() === 0 || currentDate.getDay() === 6;

      // Set cell content and classes
      cell.textContent = day;
      cell.className =
        "h-12 w-12 flex items-center justify-center rounded border " +
        (isToday ? "bg-blue-500 text-white font-bold " : "bg-gray-50 ") +
        (isWeekend ? "text-red-500" : "text-gray-800");

      calendarGrid.appendChild(cell);

      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  if (view == "weekView") {
    const startWeekDate = startOfWeek(activeDate);
    const endWeekDate = endOfWeek(activeDate);
    monthYear.textContent = `${format(activeDate, "LLLL")} ${format(activeDate, "yyyy")}` ;


    for (let i = 0; i < startWeekDate.getDay(); i++) {
      calendarGrid.appendChild(document.createElement("div"));
    }

    let currentDate = new Date(startWeekDate);
    while (currentDate <= endWeekDate) {
      const date = currentDate.getDate();
      const weekDiv = document.createElement("div");

      const isToday =
        currentDate.getDate() == activeDate.getDate() &&
        currentDate.getMonth() == activeDate.getMonth() &&
        currentDate.getYear() == activeDate.getYear();

      const isWeekend = currentDate.getDay() == 0 || currentDate.getDay() == 6;

      weekDiv.textContent = date;
      weekDiv.className = `h-12 w-12 flex items-center justify-center rounded border 
              ${isToday ? "bg-blue-500 text-white font-bold" : "bg-gray-50"}
              ${isWeekend ? "text-red-500" : "text-gray-800"}`;

      calendarGrid.appendChild(weekDiv);

      currentDate.setDate(currentDate.getDate() + 1);
    }
  }
};

const previous = () => {
      if(currentView == "monthView"){
        activeDate.setMonth(activeDate.getMonth() - 1);
      }else {
        activeDate.setDate(activeDate.getDate() - 7);
      }

      render(currentView);
}

const next = () => {
  if(currentView == "monthView"){
    activeDate.setMonth(activeDate.getMonth() + 1);
  }else {
    activeDate.setDate(activeDate.getDate() + 7);
  }

  render(currentView);
}

render(currentView);


document.getElementById('prev').addEventListener('click', () => {previous()});

document.getElementById('next').addEventListener('click', () => {next()})


document.getElementById("monthView").addEventListener("click", () => {
  currentView = "monthView"
  render(currentView);
});
document.getElementById("weekView").addEventListener("click", () => {
  currentView = "weekView"
  render(currentView);
});
