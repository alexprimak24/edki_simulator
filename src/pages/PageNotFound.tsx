import React from 'react';
import { useMoveBack } from '../hooks/useMoveBack';

function PageNotFound() {
  const moveBack = useMoveBack();
  return (
    <div>
      This Page is not found
      <button onClick={moveBack}>Go back</button>
    </div>
  );
}

export default PageNotFound;
