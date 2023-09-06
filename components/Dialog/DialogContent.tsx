interface DialogContentProps {
  className?: React.ComponentProps<'div'>['className'];
  children: React.ReactNode;
}

export function DialogContent(props: DialogContentProps) {
  const classNames = ['h-[600px]', props.className].join(' ');
  return <div className={classNames}>{props.children}</div>;
}
