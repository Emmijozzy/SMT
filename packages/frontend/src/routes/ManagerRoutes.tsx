import { lazy } from "react";
import { Route } from "react-router-dom";
import RequireManagerRoute from "../features/auth/RequireManagerRoute";
import Users from "../features/users/Users";
import Layout from "../layout/Layout";
import { LazyComponent2 } from "./LazyWrapper2";
import AddUser from "../features/users/AddUser/AddUser";

const Dashboard = lazy(() => import("../features/Dashboard/Dashboard"));
const MemberTable = lazy(() => import("../features/users/manager/MemberTable"));

export const ManagerRoutes = (
  <Route path="manager" element={<RequireManagerRoute />}>
    <Route path="dash" element={<Layout />}>
      <Route
        index
        element={
          <LazyComponent2>
            <Dashboard />
          </LazyComponent2>
        }
      />
      <Route
        path="users"
        element={
          <LazyComponent2>
            <Users />
          </LazyComponent2>
        }
      >
        <Route
          index
          element={
            <LazyComponent2>
              <MemberTable />
            </LazyComponent2>
          }
        />
        <Route
          path="add-new-user"
          element={
            <LazyComponent2>
              <AddUser />
            </LazyComponent2>
          }
        />
      </Route>
    </Route>
  </Route>
);
