// src/pages/SettingsPage.jsx
import React, { useState } from 'react';
import CompanyInfoSection from '../../components/settings/CompanyInfoSection';
import UserRolesSection from '../../components/settings/UserRolesSection';
import NotificationsSettingsSection from '../../components/settings/NotificationsSettingsSection';
import PricingSettingsSection from '../../components/settings/PricingSettingsSection';
import { isAdmin, isSuperAdmin } from "../../utils/authHelper";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/ui/SettingsPage.css';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="container-fluid settings-page mt-4 px-0">
      <h5 className="fw-bold">Settings</h5>
      <p className="text-muted mb-4">Manage your courier dashboard preferences and configurations</p>

      <div className="tabs-container mb-4 d-flex">
        <button className={`tab-button ${activeTab === 'general' ? 'active' : ''}`} onClick={() => setActiveTab('general')}>General Settings</button>

        {(isAdmin() || isSuperAdmin()) && (
          <>
            <button className={`tab-button ${activeTab === 'roles' ? 'active' : ''}`} onClick={() => setActiveTab('roles')}>User Roles</button>
            <button className={`tab-button ${activeTab === 'pricing' ? 'active' : ''}`} onClick={() => setActiveTab('pricing')}>Pricing</button>
          </>
        )}

        <button className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`} onClick={() => setActiveTab('notifications')}>Notifications</button>
      </div>

      {activeTab === 'general' && <CompanyInfoSection />}
      {activeTab === 'roles' && <UserRolesSection />}
      {activeTab === 'pricing' && <PricingSettingsSection />}
      {activeTab === 'notifications' && <NotificationsSettingsSection />}
    </div>
  );
};

export default SettingsPage;
