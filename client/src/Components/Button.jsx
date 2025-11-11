import React from 'react';

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  className = '',
  emitBtn,
  ...rest
}) {
    
   const btnFire=(e)=>{
      emitBtn()
   }

  return (
    <button onClick={btnFire}
      className={`btn btn-${variant} btn-${size} ${className}`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? <i className="pi pi-spin pi-spinner"></i> : children}
    </button>
  );
}
