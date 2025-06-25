import { format, 
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    getDay } from 'https://cdn.skypack.dev/date-fns';

 
    const today = new Date();

    console.log(today)

        const startDayOfMonth = (today) => {
             return  startOfMonth(today)
        }

        const endDayOfMonth = (today) => {
            return  endOfMonth(today)
        }

 

        const render = (view) => {
            if(view == "monthView"){

          
                const calendarGrid = document.getElementById("calendarGrid");

                const today = new Date();
                const startDate = startDayOfMonth(today);
                const endDate = endDayOfMonth(today);
                
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
                    currentDate.getDate() === today.getDate() &&
                    currentDate.getMonth() === today.getMonth() &&
                    currentDate.getFullYear() === today.getFullYear();
                
                  // Check if it's weekend
                  const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
                
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
        }
        document.getElementById('monthView').addEventListener('click', () => { render("monthView")});
        document.getElementById('weekView').addEventListener('click', () => {render("weekView")});



