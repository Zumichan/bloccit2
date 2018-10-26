module.exports = class ApplicationPolicy {

  constructor(user, record) {
    this.user = user;
    this.record = record;
  }

  //Checks that a record is present and the user owns it
  _isOwner() {
    return this.record && (this.record.userId == this.user.id);
  }
  //Checks that a user is present and the user is an admin
  _isAdmin() {
    return this.user && this.user.role == "admin";
  }
  //Checks that a user is present
  new() {
    return this.user != null;
  }

  create() {
    return this.new();
  }

  show() {
    return true;
  }

  //Checks that the user is allowed to create a new record, a record is present, either the user owns the record or user is an admin
  edit() {
    return this.new() &&
      this.record && (this._isOwner() || this._isAdmin());
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }
}
