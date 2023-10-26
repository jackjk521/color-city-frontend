export const handleDropdownChange = (e, items, setInventoryData) => {
  const { name, value } = e.target; // gets the item id from the items dropdown

  const item = items.find((item) => item.item_id === value);
  setInventoryData((prevOrder) => ({
    ...prevOrder,
    item_price_w_vat: item.item_price_w_vat,
    [name]: value,
  }));
};

export const calculatePrice = (item_id, quantity, items, setInventoryData) => {
  const item = items.find((item) => item.item_id === item_id);
  if (item) {
    const holding_cost = item.item_price_w_vat * quantity;
    setInventoryData((prevOrder) => ({
      ...prevOrder,
      holding_cost: holding_cost,
    }));
    return holding_cost;
  }
  return 0;
};


