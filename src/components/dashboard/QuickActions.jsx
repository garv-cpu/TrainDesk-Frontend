import { useNavigate } from "react-router-dom";

export default function QuickActions() {
    const navigate = useNavigate();
    const handleCreateSOP = () => {
        navigate("sops/create");
    };

    const handleAssignTraining = () => {
        alert("Assign training clicked — choose employee soon!");
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>

            <div className="flex flex-col gap-3">
                <button
                    onClick={handleCreateSOP}
                    className="bg-blue-600 text-white py-2 rounded-lg"
                >
                    Create New SOP
                </button>

                <button
                    onClick={handleAssignTraining}
                    className="bg-green-600 text-white py-2 rounded-lg"
                >
                    Assign Training
                </button>
            </div>
        </div>
    );
}
