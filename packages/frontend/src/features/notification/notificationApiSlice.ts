import { apiSlice } from "../../app/api/apislice";
import { ResApiData } from "../../shared/interface/resApiData";
import { INotification } from "./notificationInterface";

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getNotificationsByRecipientId: build.query<INotification[], string>({
      query: (recipientId: string) => ({
        url: `/notification/${recipientId}`,
        validateStatus: (response, result: { isError?: boolean }) =>
          response.status === 200 || (result && !result.isError),
        timeout: 1000,
      }),
      transformResponse: (responseData: ResApiData<INotification[]>) => {
        const data = responseData.data as INotification[];
        const notifications =
          data?.map((notification) => ({
            ...notification,
            _id: notification.notificationId,
            // createdAt: new Date(notification.createdAt),
          })) || [];
        return notifications;
      },
      providesTags: (result) => {
        if (result) {
          return [
            ...result.map(({ notificationId }) => ({
              type: "Notification" as const,
              id: notificationId,
            })),
            { type: "Notification", id: "LIST" },
          ];
        }
        return [{ type: "Notification", id: "LIST" }];
      },
    }),
    deleteNotification: build.mutation<void, string>({
      query: (notificationId: string) => ({
        url: `/notification/${notificationId}/delete`,
        method: "DELETE",
        validateStatus: (response, result: { isError?: boolean }) =>
          response.status === 200 || (result && !result.isError),
        timeout: 1000,
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Notification", id }],
    }),
  }),
});

export const { useGetNotificationsByRecipientIdQuery, useDeleteNotificationMutation } = notificationApiSlice;
