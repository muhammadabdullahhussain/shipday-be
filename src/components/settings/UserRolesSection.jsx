import React, { useState, useEffect } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css";
import axiosInstance from "../../utils/axiosInterceptor";
import { isSuperAdmin } from "../../utils/authHelper";

const UserRolesSection = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newRole, setNewRole] = useState({ name: '', permissions: '' });

    // State for creating new admin
    const [newAdmin, setNewAdmin] = useState({ fullName: '', email: '', password: '', role: 'Admin' });
    const [adminLoading, setAdminLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get('/roles');
            setRoles(res.data);
        } catch (error) {
            console.error("Error fetching roles:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateAdmin = async () => {
        if (!newAdmin.fullName || !newAdmin.email || !newAdmin.password) {
            toast.error("Please fill in all fields");
            return;
        }
        setAdminLoading(true);
        try {
            const res = await axiosInstance.post('/auth/create-admin', newAdmin);
            toast.success(res.data.message);
            setNewAdmin({ fullName: '', email: '', password: '', role: 'Admin' });
            setShowPassword(false);
        } catch (error) {
            console.error("Error creating admin:", error);
            toast.error(error.response?.data?.message || "Failed to create admin");
        } finally {
            setAdminLoading(false);
        }
    };

    const handleAddRole = async () => {
        if (!newRole.name || !newRole.permissions) {
            toast.error("Please fill in role name and permissions");
            return;
        }

        try {
            const permissionsArray = newRole.permissions.split(',').map(p => p.trim());
            const payload = {
                role: newRole.name,
                permissions: permissionsArray,
                description: `Custom role for ${newRole.name}`
            };

            const res = await axiosInstance.post('/roles', payload);
            setRoles([...roles, res.data]);
            setNewRole({ name: '', permissions: '' });
            toast.success("Role added successfully");
        } catch (error) {
            console.error("Error adding role:", error);
            toast.error("Failed to add role");
        }
    };

    const handleDeleteRole = async (id, roleName) => {
        if (window.confirm(`Are you sure you want to delete role: ${roleName}?`)) {
            try {
                await axiosInstance.delete(`/roles/${id}`);
                setRoles(roles.filter(role => role._id !== id));
                toast.success("Role deleted successfully");
            } catch (error) {
                console.error("Error deleting role:", error);
                toast.error("Failed to delete role");
            }
        }
    };

    return (
        <div className="user-roles-section">
            <h5 className="mb-3">User Roles & Permissions</h5>
            <p className="text-muted mb-4">Manage user roles and their permissions</p>

            {/* Create Admin User Section (Super Admin Only) */}
            {isSuperAdmin() && (
                <div className="card mb-4 border-warning">
                    <div className="card-header bg-warning text-dark fw-bold">
                        Create New Admin / Manager
                    </div>
                    <div className="card-body">
                        <Form>
                            <div className="row">
                                <div className="col-md-3 mb-2">
                                    <Form.Group>
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Name"
                                            value={newAdmin.fullName}
                                            onChange={(e) => setNewAdmin({ ...newAdmin, fullName: e.target.value })}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-3 mb-2">
                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="email@shipday.com"
                                            value={newAdmin.email}
                                            onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-3 mb-2">
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <div className="input-group">
                                            <Form.Control
                                                type={showPassword ? "text" : "password"}
                                                placeholder="******"
                                                value={newAdmin.password}
                                                onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                                            />
                                            <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                                                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                            </Button>
                                        </div>
                                    </Form.Group>
                                </div>
                                <div className="col-md-2 mb-2">
                                    <Form.Group>
                                        <Form.Label>Role</Form.Label>
                                        <Form.Select
                                            value={newAdmin.role}
                                            onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                                        >
                                            <option value="Admin">Admin</option>
                                            <option value="Manager">Manager</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <div className="col-md-1 mb-2 d-flex align-items-end">
                                    <Button variant="dark" onClick={handleCreateAdmin} className="w-100" disabled={adminLoading}>
                                        {adminLoading ? '...' : 'Add'}
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            )}

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
                                <Button variant="primary" onClick={handleAddRole} className="w-100" disabled={loading}>
                                    {loading ? 'Adding...' : 'Add Role'}
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
                    {loading && roles.length === 0 ? (
                        <p className="text-center">Loading roles...</p>
                    ) : (
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Role Name</th>
                                    <th>Permissions</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.length > 0 ? (
                                    roles.map((role) => (
                                        <tr key={role._id}>
                                            <td><strong>{role.role}</strong></td>
                                            <td>
                                                {role.permissions && role.permissions.map((perm, idx) => (
                                                    <span key={idx} className="badge bg-secondary me-1">
                                                        {perm}
                                                    </span>
                                                ))}
                                            </td>
                                            <td>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() => handleDeleteRole(role._id, role.role)}
                                                    disabled={['Super Admin', 'Admin', 'Manager', 'Driver', 'Customer'].includes(role.role)} // Protect core roles
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center">No roles found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserRolesSection;
