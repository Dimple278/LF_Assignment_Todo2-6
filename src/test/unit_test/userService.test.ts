import expect from "expect";
import sinon from "sinon";
import bcrypt from "bcryptjs";
import * as UserModel from "../../model/userModel";
import NotFoundError from "../../error/notFoundError";
import BadRequestError from "../../error/badRequestError";
import {
  fetchUsers,
  fetchUserById,
  fetchUserByEmail,
  createUser,
  updateUser,
  deleteUser,
} from "../../service/userService";
import { describe } from "mocha";

// test cases for user service
describe("User Service", () => {
  // test cases for fetchUsers
  describe("fetchUsers", () => {
    let userModelStub;

    beforeEach(() => {
      userModelStub = sinon.stub(UserModel, "getAllUsers");
    });

    afterEach(() => {
      userModelStub.restore();
    });

    it("should fetch all users", () => {
      const users = [{ id: 1, name: "John Doe", email: "john@example.com" }];
      userModelStub.returns(users);

      const result = fetchUsers();
      expect(userModelStub.calledOnce).toBe(true);
      expect(result).toStrictEqual(users);
    });
  });

  // test cases for fetchUserById
  describe("fetchUserById", () => {
    let userModelStub;

    beforeEach(() => {
      userModelStub = sinon.stub(UserModel, "getUserById");
    });

    afterEach(() => {
      userModelStub.restore();
    });

    it("should fetch user by ID", () => {
      const user = { id: 1, name: "John Doe", email: "john@example.com" };
      userModelStub.withArgs(1).returns(user);

      const result = fetchUserById(1);
      expect(userModelStub.calledOnce).toBe(true);
      expect(result).toStrictEqual(user);
    });

    it("should return undefined if user not found", () => {
      userModelStub.withArgs(1).returns(undefined);

      const result = fetchUserById(1);
      expect(userModelStub.calledOnce).toBe(true);
      expect(result).toBeUndefined();
    });
  });

  // test cases for fetchUserByEmail
  describe("fetchUserByEmail", () => {
    let userModelStub;

    beforeEach(() => {
      userModelStub = sinon.stub(UserModel, "getUserByEmail");
    });

    afterEach(() => {
      userModelStub.restore();
    });

    it("should fetch user by email", () => {
      const user = { id: 1, name: "John Doe", email: "john@example.com" };
      userModelStub.withArgs("john@example.com").returns(user);

      const result = fetchUserByEmail("john@example.com");
      expect(userModelStub.calledOnce).toBe(true);
      expect(result).toStrictEqual(user);
    });

    it("should return undefined if user not found", () => {
      userModelStub.withArgs("john@example.com").returns(undefined);

      const result = fetchUserByEmail("john@example.com");
      expect(userModelStub.calledOnce).toBe(true);
      expect(result).toBeUndefined();
    });
  });

  // test cases for createUser
  describe("createUser", () => {
    let bcryptStub, userModelStub;

    beforeEach(() => {
      bcryptStub = sinon.stub(bcrypt, "hash");
      userModelStub = sinon.stub(UserModel, "addUser");
    });

    afterEach(() => {
      bcryptStub.restore();
      userModelStub.restore();
    });

    it("should create a user", async () => {
      const user = {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        password: "hashedPassword",
        role: "user",
      };

      bcryptStub.withArgs("password123", 10).resolves("hashedPassword");
      userModelStub.returns(user);

      const result = await createUser(
        "John Doe",
        "john@example.com",
        "password123"
      );

      expect(bcryptStub.calledOnce).toBe(true);
      expect(userModelStub.calledOnce).toBe(true);
      expect(result).toStrictEqual({
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "user",
      });
    });

    it("should throw BadRequestError if email is already in use", async () => {
      sinon
        .stub(UserModel, "getUserByEmail")
        .withArgs("john@example.com")
        .returns({
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          password: "hashedPassword",
          role: "user",
        });

      await expect(
        createUser("John Doe", "john@example.com", "password123")
      ).rejects.toThrow(new BadRequestError("Email already in use"));
    });
  });

  // test cases for updateUser
  describe("updateUser", () => {
    let userModelStub;

    beforeEach(() => {
      userModelStub = sinon.stub(UserModel, "updateUser");
    });

    afterEach(() => {
      userModelStub.restore();
    });

    it("should update a user", async () => {
      const user = { id: 1, name: "John Doe", email: "john@example.com" };
      userModelStub.withArgs(1, { name: "Jane Doe" }).returns({
        ...user,
        name: "Jane Doe",
      });

      const result = await updateUser(1, { name: "Jane Doe" });

      expect(userModelStub.calledOnce).toBe(true);
      expect(result).toStrictEqual({
        id: 1,
        name: "Jane Doe",
        email: "john@example.com",
      });
    });

    it("should throw NotFoundError if user not found", async () => {
      userModelStub.withArgs(1, { name: "Jane Doe" }).returns(null);

      await expect(updateUser(1, { name: "Jane Doe" })).rejects.toThrow(
        new NotFoundError(`User with ID 1 not found`)
      );
    });
  });

  // test cases for deleteUser
  describe("deleteUser", () => {
    let userModelStub;

    beforeEach(() => {
      userModelStub = sinon.stub(UserModel, "deleteUser");
    });

    afterEach(() => {
      userModelStub.restore();
    });

    it("should delete a user", () => {
      const user = { id: 1, name: "John Doe", email: "john@example.com" };
      userModelStub.withArgs(1).returns(user);

      const result = deleteUser(1);

      expect(userModelStub.calledOnce).toBe(true);
      expect(result).toStrictEqual(user);
    });

    it("should throw NotFoundError if user not found", () => {
      userModelStub.withArgs(1).returns(null);

      expect(() => deleteUser(1)).toThrow(
        new NotFoundError(`User with ID 1 not found`)
      );
    });
  });
});
