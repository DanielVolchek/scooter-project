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
    console.log("user registered");
    this.registeredUsers[username] = new User(username, password, age);
    return this.registeredUsers[username];
  }

  loginUser(username, password) {
    const user = this.registeredUsers[username];
    try {
      user.login(password);
    } catch (e) {
      throw new Error("Username or password is incorrect");
    }
    return true;
  }

  logoutUser(username) {
    const user = this.registeredUsers[username];
    if (!user || !user.loggedIn) throw new Error("no such user is logged in");
    user.logout();
  }

  createScooter(station_name) {
    const station = this.stations[station_name];
    if (!station) throw new Error("no such station");
    station.push(new Scooter(station));
    return station[station.length - 1];
  }

  dockScooter(scooter, station_name) {
    const station = this.stations[station_name];
    if (!station) throw new Error("no such station");
    if (station.includes(scooter))
      throw new Error("scooter already at station");
    station.push(scooter);
    scooter.dock(station);
  }

  rentScooter(scooter, user) {
    if (scooter.user !== null) throw new Error("scooter already rented");
    const index = this.stations[scooter.station].indexOf(scooter);
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
