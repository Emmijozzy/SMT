import { ReactNode } from "react";
import { TabConfig, TabType } from "../types/TabTypes";

interface TabSystemProps {
  tabs: TabConfig[];
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  children: ReactNode;
}

export function TabSystem({ tabs, activeTab, onTabChange, children }: TabSystemProps) {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-0">
        <div className="tabs tabs-lifted">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`tab tab-lg ${activeTab === tab.id ? "tab-active" : ""}`}
            >
              <tab.icon className="mr-2" />
              {tab.label}
              {tab.badge !== undefined && (
                <div className={`badge badge-sm ml-2 ${tab.id === "messages" ? "badge-primary" : ""}`}>{tab.badge}</div>
              )}
            </button>
          ))}
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
