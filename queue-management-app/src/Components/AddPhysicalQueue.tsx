import {FC} from "react";


interface AddPhysicalQueueProps {
    onNameChange: any;
    onDescriptionChange: any;
    index: number;
}

export const AddPhysicalQueue: FC<AddPhysicalQueueProps> = ({onNameChange, onDescriptionChange, index}) => {
    return (<>
        <div style={{display: "flex", marginTop: "20px"}}>
            <div className="form-floating mb-3" style={{width: "100%"}}>

                <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    style={{borderRadius: "10px"}}
                    placeholder="Example: Admitere AC"
                    onChange={(event) => {
                        onNameChange(index, event.target.value);
                    }}
                />
                <label htmlFor="floatingInput">Name</label>
            </div>
            <div className="form-floating mb-3" style={{marginLeft: "20px", width: "100%"}}>
                <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    style={{borderRadius: "10px"}}
                    placeholder="Example: Admitere AC"
                    onChange={(event) => {
                        onDescriptionChange(index, event.target.value);
                    }}
                />
                <label htmlFor="floatingInput">Description</label>
            </div>

        </div>
    </>);
}
