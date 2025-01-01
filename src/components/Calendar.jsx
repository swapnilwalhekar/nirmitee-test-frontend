import React from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { updateAppointment } from "../services/api";

const localizer = momentLocalizer(moment);

function Calendar({ appointments, setAppointments }) {
  const handleEventDrop = ({ event, start, end }) => {
    updateAppointment(event.id, {
      startDateTime: start,
      endDateTime: end,
    }).then(() => {
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === event.id
            ? { ...appt, startDateTime: start, endDateTime: end }
            : appt
        )
      );
    });
  };

  return (
    <div className="m-4">
      <BigCalendar
        localizer={localizer}
        events={appointments.map((appt) => ({
          id: appt.id,
          title: appt.title,
          start: new Date(appt.startDateTime),
          end: new Date(appt.endDateTime),
        }))}
        defaultView="week"
        draggableAccessor={() => true}
        onEventDrop={handleEventDrop}
        style={{ height: 500 }}
      />
    </div>
  );
}

export default Calendar;
