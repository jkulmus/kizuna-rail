import { createConfirmation, getScheduleById, getTicketOptionsForRoute } from '../../models/model.js';

const bookingPage = async (req, res) => {
    const { scheduleId } = req.params;

    const schedule = await getScheduleById(scheduleId);

    const ticketOptions = await getTicketOptionsForRoute(schedule.routeId, scheduleId);

    res.render('routes/book', {
        title: 'Book Trip',
        schedule,
        ticketOptions
    });
};

const processBookingRequest = async (req, res) => {
    const data = req.body;

    if (!data.passengers || !Array.isArray(data.passengers) || data.passengers.length === 0) {
        return res.status(400).send('Error: At least one passenger details form must be filled out');
    }

    const confirmationNum = await createConfirmation(data);

    res.redirect(`/routes/confirmation/${confirmationNum}`);
};

export { bookingPage, processBookingRequest };
