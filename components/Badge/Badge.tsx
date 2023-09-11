interface BadgeProps {
  children: React.ReactNode;
}

export function Badge(props: BadgeProps) {
  return (
    <span className="bg-gray-300 text-gray-800 text-sm font-medium mx-1 px-1.5 py-0.5 rounded">
      {props.children}
    </span>
  );
}
