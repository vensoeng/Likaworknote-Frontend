import { useState, useEffect,  useMemo } from "react";
import getStatusClass from "../../config/getTaskStatusBackground";
import {formatDate} from "../../config/formatData";

import {
  Flash,
  Magicpen,
  FilterSearch,
  More,
  Edit,
  DiscountShape,
  ArrowLeft2,
  ArrowRight2,
  Stickynote
} from "iconsax-reactjs";

import WebLoader from "../../components/WebLoader";
import UIList from "../../components/task_list_UI_650px";
import TaskService from "../../services/taskService";
import type { Task } from "../../types/Task";
import TaskModel from "../../components/form/TaskModel";
import TaskFilterModel from "../../components/form/TaskFilterModel";
import {
  defaultTaskFilter,
  type TaskFilter,
} from "../../types/TaskFilter";

import "../../assets/css/table.css";
import "../../assets/css/task.css";
import TypeTaskService from "../../services/typeTaskService";
import CategoryService from "../../services/categoryService";
import StatusService from "../../services/status";
import ReminderService from "../../services/reminder";
import TelegramService from "../../services/telgramService";
import type { TypeTask } from "../../types/TypeTask";
import type { Category } from "../../types/category";
import type { Status } from "../../types/Status";
import type { Reminder } from "../../types/Reminder";
import type { Telegram } from "../../types/Telegram";

