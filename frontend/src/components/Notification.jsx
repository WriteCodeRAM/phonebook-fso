import React from 'react';

const Notification = ({ message, noti }) => {
  return <div className={noti}>{message}</div>;
};

export default Notification;
