import React from 'react';
import { Button } from 'rsuite';



export const ViewBtn = ({handleView}) => {

  return (
    <Button color="blue" appearance="subtle" onClick={handleView}>
      View
    </Button>
  );
};

export const EditBtn = ({handleEdit}) => {

    return (
      <Button color="yellow" appearance="subtle" onClick={handleEdit}>
        Edit
      </Button>
    );
  };

  export const RemoveBtn = ({handleRemove}) => {

  return (
    <Button color="red" appearance="subtle" onClick={handleRemove}>
      Remove
    </Button>
  );
};