import { ScaleLoader } from "react-spinners";

export default function DashboardLoading() {
    return (
        <div className="d-flex vh-100 vw-100">
            <ScaleLoader color="#ccc" className="m-auto" width={15} />
        </div>
    )

}