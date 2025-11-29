export default function ActivityFeed() {
    return (
        <div className="bg-white p-6 rounded-xl shadow border h-full">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <ul className="space-y-4">
                <li>John completed “Customer Support Basics”</li>
                <li>Raj updated SOP “Inventory Management”</li>
                <li>Aisha started training “Workplace Safety”</li>
            </ul>
        </div>
    );
}