function TaskWebpage() {
  const COMPLETED_STATUS_ID = 1790072865066;
  const [loading, setLoading] = useState<boolean>(true);

  const [tasks, setTask] =
    useState<Task[]>([]);

  const [taskFilter, setTaskFilter] = useState<TaskFilter>(defaultTaskFilter);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [isFormOpen, setIsFormOpen] =
    useState(false);

  const [formMode, setFormMode] =
    useState<"create" | "edit">("create");

  const [selectedTask, setSelectedTask] =
    useState<Task| null>(null);

  //fetch for get category task
  const fetchTask = async () => {
    try {
      setLoading(true);

      const data =
        await TaskService.getTask();

      setTask(
        Array.isArray(data) ? data : []
      );
      console.log(data);

    } catch (error) {
      console.error(
        "Failed to fetch categories:",
        error
      );

      setTask([]);

    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setFormMode("create");
    setSelectedTask(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (
    task: Task
  ) => {
    setFormMode("edit");
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedTask(null);
  };

  const handleCategorySuccess = (
    task: Task
  ) => {
    if (formMode === "create") {
      // Add new category to table
      setTask((prev) => [
        task,
        ...prev,
      ]);

    } else {
      // Update existing category
      setTask((prev) =>
        prev.map((item) =>
          item.id === task.id
            ? task
            : item
        )
      );
    }
  };
  //delete action 
  const [textMsdelete,setTextMsdelete] = useState<string>('');
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const handleDeletetask = async (id: number) => {
    const confirmed = window.confirm(
      "តើអ្នកពិតជាចង់លុប Task នេះមែនទេ?"
    );

    if (!confirmed) {
      return;
    }
    
    try {
      setIsDelete(true)
      setTextMsdelete('សូមរងចាំយើងកំពុងព្យាយាមលុបទិន្នន័យដែលអ្នកបានស្មើរ!')
      await TaskService.deleteTask(id);

      setTask((prev) =>
        prev.filter((Task) => Task.id !== id)
      );

      setTextMsdelete('សំណើរលុបទិន្នន័យរបស់អ្នកបានជោគជ័យ!')
    } catch (error) {
      console.error("Failed to delete category:", error);
      alert("ការលុបមិនបានជោគជ័យទេ!");
    }finally{
      setIsDelete(false);
      console.log("Delete action completed.");
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

    // =========================
    // ALL DATA NEEDED 
    // =========================
    const [typs, setTypes] = useState<TypeTask[]>([]);
    const [categorys, setCategorys] = useState<Category[]>([]);
    const [statuses, setStatuses] = useState<Status[]>([]);
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [telegrams, setTelegrams] = useState<Telegram[]>([]);

  useEffect(() => {
    const loadAllData = async () => {
        try {
            const [
                typeRes,
                catRes,
                statRes,
                remRes,
                tgRes
            ] = await Promise.all([
                TypeTaskService.getTypeTask(),
                CategoryService.getCategories(),
                StatusService.getStatus(),
                ReminderService.getReminder(),
                TelegramService.getTelegram(),
            ]);
            console.log("Category:", catRes);
                // Extract Data
                const typesData = Array.isArray(typeRes) ? typeRes : (typeRes as any)?.data?.data || (typeRes as any)?.data || [];
                const catData = Array.isArray(catRes) ? catRes : (catRes as any)?.data?.data || (catRes as any)?.data || [];
                const statData = Array.isArray(statRes) ? statRes : (statRes as any)?.data?.data || (statRes as any)?.data || [];
                const remData = Array.isArray(remRes) ? remRes : (remRes as any)?.data?.data || (remRes as any)?.data || [];
                const tgData = Array.isArray(tgRes) ? tgRes : (tgRes as any)?.data?.data || (tgRes as any)?.data || [];

                setTypes(typesData);
                setCategorys(catData);

                setStatuses(statData);
                setReminders(remData);
                setTelegrams(tgData);
            } catch (error) {
              console.error(error);
          }
      };
      
      loadAllData();
  }, []);
  // =========================
  // FOR DATE
  // =========================
  const getEndOfToday = () => {
    const today = new Date();

    today.setHours(23, 59, 59, 999);

    return today;
  };
  // =========================
  // FILTER TASKS
  // =========================
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {

      // =====================================
      // SEARCH
      // =====================================

      const search =
        taskFilter.search.trim().toLowerCase();

      const matchesSearch =
        !search ||
        task.title?.toLowerCase().includes(search) ||
        task.des?.toLowerCase().includes(search);


      // =====================================
      // STATUS
      // =====================================

      const matchesStatus =
        taskFilter.statusIds.length === 0 ||
        taskFilter.statusIds.includes(
          Number(task.statuses_id)
        );


      // =====================================
      // CATEGORY
      // =====================================

      const matchesCategory =
        taskFilter.categoryIds.length === 0 ||
        taskFilter.categoryIds.includes(
          Number(task.category_id)
        );


      // =====================================
      // TYPE
      // =====================================

      const matchesType =
        taskFilter.typeIds.length === 0 ||
        taskFilter.typeIds.includes(
          Number(task.type_id)
        );


      // =====================================
      // SCHEDULE
      // =====================================

      // const matchesSchedule =
      //   taskFilter.scheduleIds.length === 0 ||
      //   taskFilter.scheduleIds.includes(
      //     Number(task.schedule_id)
      //   );
      const scheduleDate = task.schedule
        ? String(task.schedule).slice(0, 10)
        : "";

      if (
         taskFilter.scheduleFrom &&
        (!scheduleDate || scheduleDate <  taskFilter.scheduleFrom)
      ) {
        return false;
      }

      if (
         taskFilter.scheduleTo &&
        (!scheduleDate || scheduleDate >  taskFilter.scheduleTo)
      ) {
        return false;
      }

      // =====================================
      // CREATED DATE
      // =====================================

      const createdDate =
        new Date(task.created_at);

      const createdFromDate =
        taskFilter.createdFrom
          ? new Date(
              `${taskFilter.createdFrom}T00:00:00`
            )
          : null;

      const createdToDate =
        taskFilter.createdTo
          ? new Date(
              `${taskFilter.createdTo}T23:59:59.999`
            )
          : getEndOfToday();

      const matchesCreatedFrom =
        !createdFromDate ||
        createdDate >= createdFromDate;

      const matchesCreatedTo =
        !taskFilter.createdFrom &&
        !taskFilter.createdTo
          ? true
          : createdDate <= createdToDate;


      // =====================================
      // UPDATED DATE
      // =====================================

      const updatedDate =
        new Date(task.updated_at);

      const updatedFromDate =
        taskFilter.updatedFrom
          ? new Date(
              `${taskFilter.updatedFrom}T00:00:00`
            )
          : null;

      const updatedToDate =
        taskFilter.updatedTo
          ? new Date(
              `${taskFilter.updatedTo}T23:59:59.999`
            )
          : getEndOfToday();

      const matchesUpdatedFrom =
        !updatedFromDate ||
        updatedDate >= updatedFromDate;

      const matchesUpdatedTo =
        !taskFilter.updatedFrom &&
        !taskFilter.updatedTo
          ? true
          : updatedDate <= updatedToDate;


      // =====================================
      // RATE
      // =====================================

      const matchesRateFrom =
        taskFilter.rateFrom === "" ||
        Number(task.rate) >=
          Number(taskFilter.rateFrom);

      const matchesRateTo =
        taskFilter.rateTo === "" ||
        Number(task.rate) <=
          Number(taskFilter.rateTo);


      // =====================================
      // FINAL
      // =====================================

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory &&
        matchesType &&
        // matchesSchedule &&
        matchesCreatedFrom &&
        matchesCreatedTo &&
        matchesUpdatedFrom &&
        matchesUpdatedTo &&
        matchesRateFrom &&
        matchesRateTo
      );
    });

  }, [tasks, taskFilter]);

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(
    filteredTasks.length / itemsPerPage
  );

  const currentTasks = useMemo(() => {
    const startIndex =
      (currentPage - 1) * itemsPerPage;

    const endIndex =
      startIndex + itemsPerPage;

    return filteredTasks.slice(
      startIndex,
      endIndex
    );
  }, [
    filteredTasks,
    currentPage,
    itemsPerPage,
  ]);
  const handlePreviousPage = () => {
    setCurrentPage((prev) =>
      Math.max(prev - 1, 1)
    );
  };

  const handleNextPage = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, totalPages)
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    if (currentPage <= 3) {
      return [
        1,
        2,
        3,
        4,
        "...",
        totalPages,
      ];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  // =========================
  // FOR RESPONSIVE
  // =========================
  const screenWidth = window.innerWidth;

  return (
    <div className="admin-creators p-r admin-taskwp">
      {/* =========================
          MS for DELETE
      ========================= */}
      {isDelete && (
          <WebLoader>
           {textMsdelete}
          </WebLoader>
      )}
      {/* =========================
          FILTER MODAL
      ========================= */}

      {isFilterOpen && (
        <TaskFilterModel
          filter={taskFilter}
          onClose={() => setIsFilterOpen(false)}
          onApply={(newFilter) => {
            setTaskFilter(newFilter);
            setIsFilterOpen(false);
          }}
          statuses={statuses}
          categories={categorys}
          types={typs}
        />
      )}


      {/* =========================
          TASK FORM MODAL
      ========================= */}
      {isFormOpen && (
        <TaskModel
          onClose={handleCloseForm}
          onSuccess={handleCategorySuccess}
          mode={formMode}
          TaskItem={selectedTask}
          categories={categorys}
          types={typs}
          statuses={statuses}
          reminders={reminders}
          telegrams={telegrams}
        />
      )}

      {/* =========================
          ADMIN CONTENT
      ========================= */}
      <div className="admin-content">
        {/* =========================
            NAV
        ========================= */}
        <div className="adnav">
          <div className="adnav-head">
            <div className="adnvh-box df-s">
              <h2 className="df-l">
                <Flash
                  className="icon icon-sm over-h"
                />
                បញ្ជីនៃទិន្នន័យ
              </h2>
              {/* CREATE */}
              <button
                type="button"
                className="btn"
                onClick={handleOpenCreate}
              >
                <Magicpen />
                បន្ថែមភារកិច្ច
              </button>
            </div>
          </div>
          {/* =========================
              STAT / ACTION BOX
          ========================= */}
          <div className="adnv-box">
            <div className="adnvul scroll-x">
              {/* list  */}
              <div className="adnvul-row">
                <div className="adnvulrw-bx">
                  <div className="adnvulrwbxh df-l">
                    <Stickynote />
                    <h2>
                      ភារកិច្ចសរុប
                    </h2>
                  </div>
                  <div className="adnvulrw-con">
                    <blockquote>
                      <h2>
                        មានចំនួន {tasks.length}
                      </h2>
                      <p>
                        ធ្វើការបង្កើតភារកិច្ចដែលតាមអ្វីដែលអ្នកចង់បាន យើងសូមឱ្យអ្នកមានទម្លាប់ក្នុងការគ្រប់គ្រងការងារ។
                      </p>
                    </blockquote>
                  </div>
                  <div className="adnvulrw-action df-r">
                    <button
                      type="button"
                      className="btn"
                      onClick={handleOpenCreate}
                    >
                      <Magicpen />
                      បន្ថែមភារកិច្ច
                    </button>
                  </div>
                </div>
              </div>
              {/* list  */}
              <div className="adnvul-row">
                <div className="adnvulrw-bx">
                  <div className="adnvulrwbxh df-l">
                    <Stickynote />
                    <h2>
                      ច្រោះទិន្នន័យ
                    </h2>
                  </div>
                  <div className="adnvulrw-con">
                    <blockquote>
                      <h2>
                        ការណែនាំ
                      </h2>
                      <p>
                        សូមចុចបូតុងខាងក្រោមដើម្បីជ្រើសរើសការច្រោះទិន្នន័យដែលអ្នកចង់បាន។
                      </p>
                    </blockquote>
                  </div>
                  <div className="adnvulrw-action df-r">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => setIsFilterOpen(true)}
                    >
                      <FilterSearch
                        size="20"
                        variant="Linear"
                      />
                      ច្រោះទិន្នន័យ
                    </button>
                  </div>
                </div>
              </div>
              {/* end  */}
            </div>
          </div>
        </div>
        {/* =========================
            DATES
        ========================= */}
        {loading ? (
          <WebLoader>
              រង់ចាំបន្ដិចយើងកំពុងទាញយកទិន្នន័យ
              ដើម្បីដំណើរការ
          </WebLoader>
        ) : (
              <section
                className={screenWidth <= 650 ? 'rui65' : "tb-section db-c"}
                id={screenWidth <= 650 ? 'rui65-tb' : "main-tb"}
              >
                <div className="tb-section-body db-c">
              {/* =========================
                  MOBILE VIEW
              ========================= */}
              {screenWidth <= 650 ? (
                <div className="ui65 db-c">
                  {currentTasks.length === 0 ? (
                            <div
                                style={{
                                  textAlign: "center",
                                  padding: "30px",
                                  color: "#64748b",
                                }}
                              >
                                មិនមានទិន្នន័យភារកិច្ចឡើយ។
                            </div>
                          ) : (
                            currentTasks.map((d, index) => (
                              <UIList key={d.id || index}
                                title={String(d?.title)}
                                description={
                                  'ស្ថានភាព៖ ' + 
                                  String(statuses.find((e) => String(e.id) === String(d.statuses_id))?.des || "មិនបានបញ្ចូល")
                                  + ',' + ' '
                                  + 'ផុតកំណត់៖ ' +
                                  String(d?.schedule ? formatDate(String(d.schedule)) : "មិនបានបញ្ចូល")

                                }
                                backgroundColor={String(getStatusClass(Number(d.statuses_id)).bg)}
                                icon={String(getStatusClass(Number(d.statuses_id)).img)}
                                tableData={
                                  (
                                  <>
                                    <tr>
                                        <td>ចំណងជើង</td>
                                        <td>{d?.title}</td>
                                    </tr>
                                    <tr>
                                        <td>ការពិពណ៌នា</td>
                                        <td>{d?.des}</td>
                                    </tr>
                                    <tr>
                                        <td>ស្ថានភាព</td>
                                        <td>{statuses.find((e) => String(e.id) === String(d.statuses_id))?.des}</td>
                                    </tr>
                                    <tr>
                                        <td>ការងារ</td>
                                        <td>
                                          {categorys.find(
                                            (e) => String(e.id) === String(d.category_id)
                                          )?.title || "រកមិនឃើញ"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ប្រភេទភារកិច្ច</td>
                                        <td>
                                          {typs.find((e) => String(e.id) === String(d.type_id))?.title || "រកមិនឃើញ"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ផុតកំណត់</td>
                                        <td>{d?.schedule ? formatDate(String(d.schedule)) : "មិនបានបញ្ចូល"}</td>
                                    </tr>
                                    <tr>
                                        <td>ការរំលឹក</td>
                                        <td>{reminders.find((e) => String(e.id) === String(d.reminder_id))?.title || "រកមិនឃើញ"}</td>
                                    </tr>
                                    <tr>
                                        <td>ពេលបង្កើត</td>
                                        <td>{d?.created_at ? formatDate(String(d.created_at)) : "មិនបានបញ្ចូល"}</td>
                                    </tr>
                                    <tr>
                                        <td>ពេលកែប្រែ</td>
                                        <td>{d?.updated_at ? formatDate(String(d.updated_at)) : "មិនបានបញ្ចូល"}</td>
                                    </tr>
                                  </>
                                  )
                                }
                                onDelete={() => handleDeletetask(d.id)}
                                onEdit={() => handleOpenEdit(d)}
                              />
                            ))
                          )}
                </div>
              ) : (
                <div className="box">
                  <table>
                    <thead>
                      <tr>
                        <th>ចំណងជើង</th>
                        <th style={{ textAlign: "center", }}>ស្ថានភាព</th>
                        <th style={{ textAlign: "center", }}>ការងារ</th>
                        <th style={{ textAlign: "center", }}>ប្រភេទភារកិច្ច</th>
                        <th style={{ textAlign: "center", }}>លុបទិន្នន័យ</th>
                        <th style={{ textAlign: "center", }}>ម៉ឺនុយ</th>
                        <th style={{ textAlign: "center", }}>ផុតកំណត់</th>
                        <th style={{ textAlign: "center", }}>ការរំលឹក</th>
                        <th style={{ textAlign: "center", }}>គណនីតេលេក្រាម</th>
                        <th>ពេលវេលា</th>
                        <th>សកម្មភាព</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentTasks.length === 0 ? (
                        <tr>
                          <td
                            colSpan={11}
                            style={{
                              textAlign: "center",
                              padding: "30px",
                              color: "#64748b",
                            }}
                          >
                            មិនមានទិន្នន័យភារកិច្ចឡើយ។
                          </td>
                        </tr>
                      ) : (
                        currentTasks.map((d, index) => (
                          <tr
                            key={d.id || index}
                          >
                            {/* TITLE */}
                            <td>
                              <div className="box df-l task-title-box">
                                <div className="text">
                                  <h2>
                                    {d.title}
                                  </h2>
                                  <blockquote>
                                    <p>
                                      {d.des}
                                    </p>
                                  </blockquote>
                                  <div className="dt-status df-s">
                                    <div className="icon icon-sm txt-be">
                                      <DiscountShape />
                                    </div>
                                    <span className="add-rate"
                                      style={
                                        String(d?.statuses_id) !== String(COMPLETED_STATUS_ID)
                                          ? { width: `${d?.rate}%` }
                                          : { width: `100%` }
                                      }></span>
                                    <p className="rate">{d.rate}</p>
                                  </div>
                                </div>
                              </div>
                            </td>
                            {/* this is status work */}
                            <td style={{ textAlign: "center" }}>
                              <p className="btn btn-task-status btn-sts-true" style={{ backgroundColor: getStatusClass(Number(d.statuses_id)).bg, }}>{statuses.find((e) => String(e.id) === String(d.statuses_id))?.des}</p>
                            </td>
                            {/* this is category work */}
                            <td style={{ textAlign: "center", }}>
                              {categorys.find(
                                (e) => String(e.id) === String(d.category_id)
                              )?.title || "រកមិនឃើញ"}
                            </td>
                            {/* this is type  */}
                            <td style={{ textAlign: "center", }}>
                              {typs.find((e) => String(e.id) === String(d.type_id))?.title || "រកមិនឃើញ"}
                            </td>
                            {/* DELETE */}
                            <td
                              style={{
                                textAlign: "center",
                              }}
                            >
                              <button
                                type="button"
                                className="bg-n"
                              >
                                <div className="btn btn-ra btn-delete"
                                  onClick={() => handleDeletetask(d.id)}
                                >
                                  <span>
                                    លុបភារកិច្ច
                                  </span>
                                </div>
                              </button>
                            </td>
                            {/* MENU */}
                            <td
                              style={{
                                textAlign: "center",
                              }}
                            >
                              <button
                                type="button"
                                className="btn btn-ra icon-ra-sm btn-status"
                                onClick={() =>
                                  handleOpenEdit(d)
                                }
                              >
                                <span>
                                  <More />
                                </span>
                              </button>
                            </td>
                            {/* sch  */}
                            <td style={{ textAlign: "center", }}>
                              <p className="btn btn-task-status">
                                {d?.schedule ? formatDate(String(d.schedule)) : "មិនបានបញ្ចូល"}
                              </p>
                            </td>
                            {/* reminder  */}
                            <td style={{ textAlign: "center", }}>
                              <p className="btn btn-task-status">
                                {reminders.find((e) => String(e.id) === String(d.reminder_id))?.title || "រកមិនឃើញ"}
                              </p>
                            </td>
                            {/* telegram  */}
                            <td style={{ textAlign: "center", }}>
                              {telegrams.find((e) => String(e.id) === String(d.telegram_id))?.title || "មិនបានជ្រើស"}
                            </td>
                            {/* DATE */}
                            <td>
                              {new Date(
                                d.created_at
                              ).toLocaleDateString(
                                "kh-KH",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </td>
                            {/* EDIT */}
                            <td>
                              <button
                                type="button"
                                className="df-c btn-edit-action"
                                onClick={() =>
                                  handleOpenEdit(d)
                                }
                              >
                                <span>
                                  កែប្រែ
                                </span>
                                <Edit size="16" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
                  {/* this is footer  */}
                  <div className="tb-foot">
                    <div className="box df-c">

                      <button
                        type="button"
                        className="icon icon-ra icon-ra-sm over-h right-05"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                      >
                        <ArrowLeft2 />
                      </button>

                      <ul className="df-c">
                        {getPageNumbers().map((page, index) => {

                          if (page === "...") {
                            return (
                              <li
                                key={`dots-${index}`}
                                className="more df-c icon-ra-sm"
                              >
                                ...
                              </li>
                            );
                          }

                          return (
                            <li
                              key={page}
                              className={`btn icon-ra-sm ${currentPage === page
                                  ? "active"
                                  : ""
                                }`}
                              onClick={() =>
                                handlePageChange(Number(page))
                              }
                            >
                              <span>
                                {String(page).padStart(2, "0")}
                              </span>
                            </li>
                          );
                        })}
                      </ul>

                      <button
                        type="button"
                        className="icon icon-ra icon-ra-sm over-h left-05"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                      >
                        <ArrowRight2 />
                      </button>

                    </div>
                  </div>
                  {/* end  */}
                </div>
              </section>
      )}
      </div>
    </div>
  );
}

export default TaskWebpage;