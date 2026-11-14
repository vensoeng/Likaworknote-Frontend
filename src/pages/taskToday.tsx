import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate} from 'react-router-dom';
import { formatDate } from "../config/formatData";
import TaskTotayService from "../services/taskTodayService";

import WebLoader from "../components/WebLoader";
import ShareModal from "../components/share_model";
import "../assets/css/simpl_table_style.css";

import { 
    ArrowLeft,
    Printer
} from "iconsax-reactjs";

import type { TaskToday } from "../types/taskToday";


function TaskTodayPage() {
    const { id, type} = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [NavTitle, setNavTitle] = useState<string>('ភារកិច្ច');

    const printRef = useRef<HTMLDivElement>(null);
    // =========================
    // FETCH TASK
    // =========================
    const [tasks, setTasks] = useState<TaskToday[]>([]);
    const fetchTasks = async () => {
        if (!id && !type) return;

        try {
            setLoading(true);

            if(type === 'week')
            {
                setNavTitle('ភារកិច្ចដែលបានបញ្ចប់ក្នុងសប្តាហ៍នេះ');
                const data = await TaskTotayService.getTaskThisWeek(Number(id));
                setTasks(
                    Array.isArray(data) ? data : []
                );
            }else if (type === 'month')
            {
                const data = await TaskTotayService.getTaskThisMonth(Number(id));
                setTasks(
                    Array.isArray(data) ? data : []
                );
                setNavTitle('ភារកិច្ចដែលបានបញ្ចប់ក្នុងខែនេះ');
            }else if (type === 'year')
            {
                const data = await TaskTotayService.getTaskThisYear(Number(id));
                setTasks(
                    Array.isArray(data) ? data : []
                );
                setNavTitle('ភារកិច្ចដែលបានបញ្ចប់ក្នុងឆ្នាំនេះ');
            }else if(type === 'today')
            {
                const data = await TaskTotayService.getTaskToday(Number(id));
                setTasks(
                    Array.isArray(data) ? data : []
                );
                setNavTitle('ភារកិច្ចក្នុងថ្ងៃនេះ');
            }else{
                const data = await TaskTotayService.getTaskCompletedByDate(
                    type?.toString() ?? "",
                    id?.toString() ?? ""
                );
                setTasks(
                    Array.isArray(data) ? data : []
                );
                setNavTitle('ភារកិច្ច');
            }

        } catch (error) {
            console.error(
                "Failed to fetch tasks:",
                error
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [id]);

    //=============================
    // Arror back action
    //=============================
    const navigate = useNavigate();
    const [linkBack] = useState<any>('/');
    const handleBack = () => {
        if (window.history.length > 2) {
            navigate(-1);
        } else {
            navigate(linkBack);
        }
    };

    // =========================
    // SHARE MODEL
    // =========================
    const [showShare, setShowShare] = useState(false);
    const WEB_URL = window.location.href;

    return (
        <div className="admin-creators p-r">
            {/* =========================
              SHARE MODEL
            ========================= */}
            <ShareModal
                isOpen={showShare}
                url={WEB_URL}
                onClose={() => setShowShare(false)}
            />
            <nav className="wba-n">
                <div className="wban-box df-s">
                    <button 
                        type="button" 
                        className="btn-home row btn ibtn"
                        onClick={handleBack}
                    >
                        <ArrowLeft />
                    </button>
                    <div className="row rw-title">
                        <h2>{NavTitle}</h2>
                    </div>
                    <div className="row df-l">
                        <button 
                            className="btn btn-print"
                            onClick={() => window.print()}
                        >
                            ទាញយក
                            <Printer/>
                        </button>
                        <button 
                            className="btn btn-share"
                            onClick={() => {
                                // setShareUrl(WEB_URL + '/task/category/');
                                setShowShare(true);
                            }}
                        >
                            ចែករំលែក
                            <svg xmlns="http://www.w3.org/2000/svg" width="16"
                            height="16" fill="currentColor" className="bi bi-share" viewBox="0 0 16 16">
                            <path
                                d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3">
                            </path>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
            {loading ? (
                <WebLoader>
                    កំពុងទាញយកទិន្នន័យដើម្បីបង្ហាញ...
                </WebLoader>
            ) : (
                <div className="sim-report" ref={printRef}>
                    {/* MOBILE REPORT */}
                    <div className="mobile-report">
                        {tasks.length === 0 ? (
                            <div className="empty-report">
                                រកមិនឃើញទិន្នន័យសូមព្យាយាមវិធីផ្សេង
                            </div>
                        ) : (
                            tasks.map((task, index) => (
                                <div className="report-card" key={task.id ?? index}>

                                    <div className="report-card-head">
                                        <span>#{index + 1}</span>
                                        <h3>{task.title}</h3>
                                    </div>

                                    {task.des && (
                                        <p className="report-description">
                                            {task.des}
                                        </p>
                                    )}

                                    <div className="report-card-body">
                                        <div className="report-field">
                                            <span>ស្ថានភាព</span>
                                            <strong>{task.taskStatus?.des || "-"}</strong>
                                        </div>

                                        <div className="report-field">
                                            <span>ប្រភេទភារកិច្ច</span>
                                            <strong>{task.type?.title || "-"}</strong>
                                        </div>

                                        <div className="report-field">
                                            <span>ផុតកំណត់</span>
                                            <strong>{formatDate(task.schedule)}</strong>
                                        </div>

                                        <div className="report-field">
                                            <span>ពេលបង្កើត</span>
                                            <strong>{task.created || "-"}</strong>
                                        </div>

                                        <div className="report-field">
                                            <span>ពេលកែប្រែ</span>
                                            <strong>{task.updated || "-"}</strong>
                                        </div>
                                    </div>

                                </div>
                            ))
                        )}

                        <div className="mobile-report-footer">
                            © LikaWorkNote
                            <strong>សរុបមានចំនួន៖ {tasks.length}</strong>
                        </div>
                    </div>
                    {/* DESKTOP AND PRINT REPORT */}
                    <div className="sim-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>ល.រ</th>
                                    <th>ចំណងជើង</th>
                                    <th>ស្ថានភាព</th>
                                    <th>ប្រភេទភារកិច្ច</th>
                                    <th>ផុតកំណត់</th>
                                    <th>ពេលបង្កើត</th>
                                    <th>ពេលកែប្រែ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="empty-cell">
                                            រកមិនឃើញទិន្នន័យសូមព្យាយាមវិធីផ្សេង
                                        </td>
                                    </tr>
                                ) : (
                                    tasks.map((task, index) => (
                                        <tr key={task.id ?? index}>
                                            <td className="tcenter">{index + 1}</td>
                                            <td>
                                                <strong>{task.title}</strong>
                                                <p className="des09stb">{task.des}</p>
                                            </td>
                                            <td>{task.taskStatus?.des || "-"}</td>
                                            <td>{task.type?.title || "-"}</td>
                                            <td>{formatDate(task.schedule)}</td>
                                            <td>{task.created || "-"}</td>
                                            <td>{task.updated || "-"}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>© LikaWorkNote</th>
                                    <th colSpan={7} style={{ textAlign: "right" }}>
                                        សរុបមានចំនួន៖ {tasks.length}
                                    </th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            )}
            <p className="leader-vs" style={{textAlign: 'center', opacity: '0.5', margin: '1rem auto', fontSize: '0.85rem'}}>Open source by <a href="/">vensoeng</a></p>
        </div>
    );
}

export default TaskTodayPage;