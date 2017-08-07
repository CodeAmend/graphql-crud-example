const faker = require('faker');

function getCustomers() {

  var customers = [];

  for(var id = 0; id < 50; id++) {

    var name = faker.name.findName();
    var age = faker.random.number();
    var email = faker.internet.email();


    customers.push({
      id,
      name,
      age,
      email
    });
  }

  return { "customers": customers }
}

module.exports = getCustomers;
