import React, { useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { updateAppointment, deleteAppointment } from "../services/api";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { toast } from "react-toastify";
import "./modalStyles.css";

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

function Calendar({ appointments, setAppointments }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");

  const handleEventDrop = ({ event, start, end }) => {
    updateAppointment(event.id, {
      startDateTime: start.toISOString(),
      endDateTime: end.toISOString(),
    })
      .then(() => {
        setAppointments((prev) =>
          prev.map((appt) =>
            appt.id === event.id
              ? { ...appt, startDateTime: start, endDateTime: end }
              : appt
          )
        );
        toast.success("Appointment updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating appointment:", error);
        // Show error toast on failure
        toast.error("Error updating appointment. Please try again.");
      });
  };

  const handleOpenModal = (event) => {
    setSelectedAppointment(event);
    setUpdatedTitle(event.title);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleUpdateAppointment = () => {
    if (selectedAppointment && updatedTitle) {
      updateAppointment(selectedAppointment.id, {
        title: updatedTitle,
      })
        .then(() => {
          setAppointments((prev) =>
            prev.map((appt) =>
              appt.id === selectedAppointment.id
                ? { ...appt, title: updatedTitle }
                : appt
            )
          );
          handleCloseModal();
          // Show success toast on update
          toast.success("Appointment updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating appointment:", error);
          // Show error toast on failure
          toast.error("Error updating appointment. Please try again.");
        });
    }
  };

  const handleDeleteAppointment = () => {
    if (selectedAppointment) {
      deleteAppointment(selectedAppointment.id)
        .then(() => {
          setAppointments((prev) =>
            prev.filter((appt) => appt.id !== selectedAppointment.id)
          );
          handleCloseModal();
          // Show success toast on delete
          toast.success("Appointment deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting appointment:", error);
          // Show error toast on failure
          toast.error("Error deleting appointment. Please try again.");
        });
    }
  };

  const events = appointments.map((appt) => ({
    id: appt.id,
    title: appt.title,
    start: new Date(appt.startDateTime),
    end: new Date(appt.endDateTime),
  }));

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="m-4">
        <DragAndDropCalendar
          localizer={localizer}
          events={events}
          defaultView="week"
          style={{ height: 500 }}
          draggableAccessor={() => true}
          onEventDrop={handleEventDrop}
          onSelectEvent={handleOpenModal}
        />
      </div>

      {/* Modal for Update/Delete Appointment */}
      {selectedAppointment && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          contentLabel="Update or Delete Appointment"
        >
          <h2>Update or Delete Appointment</h2>
          <div>
            <label>
              Title:
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                placeholder="Enter new title"
              />
            </label>
          </div>
          <div className="mt-4">
            <button
              onClick={handleUpdateAppointment}
              className="btn btn-primary"
            >
              Update Appointment
            </button>
            <button
              onClick={handleDeleteAppointment}
              className="btn btn-danger ml-2"
            >
              Delete Appointment
            </button>
          </div>
          <div className="mt-2">
            <button onClick={handleCloseModal} className="btn btn-secondary">
              Close
            </button>
          </div>
        </Modal>
      )}
    </DndProvider>
  );
}

export default Calendar;
