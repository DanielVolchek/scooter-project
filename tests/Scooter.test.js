const Scooter = require("../src/Scooter");
const User = require("../src/User");

//typeof scooter === object
describe("scooter object", () => {
  let scooter;
  beforeEach(() => {
    scooter = new Scooter("station");
  });
  it("should be of type object", () => {
    // edit this to be a real test!
    expect(typeof scooter).toBe("object");
  });

  it('should be assigned to station "station"', () => {
    expect(scooter.station).toBe("station");
  });

  it("should have a charge of 100%", () => {
    expect(scooter.charge).toBe(100);
  });

  let prevSerial;
  it("should have a serial number", () => {
    expect(scooter.serial).not.toBeUndefined();
    prevSerial = scooter.serial;
  });

  it("should increment serial number", () => {
    // this works because in every test we create a new scooter in the beforeEach function
    expect(scooter.serial).toBe(prevSerial + 1);
  });

  it("should not be broken", () => {
    expect(scooter.isBroken).toBe(false);
  });

  it("should not have a user", () => {
    expect(scooter.user).toBeNull();
  });
});

//Method tests
describe("scooter methods", () => {
  // tests here!
  let scooter;
  let dummyUser;
  beforeEach(() => {
    scooter = new Scooter("station");
    dummyUser = new User("test", "test", 18);
  });

  //rent method
  it("should rent a scooter if in good standings", () => {
    // if rent doesn't throw then it should return undefined
    expect(scooter.rent(dummyUser)).toBeUndefined();
    expect(scooter.user).toBe(dummyUser);
  });

  it("should throw an error if scooter has less than 20% charge", () => {
    scooter.charge = 19;
    expect(() => scooter.rent(dummyUser)).toThrow("scooter needs to charge.");
  });
  it("should throw an error if scooter is broken", () => {
    scooter.isBroken = true;
    expect(() => scooter.rent(dummyUser)).toThrow("scooter needs repair.");
  });
  //dock method
  it("should dock a scooter at a station", () => {
    scooter.dock("station2");
    expect(scooter.station).toBe("station2");
    expect(scooter.user).toBeNull();
  });
  //requestRepair method
  // use jest fake timers to emulate 5 second repair and check that isBroken is set to true after 5 seconds
  it("should request a repair for a scooter", () => {
    jest.useFakeTimers();
    scooter.isBroken = true;
    scooter.requestRepair();
    jest.runAllTimers();
    expect(scooter.isBroken).toBe(false);
    jest.useRealTimers();
  });

  //charge method
  // use jest fake timers to recharge scooter
  it("should recharge the scooter and log status messages", () => {
    jest.useFakeTimers();
    scooter.recharge();

    scooter.charge = 50;
    jest.advanceTimersByTime(1000);
    expect(scooter.charge).toBe(60);
    // Advance the timers by another 4 seconds, which should fully charge the scooter
    jest.advanceTimersByTime(4000);
    expect(scooter.charge).toBe(100);
    // Reset the mock timers
    jest.useRealTimers();
  });
});
