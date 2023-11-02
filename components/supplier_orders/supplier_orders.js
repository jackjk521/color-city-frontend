
// Checkbox table options
export const rowSelectionSetup = (originalRow) => {
    return (
        originalRow.status !== "COMPLETED" &&
        originalRow.original.received_quantity == 0 &&
        originalRow.original.receive_qty == 0 &&
        originalRow.original.req_quantity !=
          originalRow.original.received_quantity
      );
}

export const getRowId = (originalRow) => {
    return originalRow.purchase_line_id
}

// Inline edit table options
export const handleRowSave = (e, setLocalData) => {
    const { values } = e;

    const item_id = values.item;
    const item_price = values.item_price_w_vat;
    const updated_req_quantity = values.req_quantity;
    const newSubtotal = item_price * updated_req_quantity;

    setLocalData((prevState) => ({
      ...prevState,
      purchaseLines: prevState.purchaseLines.map((line) => {
        if (line.item === item_id) {
          console.log(line.item === item_id);
          console.log(updated_req_quantity);
          console.log(newSubtotal);

          return {
            ...line,
            req_quantity: updated_req_quantity,
            subtotal: newSubtotal,
          };
        }
        return line;
      }),
    }));

    e.table.setEditingRow(null);
  };

// Add Order

export const calculateSubtotal = (items, item_id, quantity, setAddItemData) => {
    const item = items.find((item) => item.item_id === item_id);
    if (item) {
      const subtotal = item.item_price_w_vat * quantity;
      setAddItemData((prevOrder) => ({
        ...prevOrder,
        subtotal: subtotal,
      }));
      return subtotal;
    }
    return 0;
  };

  export const calculateTotalAmount = (purchaseData, setPurchaseData) => {
    const total = purchaseData.purchaseLines.reduce(
      (accumulator, item) => accumulator + item.subtotal,
      0
    );
    setPurchaseData((prevState) => ({
      ...prevState,
      purchaseHeader: {
        ...prevState.purchaseHeader,
        total_amount: total,
      },
    }));
    return total;
  };
