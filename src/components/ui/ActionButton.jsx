import React from 'react';
import { FiMoreVertical, FiEdit, FiTrash2, FiEye, FiUserPlus } from 'react-icons/fi';

const ActionButton = ({ actions, shipment }) => {
  return (
    <div className="dropdown">
      <button 
        className="btn btn-sm btn-outline-secondary"
        data-bs-toggle="dropdown"
      >
        <FiMoreVertical size={16} />
      </button>
      <ul className="dropdown-menu">
        {actions.map((action, index) => (
          <li key={index}>
            <button 
              className="dropdown-item d-flex align-items-center gap-2"
              onClick={() => action.onClick(shipment)}
            >
              {action.icon === 'edit' && <FiEdit size={14} />}
              {action.icon === 'delete' && <FiTrash2 size={14} />}
              {action.icon === 'view' && <FiEye size={14} />}
              {action.icon === 'assign' && <FiUserPlus size={14} />}
              {action.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActionButton;