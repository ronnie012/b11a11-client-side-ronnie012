import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-success"></div>
    </div>
  );
};

export default LoadingSpinner;



// const LoadingSpinner = () => {
//   return (
//     <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
//       <span className="loading loading-lg loading-spinner text-primary"></span>
//     </div>
//   );
// };

// export default LoadingSpinner;