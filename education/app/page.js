import InputForm from "@/components/InputForm";


export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r
    from-slate-100 via-slate-300 to-slate-300
    flex flex-col items-center px-2 md:p-4">
      <div className="w-full max-w-screen-md bg-black
      p-4 md:p-20 lg:p-10 rounded-md flex flex-col gap-5 text-gray-300">
        <InputForm />
      </div>
    </div>
  );
}
