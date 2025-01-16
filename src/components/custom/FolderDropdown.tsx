"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

interface Folder {
  folderName: string;
}

interface FolderDropdownProps {
  folders: Folder[];
}

const FolderDropdown: React.FC<FolderDropdownProps> = ({ folders }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const filteredFolders = useMemo(() => {
    return folders.filter((folder) =>
      folder.folderName.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [folders, searchTerm]);

  const handleFolderSelect = (folderName: string) => {
    setSelectedFolder(folderName);
    setSearchTerm(folderName); // Update search term with selected folder
    setDropdownOpen(false); // Close dropdown after selection
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false); // Close dropdown
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Select Folder
      </label>

      <div className="relative z-99 bg-white dark:bg-form-input">
        <input
          type="text"
          placeholder="Search folders"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={() => setDropdownOpen(!isDropdownOpen)} // Open dropdown on click
          className="relative z-99 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
        />

        <div className="relative z-99">
          {isDropdownOpen && (
            <>
              {filteredFolders.length > 0 ? (
                <ul className="absolute z-99 w-full rounded border border-stroke bg-white shadow-md dark:bg-gray-800">
                  {filteredFolders.map((folder, idx) => (
                    <li
                      key={idx}
                      className="cursor-pointer px-4 py-2 hover:bg-primary/5 dark:hover:bg-primary/5"
                      onClick={() => handleFolderSelect(folder.folderName)}
                    >
                      {folder.folderName}
                    </li>
                  ))}
                </ul>
              ) : (
                <li className="px-4 py-2 text-gray-500 shadow-md hover:bg-primary/5 dark:hover:bg-primary/5">
                  No folders found
                </li>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FolderDropdown;
