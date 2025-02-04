import { Div } from "@/components";

// Sidebar Component
export const Sidebar: React.FC = () => {
  return (
    <Div className="w-64 bg-gray-800 text-gray-200 p-4">
      <h2 className="text-lg font-bold mb-4">Menu</h2>
      <ul>
        <li className="py-2 hover:bg-gray-700 px-2 rounded">Home</li>
        <li className="py-2 hover:bg-gray-700 px-2 rounded">Settings</li>
        <li className="py-2 hover:bg-gray-700 px-2 rounded">Help</li>
      </ul>
    </Div>
  );
};
