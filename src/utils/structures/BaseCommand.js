module.exports = class BaseCommand {
  constructor(name, category, aliases, permissions, usage, args, description, rroles) {
    this.name = name;
    this.category = category;
    this.aliases = aliases;
    this.permissions = permissions;
    this.usage = usage;
    this.args = args;
    this.description = description;
    this.rroles = rroles;
  }
}