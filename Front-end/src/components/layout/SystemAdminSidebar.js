import React from 'react';
import SlidebarAdmin from '../../layout/js/slidebarAdmin';

export default function SystemAdminSidebar({ activeMenu, setActiveMenu, onExitToMain }) {
  return (
    <SlidebarAdmin 
      activeMenu={activeMenu} 
      setActiveMenu={setActiveMenu} 
      onExitToMain={onExitToMain} 
    />
  );
}
