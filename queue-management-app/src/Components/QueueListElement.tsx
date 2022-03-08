import {
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { Queue } from "../Models/Queue";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ModalsContext } from "../Context/ModalsContext";
import { PhysicalQueue } from "../Models/PhysicalQueue";
interface QueueListElementProps {
  queue: Queue | PhysicalQueue;
}
export const QueueListElement: FC<QueueListElementProps> = ({ queue }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const modalContext = useContext(ModalsContext);
  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };
  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  return (
    <li className="row col-12">
      <div
        className="queue-list-item"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "10px",
        }}
      >
        <div style={{ display: "flex", marginTop: "5px", width: "90%" }}>
          <div
            className=" col-2 queue-list-item-text"
            style={{ borderRightStyle: "groove" }}
            data-toggle="tooltip"
            data-placement="right"
            title={queue.name}
          >
            {queue.name}
          </div>
          <div
            className="col-10 queue-list-item-text"
            data-toggle="tooltip"
            data-placement="right"
            title={queue.description}
          >
            {queue.description}
          </div>
        </div>
        <div>
          <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <MoreVertIcon />
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="left-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                      style={{
                        paddingTop: "0px",
                        paddingBottom: "0px",
                      }}
                    >
                      <MenuItem
                        onClick={(e) => {
                          handleClose(e);
                          modalContext.setViewedQueue(queue);
                          modalContext.setIsViewQueueModalOpen(true);
                        }}
                      >
                        <VisibilityIcon />
                        View
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          console.log("edit");
                        }}
                      >
                        <EditIcon />
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={(e) => {
                          handleClose(e);
                          modalContext.setDeletedQueue(queue);
                          modalContext.setIsDeleteQueueModalOpen(true);
                        }}
                      >
                        <DeleteIcon />
                        Delete
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    </li>
  );
};
