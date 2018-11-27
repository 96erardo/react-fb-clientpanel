import React from 'react';
import loading from './loading.gif';

export default () => {
  return (
    <div className="text-center">
      <img
        src={loading}
        alt="Loading..."
        style={{ width: '200px', margin: 'auto'}}
      />
    </div>
  )
}
