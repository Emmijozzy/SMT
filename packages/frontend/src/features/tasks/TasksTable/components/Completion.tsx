function Completion({ completion }: { completion: number }) {
  return (
    <div className="grid items-center grid-cols-[2rem_auto]">
      <span className="mr-2 w-1">{completion}</span>
      <div className="relative w-full">
        <div className="overflow-hidden h-2 w-24 text-xs flex rounded bg-red-200">
          <div
            style={{ width: `${completion}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"
          />
        </div>
      </div>
    </div>
  );
}
export default Completion;
