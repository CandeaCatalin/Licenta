import { FC } from "react";

interface ModalFooterProps {
  onClose: any;
  isSubmitted: boolean;
  onSubmit: any;
  mainButton?: string;
  secondButton?: string;
}
export const ModalFooter: FC<ModalFooterProps> = (props) => {
  return (
    <div className="modal-footer" style={{ justifyContent: "space-between" }}>
      <button
        type="button"
        className="btn button-modal-sec"
        data-bs-dismiss="modal"
        onClick={props.onClose}
      >
        <span style={{ fontWeight: "bold" }}>{props.secondButton}</span>
      </button>
      <button
        type="button"
        className="btn button-modal-prim"
        onClick={() => props.onSubmit()}
        disabled={props.isSubmitted}
      >
        <span style={{ fontWeight: "bold" }}>{props.mainButton}</span>
      </button>
    </div>
  );
};
