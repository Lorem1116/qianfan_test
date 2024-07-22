import React from 'react';
import Avatar from 'react-avatar';
import './AvatarStyles.css'; // 假设你有一个名为AvatarStyles的CSS文件

const AvatarComponent = ({ name, avatarUrl }) => {
  const avatarStyle = {   
    margin: '5px', 
    width: 'auto', 
    height: 'auto' 
  };  

  return (
    <div className="avatar-container" style={avatarStyle}>
      <Avatar name={name} src={avatarUrl} size={25} />
    </div>
  );
};

export default AvatarComponent;