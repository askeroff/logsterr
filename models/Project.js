const mongoose = require('mongoose');
const slug = require('slugs');

mongoose.Promise = global.Promise;

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'You need to give your project a name!',
  },
  slug: String,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'Project should belong to an author',
  },
});

projectSchema.pre('save', async function projectPreSave(next) {
  if (!this.isModified('name')) {
    next();
    return;
  }
  console.log('pre save hook running');
  this.slug = slug(this.name);
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const projectsWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (projectsWithSlug.length) {
    this.slug = `${this.slug}-${projectsWithSlug.length + 1}`;
  }
  next();
});

projectSchema.pre('update', async function projectPreSave(next) {
  if (!this.isModified('name')) {
    next();
    return;
  }
  this.slug = slug(this.name);
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const projectsWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (projectsWithSlug.length) {
    this.slug = `${this.slug}-${projectsWithSlug.length + 1}`;
  }
  this.update({ slug: this.slug });
  next();
});

module.exports = mongoose.model('Project', projectSchema);
