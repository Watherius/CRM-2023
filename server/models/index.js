const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.form = require("./form.model.js")(sequelize, Sequelize);
db.field = require("./field.model.js")(sequelize, Sequelize);
db.field_value = require("./field_value.model.js")(sequelize, Sequelize);
db.file = require("./file.model.js")(sequelize, Sequelize);
db.course = require("./course.model.js")(sequelize, Sequelize);
db.course_teacher = require("./course_teacher.model.js")(sequelize, Sequelize);
db.teacher = require("./teacher.model.js")(sequelize, Sequelize);
db.subscriber = require("./subscriber.model.js")(sequelize, Sequelize);
db.application = require("./application.model.js")(sequelize, Sequelize);
db.status = require("./status.model.js")(sequelize, Sequelize);
db.application_status = require("./application_status.model.js")(sequelize, Sequelize);

db.tokenSchema = require("./token.model.js")(sequelize, Sequelize);

//Связть между tokenSchema и User
db.user.hasOne(db.tokenSchema, {
  onDelete: 'CASCADE'
});
db.tokenSchema.belongsTo(db.user);


//Связть между User и Form Many-to-One
db.user.hasMany(db.form, {
  foreignKey: 'user_id',
});
db.form.belongsTo(db.user, {
  foreignKey: 'user_id',
});

//Связть между User и Course Many-to-One
db.user.hasMany(db.course, {
  foreignKey: 'user_id',
});
db.course.belongsTo(db.user, {
  foreignKey: 'user_id',
});

//Связть между Form и Field Many-to-One
db.form.hasMany(db.field, {
  foreignKey: 'form_id',
  onDelete: 'CASCADE',
});
db.field.belongsTo(db.form, {
  foreignKey: 'form_id',
  onDelete: 'CASCADE',
});

//Связть между Field и Field_Value Many-to-One
db.field.hasMany(db.field_value, {
  foreignKey: 'field_id',
});
db.field_value.belongsTo(db.field, {
  foreignKey: 'field_id',
});

//Связть между Application и Field_Value Many-to-One
db.application.hasMany(db.field_value, {
  foreignKey: 'application_id',
});
db.field_value.belongsTo(db.application, {
  foreignKey: 'application_id',
});

//Связть между Field_Value и File Many-to-One
db.field_value.hasMany(db.file, {
  foreignKey: 'field_value_id',
});
db.file.belongsTo(db.field_value, {
  foreignKey: 'field_value_id',
});

//Связть между Course и Form Many-to-One
db.form.hasMany(db.course, {
  foreignKey: 'letter_form_id',
  as: 'letterForms',
});
db.course.belongsTo(db.form, {
  foreignKey: 'letter_form_id',
  as: 'letterForms',
});

db.form.hasMany(db.course, {
  foreignKey: 'application_form_id',
  as: 'applicationForms',
});
db.course.belongsTo(db.form, {
  foreignKey: 'application_form_id',
  as: 'applicationForms',
});

//Связть между User и Course в таблице Subscriber Many-to-One
db.course.belongsToMany(db.user, {
  through: db.subscriber,
  onDelete: 'CASCADE',
  foreignKey: 'course_id',
});

db.user.belongsToMany(db.course, {
  through: db.subscriber,
  onDelete: 'CASCADE',
  foreignKey: 'user_id',
});

//Связть между Course и Teacher в таблице course_teacher Many-to-Many
db.teacher.belongsToMany(db.course, {
  through: db.course_teacher,
  foreignKey: { name: 'teacher_id' },
  onDelete: 'CASCADE',
});

db.course.belongsToMany(db.teacher, {
  through: db.course_teacher,
  foreignKey: { name: 'course_id'},
  onDelete: 'CASCADE',
});

//Связть между Course и Application Many-to-one
db.course.hasMany(db.application, {
  foreignKey: 'course_id',
});
db.application.belongsTo(db.course, {
  foreignKey: 'course_id',
});

//Связть между User и Application Many-to-one
db.user.hasMany(db.application, {
  foreignKey: 'user_id',
});
db.application.belongsTo(db.user, {
  foreignKey: 'user_id',
});

//Связть между Form и Application Many-to-one
/*db.form.hasMany(db.application, {
  foreignKey: 'form_id',
});
db.application.belongsTo(db.form, {
  foreignKey: 'form_id',
});*/

//Связть между Status и application_status Many-to-One
db.status.hasMany(db.application_status, {
  foreignKey: 'status_id',
  onDelete: 'CASCADE',
});
db.application_status.belongsTo(db.status, {
  foreignKey: 'status_id',
});

//Связть между Application и application_status Many-to-One
db.application.hasMany(db.application_status, {
  foreignKey: 'application_id',
  onDelete: 'CASCADE',
});
db.application_status.belongsTo(db.application, {
  foreignKey: 'application_id',
});

module.exports = db;