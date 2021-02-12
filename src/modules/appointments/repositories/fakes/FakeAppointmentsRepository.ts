import { uuid } from 'uuidv4';

import { isEqual } from 'date-fns';

import ICreateAppointmentDTO from '../../dtos/ICreateAppointmentDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../IAppointmentsRepository';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }
}

export default FakeAppointmentsRepository;
