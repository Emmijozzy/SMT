import Avartar from "../../../../shared/components/Avartar";

interface AssigneeCellProps {
  assignee: string;
}

export function AssigneeCell({ assignee }: AssigneeCellProps) {
  return (
    <div className="flex gap-2 items-center">
      <Avartar
        imgUrl="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80"
        name="John Doe"
        className="w-8 h-8 rounded-full"
      />
      <p className="capitalize">{assignee}</p>
    </div>
  );
}
