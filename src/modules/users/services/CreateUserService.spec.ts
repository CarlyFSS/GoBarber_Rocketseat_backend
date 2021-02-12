import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreatepUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreatepUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'carlos',
      email: 'carlos@email.com',
      password: '1234',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email as another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreatepUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'carlos',
      email: 'carlos@email.com',
      password: '1234',
    });

    await expect(
      createUserService.execute({
        name: 'carlos',
        email: 'carlos@email.com',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
