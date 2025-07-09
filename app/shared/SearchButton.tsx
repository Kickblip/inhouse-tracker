import { FaMagnifyingGlass } from "react-icons/fa6"

export default function SearchButton() {
  return (
    <button className="p-3 cursor-pointer flex items-center bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors duration-200">
      <FaMagnifyingGlass />
    </button>
  )
}
