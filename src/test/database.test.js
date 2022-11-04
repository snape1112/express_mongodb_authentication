const { UserRepository } = require('../repositories/userRepository');

describe('insert', () => {
  beforeAll(async () => {
    await UserRepository.deleteOne({ id: 'some-user-id' });
  });

  afterAll(async () => {
    await UserRepository.deleteOne({ id: 'some-user-id' });
  });

  it('should insert a doc into collection', async () => {
    const mockUserId = { id: 'some-user-id' };
    await UserRepository.insertOne(mockUserId);

    const findOneWillReturnDocument = await UserRepository.findOne({ id: 'some-user-id' });
    expect(findOneWillReturnDocument.id).toEqual(findOneWillReturnDocument.id);
  });
});

describe(`you shouldn't find a user`, () => {
  it('failed to find user', async () => {
    const query = { id: 'some-user-id' };
    const clientNotExistInDatabase = await UserRepository.findOne(query);
    expect(clientNotExistInDatabase).toBeFalsy();
  });
});

describe(`get all database`, () => {
  let userCount = 0;
  beforeEach(async () => {
    const users = await UserRepository.find();
    await UserRepository.deleteOne({ id: 'some-user-id' }).then(({ deletedCount }) => {
      userCount = users.length - (deletedCount || 0);
    });
  });

  it('should find all the documents', async () => {
    const findWillReturnAllDocuments = await UserRepository.find();
    expect(findWillReturnAllDocuments.length).toEqual(userCount);
  });
});

describe(`should update one document`, () => {
  beforeAll(async () => {
    const mockUserId = { id: 'some-user-id' };
    await UserRepository.insertOne(mockUserId);
  });

  afterAll(async () => {
    await UserRepository.deleteOne({ id: 'some-user-id-updated' });
  });

  it('should find and update one document', async () => {
    const query = { id: 'some-user-id' };
    const userToUpdate = await UserRepository.findOne(query);
    const updateClientDocument = { $set: { id: 'some-user-id-updated' } };
    await UserRepository.updateOne(userToUpdate, updateClientDocument);
    const findOneWillReturnDocument = await UserRepository.findOne({ id: 'some-user-id-updated' });
    expect(findOneWillReturnDocument.id).toEqual(findOneWillReturnDocument.id);
  });
});
