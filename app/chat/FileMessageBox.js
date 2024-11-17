import React from "react";
import { CURRENT_BACKEND } from "../res/path";
const FileMessageBox = ({ file, uid, isCurrentUser }) => {
    return (
        <div 
            className={`flex items-center p-4 border border-gray-300 rounded-lg shadow-sm w-1/2 ${isCurrentUser ? 'ml-auto bg-blue-100' : 'mr-auto bg-gray-100'}`}
        >
            <a
                href={file}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
                <img src={CURRENT_BACKEND+file.slice(1)}/>
            </a>
        </div>
    );
};

export {FileMessageBox};
