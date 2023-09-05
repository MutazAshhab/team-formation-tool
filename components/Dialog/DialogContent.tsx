interface DialogContentProps {
  className?: string;
  children: React.ReactNode;
}

export function DialogContent({
  className = '',
  children,
}: DialogContentProps) {
  return <div className={className}>{children}</div>;
}
