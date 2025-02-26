import { useState, useEffect, useRef } from "react";
import { HiPlusCircle, HiXCircle } from "react-icons/hi2";

const SearchableMultiDropdown = ({
  options: propOptions,
  label,
  onSelect,
  add,
}) => {
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showAddButton, setShowAddButton] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [existsMessage, setExistsMessage] = useState(""); 
  const dropdownRef = useRef(null);

  useEffect(() => {
    setOptions(propOptions || []);
    setFilteredOptions(propOptions || []);
  }, [propOptions]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    const alreadySelected = selectedOptions.some(
      (selected) => selected.name.toLowerCase() === value.toLowerCase()
    );

    if (alreadySelected) {
      setExistsMessage(`"${value}" is already added.`);
      setShowAddButton(false);
      setShowDropdown(false);
    } else {
      setExistsMessage("");
      const filtered = options.filter(
        (option) =>
          option.name.toLowerCase().includes(value.toLowerCase()) &&
          !selectedOptions.some((selected) => selected.id === option.id)
      );
      setFilteredOptions(filtered);
      setShowAddButton(!filtered.length && value);
      setShowDropdown(true);
    }
  };

  const handleAddOption = async () => {
    await add(search);
    setShowAddButton(false);
    setShowDropdown(false);
    setExistsMessage(""); 
  };

  const handleOptionSelect = (option) => {
    if (!selectedOptions.some((selected) => selected.id === option.id)) {
      setSelectedOptions((prev) => [...prev, option]);
    }
    setShowDropdown(false);
    if (onSelect) {
      const selected = selectedOptions.map((selected) => selected.id);
      onSelect([...selected, option.id]);
    }
  };

  const handleRemoveOption = (option) => {
    const updatedSelectedOptions = selectedOptions.filter(
      (selected) => selected.id !== option.id
    );
    setSelectedOptions(updatedSelectedOptions);
    if (onSelect) {
      onSelect(updatedSelectedOptions);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="grid grid-cols-4 items-center w-full" ref={dropdownRef}>
      {/* <label className="text-gray-700 font-medium">{label}</label> */}
      <div className="col-span-4 relative">
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedOptions?.map((option) => (
            <div
              key={option?.id}
              className="flex items-center px-3 py-1 bg-[#0c111f] rounded-lg"
            >
              <span className="mr-2">{option?.name}</span>
              <HiXCircle
                className="text-red-500 h-5 w-5 cursor-pointer"
                onClick={() => handleRemoveOption(option)}
              />
            </div>
          ))}
        </div>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          onClick={toggleDropdown}
          placeholder={"Search or add new " + label}
          className="p-2 border border-gray-300 bg-[#0c111f] rounded-lg w-full multiDrop"
        />
        {/* <FaChevronDown className="drop-arrow-multi" /> */}
        {existsMessage && (
          <div className="text-red-500 mt-1">{existsMessage}</div>
        )}
        {showDropdown && (
          <ul className="absolute left-0 right-0 mt-[0.1rem] shadow-xl bg-white border border-gray-300 rounded-lg max-h-28 overflow-auto z-10">
            {filteredOptions
              .filter(
                (option) =>
                  !selectedOptions.some((selected) => selected.id === option.id)
              )
              .map((option) => (
                <li
                  className={`${
                    label === "Composition" ? "border-b" : ""
                  } w-full px-4 py-2 bg-[#0c111f] hover:bg-blue-700 hover:text-white`}
                  key={option.id}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option.name}
                </li>
              ))}
          </ul>
        )}

        {showAddButton && (
          <button
            onClick={handleAddOption}
            className="text-blue-500 mt-2 ml-2 inline-flex items-center"
          >
            <span className="text-2xl mr-1">
              <HiPlusCircle />
            </span>{" "}
            Add "{search}"
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchableMultiDropdown;
