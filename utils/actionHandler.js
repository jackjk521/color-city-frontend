// For general use
// Purchases
export const addPurchaseModal = () => {
  // Handle edit action
  // console.log(`Edit action for item ${id}`);
  setOpen(true);
  setSeverity("warning"); // Use functional form of setState
  setMessage("Warning Updating Data"); // Use functional form of setState

  setTimeout(() => {
    setOpen(false);
    setSeverity("info");
    setMessage("Default message");
  }, 1500);
};

export const addPurchase = () => {
  // Handle edit action
  // console.log(`Edit action for item ${id}`);
  setOpen(true);
  setSeverity("warning"); // Use functional form of setState
  setMessage("Warning Updating Data"); // Use functional form of setState

  setTimeout(() => {
    setOpen(false);
    setSeverity("info");
    setMessage("Default message");
  }, 1500);
};
