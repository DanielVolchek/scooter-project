const Scooter = require("../src/Scooter");
const User = require("../src/User");
const ScooterApp = require("../src/ScooterApp");

// ScooterApp tests here
describe("ScooterApp Object tests", () => {
  const app = new ScooterApp();

  it("should have a stations property", () => {
    expect(app.stations).toBeDefined();
  });
  it("should have three hard-coded stations (NYC, London, Tokyo)", () => {
    expect(Object.keys(app.stations).length).toBe(3);
    expect(app.stations["New York"]).toBeDefined();
    expect(app.stations["London"]).toBeDefined();
    expect(app.stations["Tokyo"]).toBeDefined();
  });

  // each station should contain an array of scooters
  it("should have an array of scooters for each station", () => {});

  it("should have a registeredUsers property", () => {
    expect(app.registeredUsers).toBeDefined();
  });
});

describe("ScooterApp Method tests", () => {
  // register user
  let app;
  let dummyUser;
  beforeEach(() => {
    app = new ScooterApp();
    dummyUser = new User("test", "test", 18);
    app.registerUser(dummyUser.username, dummyUser.password, dummyUser.age);
  });
  it("should be able to register a user", () => {
    const user1 = new User("test1", "test1", 18);
    app.registerUser(user1.username, user1.password, user1.age);
    expect(app.registeredUsers[user1.username]).toBeDefined();
  });

  it("should throw an error if user is under 18", () => {
    const user2 = new User("test2", "test2", 17);
    expect(() =>
      app.registerUser(user2.username, user2.password, user2.age)
    ).toThrow("too young to register");
  });

  it("should throw an error if user is already registered", () => {
    const user1 = new User("test2", "test2", 17);
    expect(() =>
      app.registerUser(user1.username, user1.password, user1.age)
    ).toThrow("already registered");
  });

  it("should be able to login a user", () => {
    expect(app.loginUser(dummyUser.username, dummyUser.password)).toBe(true);
    expect(app.registeredUsers[dummyUser.username].loggedIn).toBe(true);
  });

  it("should throw an error if username is not registered", () => {
    expect(() => app.loginUser("notrealuser", "pass")).toThrow(
      "Username or password is incorrect"
    );
  });

  it("should throw an error if password is incorrect", () => {
    expect(() => app.loginUser(dummUser.username, "wrongpassword")).toThrow(
      "Username or password is incorrect"
    );
  });

  it("should be able to logout a user", () => {
    app.logoutUser(dummyUser.username);
    expect(app.registeredUsers[dummyUser.username].loggedIn).toBe(false);
  });

  it("should throw an error if user is not registered or logged in", () => {
    expect(() => app.logoutUser("nosuchuser")).toThrow(
      "no such user is logged in"
    );
  });

  it("should be able to create a scooter", () => {
    expect(() => app.createScooter("New York")).not.toThrow();
    expect(app.stations["New York"].length).toBe(4);
  });

  it("should throw an error if station does not exist", () => {
    expect(() => app.createScooter("no such station")).toThrow(
      "no such station exists"
    );
  });

  it("should be able to dock a scooter", () => {
    expect(() =>
      app.dockScooter(createScooter("London"), "New York")
    ).not.toThrow();
  });

  it("should throw an error if station does not exist", () => {
    expect(() => app.dockScooter("no such station")).toThrow("no such station");
  });

  it("should throw an error if scooter is already docked", () => {
    expect(() =>
      app.dockScooter(createScooter("New York"), "New York")
    ).toThrow("scooter already at station");
  });

  it("should be able to rent a scooter", () => {
    expect(() =>
      app.rentScooter(app.stations["New York"][0], dummyUser)
    ).not.toThrow();
  });

  it("should throw an error if scooter is already rented", () => {
    const dummy2 = app.registerUser("dummy2", "dummy2", 18);
    app.rentScooter(app.stations["New York"][0], dummyUser);
    expect(() => app.rentScooter(app.stations["New York"][0], dummy2)).toThrow(
      "scooter already rented"
    );
  });
});
