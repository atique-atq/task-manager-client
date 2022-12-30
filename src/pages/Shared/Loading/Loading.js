import React from 'react';

const Loading = () => {
    return (
        <div className="flex justify-start items-center">
            <div className="ml-8 mt-6 text-2xl spinner-border border-green-600 animate-spin inline-block w-12 h-12 border-8 rounded-full" role="status">
                <span className="visually-hidden">...</span>
            </div>
            <p>Loading...</p>
        </div>
    );
};

export default Loading;