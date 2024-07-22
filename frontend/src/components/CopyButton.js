import { Copy, Check } from "lucide-react";
import { useState } from "react";

const CopyButton = ({ id }) => {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      setCopied(true);
      const text = document.getElementById(id).innerText;
      await navigator.clipboard.writeText(text);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={onCopy}
      className="inline-flex rounded-md p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800"
    >
      <Copy
        size={12}
        className={`transition-all ${copied ? "scale-0" : "scale-100"}`}
      />
      <Check
        size={12}
        className={`absolute transition-all ${copied ? "scale-100" : "scale-0"}`}
      />
    </button>
  );
};

export default CopyButton;