// Add Data
export const createAddLogData = (
  branch,
  branch_name,
  user,
  username,
  type,
  name, 
  to_branch = null
) => {

  if (type == "SUPP_ORDER") {
    return {
      branch: branch,
      user: user,
      type: type,
      type_id: 0,
      message: `${username} from ${branch_name} successfully added a ${type} `,
    };
  } else if (type == "INVENTORY") {
    return {
      branch: branch,
      user: user,
      type: type,
      type_id: 0,
      message: `${username} from ${branch_name} have successfully updated ${name} in ${to_branch}'s inventory`,
    };
  }

  // Default logger
  return {
    branch: branch,
    user: user,
    type: type,
    type_id: 0,
    message: `${username} successfully added ${name}`,
  };
};

// Edit Data
export const createEditLogData = (
  branch,
  branch_name,
  user,
  username,
  type,
  id,
  name, 
  to_branch = null
) => {
  if (type == "SUPP_ORDER") {
    return {
      branch: branch,
      user: user,
      type: type,
      type_id: id,
      message: `${username} from ${branch_name} successfully updated a ${type} with id: ${id}`,
    };
  } else if (type == "RECEIVE_ORDER") {
    return {
      branch: branch,
      user: user,
      type: type,
      type_id: id,
      message: `${username} from ${branch_name} have received item/s from purchase order with id of ${id}`,
    };
  }
  else if (type == "INVENTORY") {
    return {
      branch: branch,
      user: user,
      type: type,
      type_id: id,
      message: `${username} from ${branch_name} have successfully updated ${name} in ${to_branch}'s inventory`,
    };
  }

  return {
    branch: branch,
    user: user,
    type: type,
    type_id: id,
    message: `${username} successfully updated ${name} with id: ${id}`,
  };
};

// Remove Data
export const createRemoveLogData = (
  branch,
  branch_name,
  user,
  username,
  type,
  id,
  name,
  to_branch = null
) => {
  if (type == "SUPP_ORDER") {
    return {
      branch: branch,
      user: user,
      type: type,
      type_id: id,
      message: `${username} from ${branch_name} successfully removed a ${type} with id: ${id}`,
    };
  } else if (type == "INVENTORY") {
    return {
      branch: branch,
      user: user,
      type: type,
      type_id: id,
      message: `${username} from ${branch_name} have successfully removed ${name} in ${to_branch}'s inventory`,
    };
  }

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
