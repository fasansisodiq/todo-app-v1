import Label from "../Label";
import ColumnDiv from "../ColumnDiv";
import TextArea from "../TextArea";

function Description({ value, onChange }) {
  return (
    <div className="w-full">
      <ColumnDiv>
        <span className="flex justify-start mb-1">
          <Label htmlFor="description">Description</Label>
        </span>
        <TextArea onChange={onChange} value={value} />
      </ColumnDiv>
    </div>
  );
}

export default Description;
