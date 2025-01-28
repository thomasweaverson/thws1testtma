// DebugContainer.tsx
import { useUserContext } from "../../context/use-user-context";

const DebugContainer: React.FC = () => {
  const { debugErrors } = useUserContext();

  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <h2 className="text-lg font-semibold text-red-600">Debug Information</h2>
      {debugErrors.length > 0 ? (
        <ul className="mt-2 list-disc list-inside">
          {debugErrors.map((error, index) => (
            <li key={index} className="text-red-500">
              {error}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-green-500">No errors detected.</p>
      )}
    </div>
  );
};

export default DebugContainer;