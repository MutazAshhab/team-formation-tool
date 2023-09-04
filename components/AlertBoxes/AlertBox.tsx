interface AlertBoxProps {
  icon: JSX.Element;
  color: string;
  children: React.ReactNode;
}

export function AlertBox(props: AlertBoxProps) {
  return (
    <div className={`p-4 rounded ${props.color}`}>
      <div className="flex items-center">
        <div className="mr-4">{props.icon}</div>
        <div>{props.children}</div>
      </div>
    </div>
  );
}
