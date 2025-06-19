/* eslint-disable no-nested-ternary */
import { ReactNode } from "react";
import { MessageData } from "../../interfaces/DashboardInterfaces";
import { TabContentProps } from "../../types/TabTypes";
import { BaseTab } from "./BaseTab";

export class MessagesTab extends BaseTab {
  render({ isActive, data }: TabContentProps): ReactNode {
    if (!isActive) return null;

    const messages = (data as { messages?: MessageData[] })?.messages || [];

    if (!messages || messages.length === 0) {
      return this.renderEmptyState("No messages available");
    }

    return (
      <div className="space-y-4">
        {messages.map((message: MessageData) => (
          <div
            key={message.id}
            className={`card ${message.unread ? "bg-primary/5 border-primary/20" : "bg-base-100"} shadow-sm`}
          >
            <div className="card-body p-4">
              <div className="flex items-start gap-4">
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-full w-10 h-10">
                    <span className="text-sm">{message.avatar}</span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">{message.sender}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-base-content/70">{message.time}</span>
                        <div
                          className={`badge badge-xs ${
                            message.type === "request"
                              ? "badge-warning"
                              : message.type === "update"
                                ? "badge-info"
                                : "badge-success"
                          }`}
                        >
                          {message.type}
                        </div>
                      </div>
                    </div>
                    {message.unread && <div className="badge badge-primary badge-xs">New</div>}
                  </div>

                  <p className="text-sm text-base-content/80 mb-3">{message.content}</p>

                  <div className="flex gap-2">
                    <button type="button" className="btn btn-outline btn-xs">
                      Reply
                    </button>
                    {message.unread && (
                      <button type="button" className="btn btn-ghost btn-xs">
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
