
import { cn } from "../../lib/utils";


const InputField = ({ label, id, name, type = "text", onChange, value }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300/80">
        {label}
      </label>
      <input
        className={cn(
          `flex h-10 w-full border-none bg-gray-500 dark:bg-zinc-900/70 mt-1 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-300 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
           disabled:cursor-not-allowed disabled:opacity-50
           dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
           group-hover/input:shadow-none transition duration-400
           `
        )}
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
