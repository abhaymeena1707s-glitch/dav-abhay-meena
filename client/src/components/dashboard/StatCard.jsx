const StatCard = ({ title, value, icon, linkText, linkUrl, valueColor = 'text-gray-900', isWarning = false }) => {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className={`text-3xl font-bold ${valueColor}`}>{value}</h3>
            {isWarning && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
                !
              </span>
            )}
          </div>
        </div>
        <div className={`rounded-lg p-3 ${isWarning ? 'bg-red-50 text-red-500' : 'bg-indigo-50 text-indigo-500'}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <a href={linkUrl} className="text-sm font-medium text-gray-500 hover:text-indigo-600">
          {linkText}
        </a>
      </div>
    </div>
  );
};

export default StatCard;
