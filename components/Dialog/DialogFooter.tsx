interface DialogFooterProps {
  children: React.ReactNode;
}

export function DialogFooter(props: DialogFooterProps) {
  return <div className="w-full h-max">{props.children}</div>;
}
