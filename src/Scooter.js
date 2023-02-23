class Scooter {
  static nextSerial = 0;

  constructor(station) {
    this.station = station;
    this.user = null;
    this.serial = this.nextSerial++;
    this.charge = 100;
    this.isBroken = false;
  }

  rent(user) {
    if (this.charge <= 20) throw new Error("scooter needs to charge.");
    if (this.isBroken) throw new Error("scooter needs repair.");
    this.user = user;
  }

  dock(station) {
    this.station = station;
    this.user = null;
  }

  requestRepair() {
    // repair in 5 seconds
    const repairTimeInMS = 5 * 1000;
    // after 5 seconds, set isBroken to false
    setTimeout(() => {
      this.isBroken = false;
      console.log("repair completed");
    }, repairTimeInMS);
  }

  recharge() {
    const rechargeIntervalInMS = 1000;
    const interval = setInterval(() => {
      this.charge = Math.min(100, this.charge + 10);
      console.log(`Scooter is charging. Current charge: ${this.charge}`);
      if (this.charge === 100) {
        clearInterval(interval);
        console.log("Scooter is fully charged.");
      }
    }, rechargeIntervalInMS);
  }
}

module.exports = Scooter;
