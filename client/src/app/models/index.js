import {Model, attr, fk } from "redux-orm";

export class User extends Model{}

User.modelName = "User";
User.fields = {
  id : attr(),
  logon_id: attr(),
  fst_nam: attr(),
  lst_name: attr(),
  email_adr: attr(),
  cell_phone: attr(),
  role: attr(),
  acct_lock: attr(),
  photo: attr()
};

export class Session extends Model{
  static parse(sessionData) {
        return this.create(sessionData);
    }
}

Session.modelName = "Session";
Session.fields = {
  id : attr(),
  people_id: fk("User"),
  name: attr(),
  description: attr(),
  cost: attr(),
  conn_info: attr(),
  min_attendees: attr(),
  max_attendees: attr(),
  confirmed: attr()
};
