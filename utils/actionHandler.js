// For action formatter handlers to reuse

// Material Table Handlers and Sorters

// Table Actions 
export const handleEdit = ({ setOpen, setSeverity, setMessage}) => {
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
