import React from 'react';

export type FieldProps = {
  children: React.ReactNode;
  label?: string;
  hint?: string;
  error?: string;
  className?: string;
};

/**
 * Field component for modern admin UI
 * Uses adm-field classes from modern-admin.css
 */
export default function Field({ children, label, hint, error, className = '' }: FieldProps) {
  return (
    <label className={`adm-field ${className}`}>
      {label && <span className="adm-label">{label}</span>}
      {children}
      {hint && <span className="adm-hint">{hint}</span>}
      {error && <span className="adm-error">{error}</span>}
    </label>
  );
}
