const User = require("../src/User");

// User tests here
describe("User tests", () => {
  let testUser;
  beforeEach(() => {
    testUser = new User("testuser", "testpass", 18);
  });
  describe("User object", () => {
    it("should be of type object", () => {
      expect(typeof testUser).toBe("object");
    });

    it("should have a username", () => {
      expect(testUser.username).toBeDefined();
      expect(testUser.username).toBe("testuser");
    });

    it("should have a password", () => {
      expect(testUser.password).toBeDefined();
      expect(testUser.password).toBe("testpass");
    });

    it("should have an age", () => {
      expect(testUser.age).toBeDefined();
      expect(testUser.age).toBe(18);
    });
  });
  describe("User methods", () => {
    it("should be able to login with correct password", () => {
      expect(testUser.login("testpass")).toBe(true);
      expect(testUser.loggedIn).toBe(true);
    });

    it("should throw with an incorrect password", () => {
      expect(() => testUser.login("wrongpass")).toThrow("incorrect password");
    });

    it("should be able to logout", () => {
      testUser.loggedIn = true;
      testUser.logout();
      expect(testUser.loggedIn).toBe(false);
    });
  });
});
