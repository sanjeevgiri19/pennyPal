const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-10 h-10 border-4 border-pink-500 rounded-full animate-spin border-t-transparent"></div>
    </div>
  );
};

export default LoadingSpinner;
