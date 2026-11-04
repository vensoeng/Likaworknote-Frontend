import { useState, useEffect } from "react";
import FormLayout from "../form_layout";
import TaskService from "../../services/taskService";
import WebLoader from "../WebLoader";

import type { Task } from "../../types/Task";
import type { Category } from "../../types/category";
// import type { Telegram } from "../../types/Telegram";
import type { Status } from "../../types/Status";
// import type { Reminder } from "../../types/Reminder";
import type { TypeTask } from "../../types/TypeTask";


interface FormModalProps {
    onClose: () => void;
    onSuccess: (Task: Task) => void;

    mode: "create" | "edit";
    TaskItem: Task | null;

    types: TypeTask[];
    categories: Category[];
    statuses: Status[];
    // reminders: Reminder[];
    // telegrams: Telegram[];
}


export default function TaskModel({
    onClose,
    onSuccess,
    mode,
    TaskItem,
    types,
    categories,
    statuses,
    // reminders,
    // telegrams,
}: FormModalProps) {

    // =========================
    // FORM STATE
    // =========================

    const [title, setTitle] = useState("");
    const [des, setDes] = useState("");

    const [typee, setTypee] = useState<number | "">("");
    const [category, setCategory] = useState<number | "">("");
    const [statuse, setStatuse] = useState<number | "">("");
    const [schedule, setSchedule] = useState("");
    const [rate, setRate] = useState<number | "">(0);
    
    const [submitting, setSubmitting] =
        useState(false);

    const [textSMS, setTextSMS] = useState<string>('');

    // =========================
    // DAT FOR INPUT
    // =========================
    const toDateInputValue = (
        value?: string | Date | number | null
        ): string => {
        if (!value) return "";

        const date = value instanceof Date
            ? value
            : new Date(value);

        if (Number.isNaN(date.getTime())) return "";

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        if (mode === "edit" && TaskItem) {
            setTitle(
                TaskItem.title ?? ""
            );
            setDes(
                TaskItem.des ?? ""
            );
            setTypee(
                TaskItem.type_id ? Number(TaskItem.type_id) : ""
            );
            setCategory(
                TaskItem.category_id ? Number(TaskItem.category_id) : ""
            );
            setStatuse(
                TaskItem.statuses_id ? Number(TaskItem.statuses_id) : ""
            );
            setRate(
                TaskItem.rate != null ? Number(TaskItem.rate) : 0
            );
            setSchedule(
                toDateInputValue(TaskItem.schedule)
            );
        }

        if (mode === "create") {
            setTitle("");
            setDes("");

            setTypee(types[0]?.id ?? "");
            setCategory(categories[0]?.id ?? "");
            setStatuse(statuses[0]?.id ?? "");
            // setReminder(reminders[0]?.id ?? "");
            // setTelegram(telegrams[0]?.id ?? "");

            setRate(0);
            setSchedule("");
        }
    }, [
        mode,
        TaskItem,
        types,
        categories,
        statuses,
        // reminders,
        // telegrams,
    ]);
    // =========================
    // SUBMIT
    // =========================

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {
        setSubmitting(true);

        let savedTask: Task;

        // =========================
        // CREATE
        // =========================

        if (mode === "create") {
            setTextSMS('យើងកំពុងបង្កើតសំណើររបស់អ្នក')
            console.log("===== BEFORE CREATE =====");
            console.log({
                title,
                des,
                type_id: typee,
                category_id: category,
                statuses_id: statuse,
                // reminder_id: reminder,
                // telegram_id: telegram,
                rate,
            });

            savedTask =
            await TaskService.createTask({
                title,
                des,
                type_id: typee,
                category_id: category,
                statuses_id: statuse,
                // reminder_id: reminder,
                // telegram_id: telegram,
                schedule,
                rate,
            });
            

        }

        // =========================
        // EDIT
        // =========================

        else {
            setTextSMS('យើងកំពុងកែប្រែតាមសំណើររបស់អ្នក')
            if (!TaskItem) {
            throw new Error(
                "Task is required for edit"
            );
            }

            savedTask =
            await TaskService.updateTask(
                TaskItem.id,
                {
                    title,
                    des,
                    type_id: typee,
                    category_id: category,
                    statuses_id: statuse,
                    // reminder_id: reminder,
                    // telegram_id: telegram,
                    rate,
                    schedule,
                }
            );

        }

        // Tell Admin page
        // save was successful

        onSuccess(savedTask);

        // Close modal

        onClose();

        } catch (error: any) {
            // console.error("========== CREATE TASK ERROR ==========");

            // console.error(
            //     "STATUS:",
            //     error.response?.status
            // );

            // console.error(
            //     "RESPONSE DATA:",
            //     JSON.stringify(
            //         error.response?.data,
            //         null,
            //         2
            //     )
            // );

            console.error(
                "ERRORS:",
                JSON.stringify(
                    error.response?.data?.errors,
                    null,
                    2
                )
            );

            // console.error(
            //     "REQUEST DATA:",
            //     error.config?.data
            // );

            // console.error(
            //     "REQUEST HEADERS:",
            //     error.config?.headers
            // );

            // console.error("======================================");

            alert(
                error.response?.data?.message ||
                "មានបញ្ហាក្នុងការបញ្ជូនទិន្នន័យ"
            );
        } finally {

        setSubmitting(false);

        }
    };

    useEffect(() => {
        console.log("statuse STATE:", statuse);
    }, [statuse]);

    // UI
    // =========================
    // const fetchData = async <T,>(
    //     fetchFn: () => Promise<T[]>,
    //     setter: React.Dispatch<React.SetStateAction<T[]>>,
    //         entityName: string
    //         ) => {
    //         try {
    //             const data = await fetchFn();
    //             setter(Array.isArray(data) ? data : []);
    //     } catch (error) {
    //         console.error(`Failed to fetch ${entityName}:`, error);
    //         setter([]);
    //     }
    // };

    
    return (

        <FormLayout
        title={
            mode === "create"
            ? "បង្កើតភារកិច្ច"
            : "កែប្រែភារកិច្ច"
        }
        onClose={onClose}
        formId="category-form"
        submitting={submitting}
        >
            {submitting && (
                <WebLoader>{textSMS}</WebLoader>
            )}
        {/* =========================
            STATUS
        ========================= */}  
        <div className="wbfmta">
            <div className="wbfmta-bx btn">
                <select name="status" id="form-status-select" disabled>
                    <option value="true">សាធារណៈ</option>
                    <option value="false">ឯកជនភាព</option>
                </select>
            </div>
        </div>
        {/* =========================
            FORM
        ========================= */}
        <form
            className="wbfmcn scroll-y"
            id="category-form"
            onSubmit={handleSubmit}
        >
            <div className="wbfmcn-bx">
                {/* TITLE */}
                <div className="txt-in">
                    <div className="txtin-bx">
                        <label htmlFor="txt-title">
                            ចំណងជើង
                        </label>
                        <div className="txtin-bx">
                            <input
                                type="text"
                                className="txt-title"
                                id="txt-title"
                                placeholder="សូមបញ្ចូលចំណងជើង"
                                required
                                value={title}
                                onChange={(e) =>
                                    setTitle(e.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>
                {/* DESCRIPTION */}
                <div className="txt-caption txtin-bx">
                    <label htmlFor="des">
                        ការពិពណ៌នា
                    </label>
                    <div className="txt-caption-box">
                        <textarea
                            name="des"
                            id="des"
                            cols={30}
                            rows={1}
                            placeholder="សរសេរការពិពណ៌នា"
                            value={des}
                            onChange={(e) => {
                                setDes(e.target.value);
                                const parent =
                                    e.currentTarget.parentElement;
                                if (parent) {
                                    parent.dataset.replicatedValue =
                                        e.target.value;
                                }
                            }}
                        />
                    </div>
                    <p className="tcpn">
                        ច្រើនបំផុត២៥០អក្សរ
                    </p>
                </div>
                {/* TASK STATUS  */}
                <div className="txt-in">
                    <div className="txtin-bx">
                        <label htmlFor="sl-status">
                            ជ្រើរើសស្ថានភាពការងារ
                        </label>
                        <div className="txtin-bx">
                            <select
                                name="sl-status"
                                id="sl-status"
                                value={statuse}
                                onChange={(e) => {
                                    setStatuse(Number(e.target.value));
                                }}
                            >
                                {[...statuses].reverse().map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.des}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                {/* CATEGORY WORK  */}
                <div className="txt-in">
                    <div className="txtin-bx">
                        <label htmlFor="sl-category">
                            ជ្រើរើសការងារ
                        </label>
                        <div className="txtin-bx">
                            <select name="sl-category" id="sl-category" 
                                value={category}
                               onChange={(e) => setCategory(Number(e.target.value))}
                            >
                                {categories.length === 0 ? (
                                    <option value="">មិនមាន</option>
                                ) : (
                                    [...categories].reverse().map((item, index) => (
                                        <option key={item.id || index} value={item.id}>
                                            {item.title}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                    </div>
                </div>
                {/* TYPE OF TASK */}
                <div className="txt-in">
                    <div className="txtin-bx">
                        <label htmlFor="sl-type">
                            ជ្រើរើសប្រភេទភារកិច្ច
                        </label>
                        <div className="txtin-bx">
                            <select name="sl-type" id="sl-type"
                            value={typee}
                            onChange={(e) =>
                                setTypee(Number(e.target.value))
                            }>
                                {types.length === 0 ? (
                                    <option value="">មិនមាន</option>
                                ) : (
                                    [...types].reverse().map((item, index) => (
                                        <option key={item.id || index} value={item.id}>
                                            {item.title}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                    </div>
                </div>
                {/* REMANDER  */}
                <div className="txt-in">
                    <div className="txtin-bx">
                        <label htmlFor="slSched">
                            ជ្រើរើសកាផុតកំណត់ការងារ
                        </label>
                        <label className="txtin-bx" htmlFor="slSched">
                            <input
                                id="slSched"
                                type="date"
                                className="txt-title"
                                value={schedule}
                                onChange={(e) => setSchedule(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                </div>
                {/* TATE WORK  */}
                <div className="txt-in">
                    <div className="txtin-bx">
                        <label htmlFor="txt-rate">
                            ភាគរយនៃការងារ
                        </label>
                        <div className="txtin-bx">
                            <input
                                type="number"
                                className="txt-title"
                                id="txt-rate"
                                placeholder="សូមបញ្ចូលភាគរយការងារដែលសម្រេច"
                                max="100"
                                value={rate}
                                onChange={(e) =>
                                    setRate(Number(e.target.value))
                                }
                            />
                        </div>
                    </div>
                </div>
                {/* FOOT  */}
            </div>
        </form>

        </FormLayout>
    );
}