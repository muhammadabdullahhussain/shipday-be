import React, { useEffect, useState } from "react";
import "../../styles/ui/dashboard/DashboardPage.css"; 
import axiosInstance from "../../utils/axiosInterceptor";

const ActivityOverview = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data } = await axiosInstance.get("shipment");

        const activityLog = [];

        data.forEach(shipment => {
          if (shipment.createdAt) {
            activityLog.push({
              id: `assigned-${shipment._id}`,
              text: `Shipment #${shipment.shipmentId} assigned to Driver ${shipment.driverName || "Unassigned"}.`,
              time: new Date(shipment.createdAt).toLocaleString(),
              type: "assigned"
            });
          }

          if (shipment.orders && shipment.orders.length > 0) {
            shipment.orders.forEach(order => {
              if (order.status) {
                activityLog.push({
                  id: `order-${order._id}`,
                  text: `Order #${order._id} status changed to ${order.status}.`,
                  time: order.updatedAt
                    ? new Date(order.updatedAt).toLocaleString()
                    : new Date(shipment.createdAt).toLocaleString(),
                  type:
                    order.status === "Delivered"
                      ? "success"
                      : order.status === "Pending"
                      ? "warning"
                      : "info"
                });
              }
            });
          }
        });

        activityLog.sort((a, b) => new Date(b.time) - new Date(a.time));

        setActivities(activityLog);
      } catch (err) {
        console.error("❌ Error fetching activities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading)
    return (
      <div className="card h-100 p-3 activity-overview-card">Loading...</div>
    );

  // Calculate maxHeight: 3 items * itemHeight (adjust itemHeight if necessary)
  const itemHeight = 60;
  const maxVisibleItems = 4;
  const scrollHeight = maxVisibleItems * itemHeight;

  return (
    <div className="card h-100 p-3 activity-overview-card">
      <h5 className="fw-bold text-dark mb-1">Activity Overview</h5>
      <div className="mb-3">
        <span className="text-success" style={{ fontSize: "14px" }}>
          <i className="bi bi-arrow-up-short" /> {activities.length}% this month
        </span>
      </div>

      <div
        className="timeline-wrapper mt-3"
        style={{
          maxHeight:
            activities.length > maxVisibleItems ? `${scrollHeight}px` : "auto",
          overflowY:
            activities.length > maxVisibleItems ? "auto" : "visible"
        }}
      >
        {activities.map((activity, index) => (
          <div
            key={`${activity.id}-${index}`}  // fixed key uniqueness
            className="timeline-item d-flex mb-4 position-relative"
          >
            <div className="timeline-indicator">
              <span className={`dot ${activity.type || ""}`} />
              {index !== activities.length - 1 && <div className="line" />}
            </div>
            <div className="timeline-content ps-3">
              <p
                className="mb-1 fw-semibold text-dark"
                style={{ fontSize: "15px" }}
              >
                {activity.text}
              </p>
              <small className="text-muted" style={{ fontSize: "13px" }}>
                {activity.time}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityOverview;
