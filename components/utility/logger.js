// Add Data
export const createAddLogData = (branch, user, username, type, name) => {
  return {
    branch: branch,
    user: user,
    type: type,
    type_id: 0,
    message: `${username} successfully added ${name}`,
  };
};

// Edit Data
export const createEditLogData = (branch, user, username, type, id, name) => {
  return {
    branch: branch,
    user: user,
    type: type,
    type_id: id,
    message: `${username} successfully updated ${name} with id: ${id}`,
  };
};

// Remove Data
export const createRemoveLogData = (branch, user, username, type, id, name) => {
  return {
    branch: branch,
    user: user,
    type: type,
    type_id: id,
    message: `${username} successfully removed ${name} with id: ${id}`,
  };
};

// Approved or declined
// Received
// Logged in or sign out?
