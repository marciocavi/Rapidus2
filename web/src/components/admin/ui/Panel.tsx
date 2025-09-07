import React from 'react';

export type PanelProps = {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

/**
 * Panel component for modern admin UI
 * Uses adm-panel classes from modern-admin.css
 */
export default function Panel({ children, className = '', header, footer }: PanelProps) {
  return (
    <section className={`adm-panel ${className}`}>
      {header && (
        <div className="adm-panel__header">
          {header}
        </div>
      )}
      <div className="adm-panel__body">
        {children}
      </div>
      {footer && (
        <div className="adm-panel__footer">
          {footer}
        </div>
      )}
    </section>
  );
}
