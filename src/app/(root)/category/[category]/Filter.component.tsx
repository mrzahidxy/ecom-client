import CustomButton from "@/ui/common/Button.component";
import { FileSearch } from "lucide-react";
import { FiDelete } from "react-icons/fi";

export default function Filter() {
  return (
    <div className="flex flex-col gap-4 border-r-2">
      <h4 className="font-semibold">Filters:</h4>
      <select className="w-52 p-1 border rounded-sm border-gray-500">
        <option>A to Z</option>
      </select>

      {/* <select className="w-52 p-1 border rounded-sm border-gray-500">
          <option>Low to High</option>
        </select> */}

      <select className="w-52 p-1 border rounded-sm border-gray-500">
        <option>Color</option>
      </select>

      <select className="w-52 p-1 border rounded-sm border-gray-500">
        <option>Size</option>
      </select>

      <div
        className="flex gap-4"
      >
        <CustomButton title="Search" className="w-24" icon={<FileSearch />} />
        <CustomButton title="Clear" className="w-24" icon={<FiDelete />} />
      </div>
    </div>
  );
}
