export function PatientHeader() {
  return (
    <div className="w-full h-[120px] rounded bg-zinc-100 flex">
      <div className="bg-black h-full w-32 rounded"></div>
      <div className="flex flex-col p-6">
        <strong className="text-lg">Guilherme Michels</strong>
        <span className="text-sm">05070239007</span>
      </div>
    </div>
  );
}
