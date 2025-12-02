// src/layouts/DemoLayout.jsx
import { Outlet } from "react-router-dom";
import { useState } from "react";
import DemoSidebar from "./DemoSidebar";
import DemoHeader from "./DemoHeader";

export default function DemoLayout() {
    const [active, setActive] = useState("Dashboard");
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex">

            <DemoSidebar
                isOpen={isOpen}
                closeSidebar={() => setIsOpen(false)}
                active={active}
                setActive={setActive}
            />

            <div className="flex-1">
                <DemoHeader openSidebar={() => setIsOpen(true)} />

                <div className="p-6">
                    <Outlet />   {/* <-- This is where demo pages load */}
                </div>
            </div>

        </div>
    );
}
