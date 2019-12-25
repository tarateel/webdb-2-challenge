exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {VIN: '1C3CCBBB1DN706759', Make: 'Porsche', Model: 'Cayenne', Mileage: '35102', Transmission: 'auto', Title: 'clean'},
        {VIN: '3GNEC13T43G199568', Make: 'Ford', Model: 'Ranger', Mileage: '12965', Transmission: 'auto', Title: 'clean'},
        {VIN: 'JN8DR09Y24W932739', Make: 'Honda', Model: 'Odyssey', Mileage: '34247', Transmission: 'auto', Title: 'clean'}
      ]);
    });
};

