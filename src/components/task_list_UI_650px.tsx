import type { ReactNode } from "react";
import {useState} from "react";

import { 
    ArrowRight2,
    Edit,
    TrushSquare
} from "iconsax-reactjs";
import '../assets/css/uilist65.css';

interface UIListProps {
    title?: string;
    description?: string;
    tableData?: ReactNode;
    backgroundColor?: string;
    icon?: string;
    onEdit?: () => void;
    onDelete?: () => void;
}
export default function UIList({ title, description, tableData, backgroundColor, icon, onEdit, onDelete }: UIListProps) {
    const [toggleList, setToggleList] = useState(false);

    const handleToggleList = () => {
        setToggleList((prev) => !prev);
    };

    return (
        <div className={
            toggleList
                ? "ui65-item ui65-bx active-ui65"
                : "ui65-item ui65-bx"
            }
        >
            {/* this is item  */}
            <div 
                className="ui65-i"
                onClick={handleToggleList}
            >
                <div className="ui65i-box df-s">
                    <div className="rw df-l">
                        {icon !== '' ? 
                        (<div className="pf">
                            <img className="img-c" src={icon || "/images/default.svg"} alt="icon" />
                        </div>)
                        : "" }
                        <div className="text">
                            <h2>{title}</h2>
                            <p>{description}</p>
                        </div>
                    </div>
                    <div
                        className="icon icon-ra icon-sm btn-open"
                        aria-expanded={toggleList}
                        style={{ background: backgroundColor || "var(--sg-bglight)" }}
                    >
                        <ArrowRight2 />
                    </div>
                </div>
            </div>
            {/* this is table list  */}
            <div className="ui65-tbl">
                {/* this is table  */}
                <div className="ui65tbl-box">
                    <table>
                        <tbody>
                            <tr>
                                <th>ចំណងជើង</th>
                                <th>ការពិពណ៌នា</th>
                            </tr>
                            {tableData}
                        </tbody>
                    </table>
                </div>
                {/* this is table footer  */}
                <div className="ui65tbl-ft">
                    <div className="ui65tblft-box df-s">
                        <div className="text">
                            <p>ជ្រើសរើសស</p>
                        </div>
                        <div className="action df-c">
                            <div 
                                className="btn btn-delete"
                                onClick={onDelete}
                            >
                                <span>លុប</span>
                                <TrushSquare />
                            </div>
                            <div 
                                className="btn btn-edit"
                                onClick={onEdit}
                            >
                                <span>កែប្រែ</span>
                                <Edit />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}