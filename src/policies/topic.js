const ApplicationPolicy = require("./application");

module.exports = class TopicPolicy extends ApplicationPolicy {

  //We obly want admin users to create new topics
  new() {
    return this._isAdmin();
  }

  create() {
    return this.new();
  }

  //Only admin users to create new topics
  edit() {
    return this._isAdmin();
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }
}
