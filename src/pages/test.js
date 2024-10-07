class Employees {
  constructor(name, position, salary, workhours) {
    this.name = name;
    this.position = position;
    this.salary = salary;
    this.workhours = workhours;
  }

  work = () => {
    console.log(`${this.name} is working`);
  };

  getSalary = () => {
    console.log(`${this.name} salary is $${this.salary}`);
  };

  calculateBonuses = (percentage) => {
    console.log(`${this.name} bonuses ${percentage}% is $${this.salary * (percentage / 100)}`);
  };
}

class Staff extends Employees {
  constructor(name) {
    super(name, "Staff", 30_000, 40);
  }

  handleCustomer = () => {
    console.log(`${this.name} || Staff member is handling customer queries`);
  };
}

class Manager extends Employees {
  constructor(name) {
    super(name, "Manager", 60_000, 45);
  }

  conductMeetings = () => {
    console.log(`${this.name} || Manager is conducting a meeting.`);
  };
}

class CEO extends Employees {
  constructor(name) {
    super(name, "CEO", 150_000, 60);
  }

  makeDecisions = () => {
    console.log(`${this.name} || CEO is making company decisions.`);
  };
}

const staff1 = new Staff("Muhammad");
const manager1 = new Manager("Miftakul");
const ceo1 = new CEO("Salam");

staff1.work();
console.log(staff1.position+" | "+staff1.workhours);
staff1.getSalary();
staff1.calculateBonuses(10);
staff1.handleCustomer();
console.log("=====================================");
manager1.work();
console.log(manager1.position+" | "+manager1.workhours);
manager1.getSalary();
manager1.calculateBonuses(10);
manager1.conductMeetings();
console.log("=====================================");
ceo1.work();
console.log(ceo1.position+" | "+staff1.workhours);
ceo1.getSalary();
ceo1.calculateBonuses(10);
ceo1.makeDecisions();
