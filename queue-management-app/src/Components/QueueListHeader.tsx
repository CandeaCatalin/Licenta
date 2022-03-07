export const QueueListHeader = () => {
  return (
    <div className="queue-list-container-header">
      <div style={{ display: "flex", width: "94%" }}>
        <div
          className=" col-2 queue-list-item-text"
          style={{ borderRightStyle: "groove" }}
        >
          TITLE
        </div>
        <div className="col-10 queue-list-item-text">DESCRIPTION</div>
      </div>
    </div>
  );
};
