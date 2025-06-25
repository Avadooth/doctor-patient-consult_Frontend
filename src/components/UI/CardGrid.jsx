import React from 'react';


const Card = ({ item, onButtonClick, buttonLabel }) => {
  return (
    <div
      className="flex w-full max-w-md border border-gray-200 rounded-lg shadow-md bg-white overflow-hidden"
    >
    
      <img
        src={item.profilePic || '/default-profile.jpg'}
        alt={`${item.name}'s profile`}
        className="w-40 object-cover"
        loading="lazy"
      />

   
      <div className="flex flex-col justify-between p-4 flex-1">
        <div>
          <h4 className="text-lg font-semibold mb-1 text-gray-800">{item.name}</h4>
          <p className="text-sm text-gray-600 mb-3">{item.specialty || 'No specialty provided'}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onButtonClick(item._id)}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
          >
            {buttonLabel}
          </button>
         
        </div>
      </div>
    </div>
  );
};


const CardGrid = ({ data, onButtonClick, buttonLabel }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center text-gray-500 text-sm mt-8">
        No data available.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 px-4 py-6">
      {data.map((item) => (
        <Card
          key={item._id}
          item={item}
          onButtonClick={onButtonClick}
          buttonLabel={buttonLabel}
        />
      ))}
    </div>
  );
};

export default CardGrid;
