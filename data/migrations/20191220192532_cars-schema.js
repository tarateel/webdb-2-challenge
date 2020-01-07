exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments('id');
    tbl.string('VIN')
      .notNullable()
      .unique();
    tbl.string('Make')
      .notNullable();
    tbl.string('Model')
      .notNullable();
    tbl.string('Mileage')
      .notNullable();
      tbl.string('Transmission');
      tbl.string('Title');
  })
};

exports.down = function(knex) {
  return knex.schema.droptTableIfExists('cars');
};
