"use client";

const StepCard = ({
  step,
  title,
 description,
  icon,
  children,
  backButton,
  nextButton,
}) => {
  return (
    <div>
      {/* Header */}
      <div className="md:mb-8 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-sm font-semibold tracking-wider uppercase text-[#1C4672]">
              {step}
            </span>

            <h2 className="text-xl md:text-3xl font-bold mt-2">
              {title}
            </h2>

            <p className="text-gray-500 mt-2 text-sm">
              {description}
            </p>
          </div>

          {icon && (
            <div className="w-9 h-9 md:w-14 md:h-14 rounded-2xl bg-[#1C4672]/10 flex items-center justify-center text-xl md:text-3xl flex-shrink-0">
              {icon}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {children}

      {/* Footer Buttons */}
      {(backButton || nextButton) && (
        <div className="flex justify-between mt-10">
          <div>{backButton}</div>
          <div>{nextButton}</div>
        </div>
      )}
    </div>
  );
};

export default StepCard;