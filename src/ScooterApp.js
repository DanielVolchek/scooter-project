const User = require("./User");
const Scooter = require("./Scooter");

class ScooterApp {
  // ScooterApp code here
  constructor() {
    const stations = {};

    stations["New York"] = [
      new Scooter("New York"),
      new Scooter("New York"),
      new Scooter("New York"),
    ];
    stations["London"] = [
      new Scooter("London"),
      new Scooter("London"),
      new Scooter("London"),
    ];

    stations["Tokyo"] = [
      new Scooter("Tokyo"),
      new Scooter("Tokyo"),
      new Scooter("Tokyo"),
    ];

    this.stations = stations;
    this.registeredUsers = {};
  }

  registerUser(username, password, age) {
    if (age < 18) throw new Error("too young to register");
    if (this.registeredUsers[username]) throw new Error("already registered");

    this.registeredUsers[username] = new User(username, password, age);
  }

  loginUser(username, password) {
    const user = this.registeredUsers[username];
    if (!user || !user.login(password))
      throw new Error("Username or password is incorrect");
  }

  logoutUser(username) {
    const user = this.registeredUsers[username];
    if (!user) throw new Error("no such user is logged in");
    user.logout();
  }

  createScooter(station) {
    const station = this.stations[station];
    if (!station) throw new Error("no such station");
    this.stations[station].push(new Scooter(station));
  }

  dockScooter(scooter, station) {
    const station = this.stations[station];
    if (!station) throw new Error("no such station");
    if (station.includes(scooter))
      throw new Error("scooter already at station");
    station.push(scooter);
    scooter.dock(station);
  }

  rentScooter(scooter, user) {
    if (scooter.user !== null) throw new Error("scooter already rented");
    this.stations[scooter.station].splice(index, 1);
    scooter.rent(user);
    console.log("scooter is rented");
  }

  print() {
    console.log("Users: ");
    console.log(this.registeredUsers);
    console.log("Stations: ");
    Object.entries(this.stations).forEach(([name, station]) => {
      console.log(`${name}: ${station.length} scooters`);
    });
  }
}

module.exports = ScooterApp;
