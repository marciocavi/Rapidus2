import React from 'react';

export type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
};

/**
 * Toggle component for modern admin UI
 * Uses adm-toggle classes from modern-admin.css
 */
export default function Toggle({ checked, onChange, disabled = false, className = '' }: ToggleProps) {
  return (
    <div 
      className={`adm-toggle ${checked ? 'is-on' : ''} ${className}`}
      onClick={() => !disabled && onChange(!checked)}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}
    >
      <div className="adm-toggle__knob" />
    </div>
  );
}


