import React, { useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';

const UserRolesSection = () => {
    const [roles, setRoles] = useState([
        { id: 1, name: 'Admin', permissions: ['All Access'] },
        { id: 2, name: 'Manager', permissions: ['View Reports', 'Manage Shipments'] },
        { id: 3, name: 'Driver', permissions: ['View Assigned Shipments', 'Update Status'] },
        { id: 4, name: 'Customer', permissions: ['Create Shipments', 'Track Orders'] }
    ]);

    const [newRole, setNewRole] = useState({ name: '', permissions: '' });

    const handleAddRole = () => {
        if (newRole.name && newRole.permissions) {
            const permissionsArray = newRole.permissions.split(',').map(p => p.trim());
            setRoles([...roles, {
                id: roles.length + 1,
                name: newRole.name,
                permissions: permissionsArray
            }]);
            setNewRole({ name: '', permissions: '' });
        }
    };

    const handleDeleteRole = (id) => {
        setRoles(roles.filter(role => role.id !== id));
    };

    return (
        <div className="user-roles-section">
            <h5 className="mb-3">User Roles & Permissions</h5>
            <p className="text-muted mb-4">Manage user roles and their permissions</p>

            {/* Add New Role */}
            <div className="card mb-4">
                <div className="card-body">
                    <h6 className="card-title">Add New Role</h6>
                    <Form>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <Form.Group>
                                    <Form.Label>Role Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="e.g., Supervisor"
                                        value={newRole.name}
                                        onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6 mb-3">
                                <Form.Group>
                                    <Form.Label>Permissions (comma-separated)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="e.g., View Reports, Manage Users"
                                        value={newRole.permissions}
                                        onChange={(e) => setNewRole({ ...newRole, permissions: e.target.value })}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-2 mb-3 d-flex align-items-end">
                                <Button variant="primary" onClick={handleAddRole} className="w-100">
                                    Add Role
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>

            {/* Existing Roles Table */}
            <div className="card">
                <div className="card-body">
                    <h6 className="card-title mb-3">Existing Roles</h6>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Role Name</th>
                                <th>Permissions</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((role) => (
                                <tr key={role.id}>
                                    <td>{role.id}</td>
                                    <td><strong>{role.name}</strong></td>
                                    <td>
                                        {role.permissions.map((perm, idx) => (
                                            <span key={idx} className="badge bg-secondary me-1">
                                                {perm}
                                            </span>
                                        ))}
                                    </td>
                                    <td>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleDeleteRole(role.id)}
                                            disabled={role.name === 'Admin'} // Prevent deleting Admin role
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default UserRolesSection;
