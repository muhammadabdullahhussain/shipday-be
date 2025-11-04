import React from 'react';
import { FiPlus, FiEdit, FiTrash2, FiEye, FiDownload, FiFilter, FiRefreshCw } from 'react-icons/fi';

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  icon, 
  children, 
  loading = false,
  disabled = false,
  onClick,
  ...props 
}) => {
  const baseClass = 'btn d-flex align-items-center gap-2';
  const variantClass = `btn-${variant}`;
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
  
  const iconMap = {
    plus: FiPlus,
    edit: FiEdit,
    delete: FiTrash2,
    view: FiEye,
    download: FiDownload,
    filter: FiFilter,
    refresh: FiRefreshCw
  };
  
  const IconComponent = iconMap[icon];
  
  return (
    <button 
      className={`${baseClass} ${variantClass} ${sizeClass}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="spinner-border spinner-border-sm" role="status" />
      ) : (
        IconComponent && <IconComponent size={16} />
      )}
      {children}
    </button>
  );
};

export default Button;