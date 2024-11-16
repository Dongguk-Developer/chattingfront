// URLPreview.js
import React from "react";

const URLPreview = ({ data }) => {
    return (
        <div className="p-2 text-right">
        {data.image && (
            <img
                src={data.image}
                alt="URL Preview"
                className="w-32 h-32 object-cover rounded-md inline-block"
            />
        )}
    </div>
    );
};

export default URLPreview;
