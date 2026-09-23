import userModel from "../models/user.js";

function getUsers(name, job) {
  if (name && job) {
    return findUserByNameAndJob(name, job);
  }

  if (name) {
    return findUserByName(name);
  }

  if (job) {
    return findUserByJob(job);
  }

  return userModel.find();
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  return userToAdd.save();
}

function findUserByName(name) {
  return userModel.find({ name });
}

function findUserByJob(job) {
  return userModel.find({ job });
}

function findUserByNameAndJob(name, job) {
  return userModel.find({ name, job });
}

function deleteUser(id) {
  return userModel.findByIdAndDelete(id);
}

export default {
  addUser,
  deleteUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  findUserByNameAndJob,
};
