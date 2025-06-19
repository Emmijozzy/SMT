/* eslint-disable class-methods-use-this */
import { ReactNode } from "react";
import { TabContentProps } from "../../types/TabTypes";

export abstract class BaseTab {
  abstract render(props: TabContentProps): ReactNode;

  protected renderEmptyState(message: string): ReactNode {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-base-content/70">{message}</p>
        </div>
      </div>
    );
  }

  protected renderLoadingState(): ReactNode {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }
}
