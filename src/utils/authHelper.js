export const getUserRole = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const decoded = JSON.parse(jsonPayload);
        // Map common role names if needed, or return raw role
        return decoded.role || decoded.userType || null;
    } catch (e) {
        console.error("Failed to decode token", e);
        return null;
    }
};

export const isSuperAdmin = () => {
    const role = getUserRole();
    if (!role) return false;
    return role === 'super_admin' || role === 'Super Admin' || role.toLowerCase() === 'super admin';
};

export const isAdmin = () => {
    const role = getUserRole();
    return role === 'admin' || role === 'Admin' || isSuperAdmin();
};

export const isManager = () => {
    const role = getUserRole();
    return role === 'manager' || role === 'Manager' || isAdmin();
};

export const isRetailHub = () => {
    const role = getUserRole();
    return role === 'retail_hub' || role === 'Retail Hub';
};

export const isDriver = () => {
    const role = getUserRole();
    return role === 'driver' || role === 'Driver';
};

export const isCustomer = () => {
    const role = getUserRole();
    return role === 'customer' || role === 'Customer';
};

export const isAdminStaff = () => {
    const role = getUserRole();
    return role === 'admin_staff' || role === 'Admin Staff';
};
