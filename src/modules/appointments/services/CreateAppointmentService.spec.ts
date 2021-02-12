import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreatepAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreatepAppointmentService(
      fakeAppointmentRepository,
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '2654654321',
    });

    expect(appointment).toHaveProperty('id');

    expect(appointment.provider_id).toBe('2654654321');
  });

  it('should not be able to create two appointments in the same date', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreatepAppointmentService(
      fakeAppointmentRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '2654654321',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '2654654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
