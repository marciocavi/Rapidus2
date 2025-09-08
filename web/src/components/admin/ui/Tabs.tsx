import React from 'react';

export type TabProps = {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
};

export type TabsProps = {
  tabs: TabProps[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
};

/**
 * Tabs component for modern admin UI
 * Uses adm-tabs classes from modern-admin.css
 */
export default function Tabs({ tabs, onTabChange, className = '' }: TabsProps) {
  return (
    <div className={`adm-tabs ${className}`}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className="adm-tab"
          aria-selected={tab.isActive}
          onClick={() => onTabChange(tab.id)}
          style={{ cursor: 'pointer' }}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
}


