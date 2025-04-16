import StatTable from "./StatTable";
import UploadZone from "./UploadZone";
import SaveToDBButton from "./SaveToDBButton";

export default function UploadPage() {
  return (
    <div>
      <div className="flex items-center mb-4">
        <UploadZone />
        <SaveToDBButton />
      </div>
      <StatTable />
    </div>
  );
}
