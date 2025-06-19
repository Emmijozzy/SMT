import { ReactNode } from "react";
import { FiActivity, FiAward, FiStar, FiTarget } from "react-icons/fi";
import { ProductivityData, WeeklyActivityData } from "../../interfaces/DashboardInterfaces";
import { TabContentProps } from "../../types/TabTypes";
import { AnalyticsCharts } from "../AnalyticsCharts";
import { BaseTab } from "./BaseTab";

interface AnalyticsData {
  weeklyActivityData: WeeklyActivityData;
  productivityData: ProductivityData;
  metrics: {
    averageTaskTime: number;
    teamRanking: number;
    completionRate: number;
  };
}

export class AnalyticsTab extends BaseTab {
  render({ isActive, data }: TabContentProps): ReactNode {
    if (!isActive) return null;

    const { weeklyActivityData, productivityData, metrics } = (data || {}) as AnalyticsData;

    if (!weeklyActivityData || !productivityData || !metrics) {
      return this.renderLoadingState();
    }

    return (
      <div className="space-y-6">
        <AnalyticsCharts weeklyActivityData={weeklyActivityData} productivityData={productivityData} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="stat bg-base-100 shadow-sm rounded-box">
            <div className="stat-figure text-primary">
              <FiTarget className="h-8 w-8" />
            </div>
            <div className="stat-title">Avg. Task Time</div>
            <div className="stat-value text-primary">{metrics.averageTaskTime}h</div>
            <div className="stat-desc">Per task completion</div>
          </div>

          <div className="stat bg-base-100 shadow-sm rounded-box">
            <div className="stat-figure text-secondary">
              <FiAward className="h-8 w-8" />
            </div>
            <div className="stat-title">Team Ranking</div>
            <div className="stat-value text-secondary">#{metrics.teamRanking}</div>
            <div className="stat-desc">Out of 12 members</div>
          </div>

          <div className="stat bg-base-100 shadow-sm rounded-box">
            <div className="stat-figure text-accent">
              <FiActivity className="h-8 w-8" />
            </div>
            <div className="stat-title">Completion Rate</div>
            <div className="stat-value text-accent">{metrics.completionRate}%</div>
            <div className="stat-desc">This month</div>
          </div>

          <div className="stat bg-base-100 shadow-sm rounded-box">
            <div className="stat-figure text-success">
              <FiStar className="h-8 w-8" />
            </div>
            <div className="stat-title">Quality Score</div>
            <div className="stat-value text-success">4.8</div>
            <div className="stat-desc">Based on reviews</div>
          </div>
        </div>
      </div>
    );
  }
}
