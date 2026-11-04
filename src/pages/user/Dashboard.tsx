import { NavLink } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect} from 'react';

import {getCurrentDate} from '../../config/formatData';

import TypeTaskService from "../../services/typeTaskService";
// import TelegramService from "../../services/telgramService";
import type { TypeTask } from "../../types/TypeTask";
// import type { Telegram } from "../../types/Telegram";


import CategoryService from "../../services/categoryService";
import WebLoader from '../../components/WebLoader';
import ShareModal from '../../components/share_model';
import type { Category } from '../../types/category';

import { 
  Setting2,
  // Star,
  Flash,
  MainComponent,
  Magicpen,
  Stickynote,
  BrifecaseTimer,
  Send2,
  Timer,
  Eye,
  Link1,
  Global
} from "iconsax-reactjs";
import '../../assets/css/dashboard.css';
import TaskService from '../../services/taskService';
import type { Task } from '../../types/Task';
import UIList from '../../components/task_list_UI_650px';
import SupportImage from '../../assets/img/support.png';

function Dashboard() {
  const { user, loading } = useAuth();
  const currentDate = getCurrentDate();

  // const getProfileImage = (imagePath: string | null | undefined) => {
  //   if (!imagePath) return DEFAULT_AVATAR;
  //   if (imagePath.startsWith("http")) return imagePath;
  //   return `${VITE_API_URL}${STORAGE_URL}${imagePath}`;
  // };

  const [tasks, setTask] =
    useState<Task[]>([]);
  const [tasksToday, setTasksToday] = useState<Task[]>([]);

  const [completedCounts, setCompletedCounts] =
    useState({
      today: 0,
      week: 0,
      month: 0,
      year: 0,
    });
  // =========================
  // TASK FILTER CONSTANTS
  // =========================
  const IN_PROGRESS_STATUS_ID = 1790072831425;

  // const TODAY_SCHEDULE_ID = 1789618173166;
  // const TOMORROW_SCHEDULE_ID = 1789618192370;
  const COMPLETED_STATUS_ID = 1790072865066;

  // =========================
  // DATE KEY "YYYY-MM-DD" (local time)
  // Works with "2026-10-29" and "2026-10-26T07:35:51.185Z"
  // =========================
  const toDateKey = (value?: string | Date | null): string | null => {
    if (!value) return null;
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value.trim())) {
      return value.trim(); // already a plain date
    }
    const date = new Date(value);
    if (isNaN(date.getTime())) return null;
    return date.toLocaleDateString("en-CA"); // "2026-10-27"
  };

  // =========================
  // FILTER DASHBOARD TASKS (by schedule)
  // =========================
  const DEFAULT_STATUS_ID = 1790072790734;

  const filterTodayTasks = (taskList: Task[]) => {
    const today = toDateKey(new Date());

    return taskList.filter((task) => {
      const statusId = Number(task.statuses_id);

      // 1. Completed -> show only if completed today
      if (statusId === COMPLETED_STATUS_ID) {
        return toDateKey(task.updated_at) === today;
      }

      // Only Default / In Progress are "to do"
      const isActiveStatus =
        statusId === DEFAULT_STATUS_ID ||
        statusId === IN_PROGRESS_STATUS_ID;

      if (!isActiveStatus) return false;

      const planKey = toDateKey(task.schedule) || toDateKey(task.created_at);
      
      return !!planKey && !!today && planKey <= today;
    });
  };


  // =========================
  // FETCH TASKS
  // =========================
  const fetchTask = async () => {
    try {
      const data = await TaskService.getTask();
      const taskList = Array.isArray(data) ? data : [];
      // All tasks
      setTask(taskList);

      // Dashboard tasks
      const filteredTasks = filterTodayTasks(taskList);
      setTasksToday(filteredTasks);
      // console.log(filteredTasks);
      // console.log( "All Tasks:",taskList);
      // console.log("Dashboard Tasks:", filteredTasks );
      setCompletedCounts(getCompletedTaskCounts(taskList))

    } catch (error) {
      console.error(
        "Failed to fetch tasks:",
        error
      );
      setTask([]);
      setTasksToday([]);
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
  // const [telegrams, setTelegrams] = useState<Telegram[]>([]);

  useEffect(() => {
    const loadAllData = async () => {
        try {
            const [
                typeRes,
                catRes,
                // tgRes
            ] = await Promise.all([
                TypeTaskService.getTypeTask(),
                CategoryService.getCategories(),
                // TelegramService.getTelegram(),
            ]);
              // Extract Data
              const typesData = Array.isArray(typeRes) ? typeRes : (typeRes as any)?.data?.data || (typeRes as any)?.data || [];
              const catData = Array.isArray(catRes) ? catRes : (catRes as any)?.data?.data || (catRes as any)?.data || [];
              // const tgData = Array.isArray(tgRes) ? tgRes : (tgRes as any)?.data?.data || (tgRes as any)?.data || [];
              setTypes(typesData);
              setCategorys(catData);
              // setTelegrams(tgRes);
            } catch (error) {
              console.error(error);
          }
      };
      
      loadAllData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  //=======================
  //Fillter count task category 
  //=======================
  const filterCategoryCount = (categoryId: string | number, taskList: Task[] = []) => {
    if (!categoryId || !taskList) return 0;
    return taskList.filter(
      (task) => String(task.category_id) === String(categoryId)
    ).length;
  };

  // =========================
  // COMPLETED TASK COUNTS
  // =========================
  const currentDay = new Date().toISOString().split("T")[0];
  const getCompletedTaskCounts = (taskList: Task[]) => {
    const completedTasks = taskList.filter(
      (task) =>
        Number(task.statuses_id) === COMPLETED_STATUS_ID
    );

    const today = new Date();

    // -------------------------
    // Today
    // -------------------------
    const isSameDay = (
      dateValue: string | Date,
      targetDate: Date
    ) => {
      const date = new Date(dateValue);

      return (
        date.getFullYear() === targetDate.getFullYear() &&
        date.getMonth() === targetDate.getMonth() &&
        date.getDate() === targetDate.getDate()
      );
    };

    // -------------------------
    // Start of this week
    // Monday
    // -------------------------
    const startOfWeek = new Date(today);

    const day = startOfWeek.getDay();

    const diffToMonday =
      day === 0 ? 6 : day - 1;

    startOfWeek.setDate(
      startOfWeek.getDate() - diffToMonday
    );

    startOfWeek.setHours(0, 0, 0, 0);

    // -------------------------
    // End of this week
    // -------------------------
    const endOfWeek = new Date(startOfWeek);

    endOfWeek.setDate(
      endOfWeek.getDate() + 7
    );

    // -------------------------
    // Start of this month
    // -------------------------
    const startOfMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    // -------------------------
    // Start of next month
    // -------------------------
    const startOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    );

    // -------------------------
    // Start of this year
    // -------------------------
    const startOfYear = new Date(
      today.getFullYear(),
      0,
      1
    );

    // -------------------------
    // Start of next year
    // -------------------------
    const startOfNextYear = new Date(
      today.getFullYear() + 1,
      0,
      1
    );

    // -------------------------
    // Filter by updated_at
    // -------------------------
    const completedToday = completedTasks.filter(
      (task) =>
        task.updated_at &&
        isSameDay(task.updated_at, today)
    );

    const completedThisWeek = completedTasks.filter(
      (task) => {
        if (!task.updated_at) return false;

        const date = new Date(task.updated_at);

        return (
          date >= startOfWeek &&
          date < endOfWeek
        );
      }
    );

    const completedThisMonth = completedTasks.filter(
      (task) => {
        if (!task.updated_at) return false;

        const date = new Date(task.updated_at);

        return (
          date >= startOfMonth &&
          date < startOfNextMonth
        );
      }
    );

    const completedThisYear = completedTasks.filter(
      (task) => {
        if (!task.updated_at) return false;

        const date = new Date(task.updated_at);

        return (
          date >= startOfYear &&
          date < startOfNextYear
        );
      }
    );

    return {
      today: completedToday.length,
      week: completedThisWeek.length,
      month: completedThisMonth.length,
      year: completedThisYear.length,
    };
  };

  // =========================
  // SHARE MODEL
  // =========================
  const [showShare, setShowShare] = useState(false);
  const WEB_URL = window.location.origin;
  const [shareUrl, setShareUrl] = useState<any>('');

  // =========================
  // FOR RESPONSIVE
  // =========================
  const screenWidth = window.innerWidth;

  return (
    <div className='admin-dashboard'>
      {/* =========================
        SHARE MODEL
      ========================= */}
      <ShareModal
          isOpen={showShare}
          url={shareUrl}
          onClose={() => setShowShare(false)}
      />
      {/* <Form /> */}
      <div className='admin-content sa'>
        {user && (
        <div className='adincard'>
          <div className='box'>
            <div className='pr-main'>
              <div className='pr-img'>
                <img
                  className='img-c'
                  src='/li1.png'
                  width={35}
                  alt="User profile"
                />
              </div>
            </div>
            <div className='sub'>
              <div className='sub-box'>
                <h2>ទិវាសួស្ដី {user.firstName} {user.lastName}👋</h2>
                <div className='adincard-action df-s'>
                  <p>
                    {currentDate.khmer}<br/>
                   <span>{currentDate.english}</span></p>
                  {/* <NavLink to={`/task/${user?.username}/${currentDay}`} className='btn'>
                    បញ្ចប់ថ្ងៃនេះ
                    <Stickynote/>
                  </NavLink> */}
                </div>
              </div>
            </div>
            <div className='adincardbox-action'>
              <NavLink to='/user/setting' className='icon icon-sm df-c over-h'>
                <Setting2 />
              </NavLink>
            </div>
          </div>
        </div>
        )}
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
            </div>
          </div>
          {/* =========================
              STAT / ACTION BOX
          ========================= */}
          <div className="adnv-box nall05">
            <div className="adnvul scroll-x">
              {/* list  */}
              <div className="adnvul-row">
                <div className="adnvulrw-bx">
                  <div className="adnvulrwbxh df-l">
                    <Stickynote />
                    <h2>
                      ភារកិច្ចទាំងអស់
                    </h2>
                  </div>
                  <div className="adnvulrw-con">
                    <blockquote>
                      <h2>{tasks?.length}</h2>
                    </blockquote>
                  </div>
                  <div className="adnvulrw-action df-r">
                    <NavLink to='/tasks'
                      type="button"
                      className="btn"
                    >
                      <Magicpen />
                      បន្ថែមភារកិច្ច
                    </NavLink>
                  </div>
                </div>
              </div>
              {/* list  */}
              <div className="adnvul-row">
                <div className="adnvulrw-bx">
                  <div className="adnvulrwbxh df-l">
                    <MainComponent />
                    <h2>
                      ប្រភេទការងារ
                    </h2>
                  </div>
                  <div className="adnvulrw-con">
                    <blockquote>
                      <h2>{categorys?.length}</h2>
                    </blockquote>
                  </div>
                  <div className="adnvulrw-action df-r">
                    <NavLink to='/type/tasks'
                      type="button"
                      className="btn"
                    >
                      <Magicpen />
                      បន្ថែមប្រភេទ
                    </NavLink>
                  </div>
                </div>
              </div>
              {/* this is list  */}
              <div className="adnvul-row">
                <div className="adnvulrw-bx">
                  <div className="adnvulrwbxh df-l">
                    <BrifecaseTimer />
                    <h2>
                      ប្រភេទភារកិច្ច
                    </h2>
                  </div>
                  <div className="adnvulrw-con">
                    <blockquote>
                      <h2>{typs?.length}</h2>
                    </blockquote>
                  </div>
                  <div className="adnvulrw-action df-r">
                    <NavLink to='/category/tasks'
                      type="button"
                      className="btn"
                    >
                      <Magicpen />
                      បន្ថែមការងារ
                    </NavLink>
                  </div>
                </div>
              </div>
              {/* this is list  */}
              <div className="adnvul-row">
                <div className="adnvulrw-bx">
                  <div className="adnvulrwbxh df-l">
                    <Send2 />
                    <h2>
                      គណនីតេលេក្រាម
                    </h2>
                  </div>
                  <div className="adnvulrw-con">
                    <blockquote>
                      <h2>0</h2>
                    </blockquote>
                  </div>
                  <div className="adnvulrw-action df-r">
                    <NavLink to='/user/setting'
                      type="button"
                      className="btn"
                    >
                      <Magicpen />
                      បន្ថែមគណនី
                    </NavLink>
                  </div>
                </div>
              </div>
              {/* end  */}
            </div>
          </div>
        </div>
        {/* =========================
          TASK TODAY
        ========================= */}
        <div className="tkt">
          <div className="tkt-bx">
            {/* this is header  */}
            <div className="tkt-h">
              <div className="tkth-bx df-s">
                <div className="df-l">
                  <div className="icon icon-ra icon-sm">
                    <Timer/>
                  </div>
                  <h2>កិច្ចការត្រូវធ្វើក្នុងថ្ងៃនេះ</h2>
                </div>
                <p className="result btn">
                  សរុប:<strong>{tasksToday.length}</strong>,
                  បានសម្រេច:<strong>{tasksToday.filter(t => Number(t?.statuses_id) === COMPLETED_STATUS_ID).length}</strong>
                </p>
              </div>
            </div>
            {/* content  */}
            <div className="tkt-c">
              <div className="tktc-bx">
                <ul>
                  {tasksToday.length === 0 ? (
                    <li 
                    className='df-c'
                    style={{
                      textAlign: "center",
                      padding: "30px",
                      color: "#64748b",
                    }}
                    >
                      មិនមានទិន្នន័យកិច្ចការត្រូវធ្វើក្នុងថ្ងៃនេះទេ!
                    </li>
                  ) : (    
                  tasksToday.map((d, index) => (
                    <li className='df-s' key={index}>
                      <div className="txt df-l">
                        {/* icon  */}
                        <div
                          className={
                            String(d?.statuses_id) === String(COMPLETED_STATUS_ID)
                              ? 'icon icon-ra icon-sm active'
                              : 'icon icon-ra icon-sm'
                          }
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/></svg>
                        </div>
                        <h2>{d.title}</h2>
                      </div>
                      <div className="rate btn">
                        <p>សម្រេច{String(d?.statuses_id) == String(COMPLETED_STATUS_ID) ?  '100' : d.rate}%</p>
                      </div>
                    </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
            {/* footer */}
            <div className="tkt-f">
              <div className="tktf-bx df-c">
                <NavLink to={'/task/today/' + user?.id} className="btn">របាយការណ៍</NavLink>
              </div>
            </div>
          </div>
        </div>
        {/* =========================
          TASK COMPLATE
        ========================= */}
        <div className="adnav">
          <div className="adnav-head">
            <div className="adnvh-box df-s">
              <h2 className="df-l">
                <Flash
                  className="icon icon-sm over-h"
                />
                ភារកិច្ចដែលបានសម្រេច
              </h2>
            </div>
          </div>
          {/* =========================
              STAT / ACTION BOX
          ========================= */}
          <div className="adnv-box ncl05">
            <div className="adnvul scroll-x">
              {/* list  */}
              <div className="adnvul-row">
                <div className="adnvulrw-bx">
                  <div className="adnvulrwbxh df-l">
                    <Stickynote />
                    <h2>
                      ភារកិច្ចថ្ងៃនេះ
                    </h2>
                  </div>
                  <div className="adnvulrw-con">
                    <blockquote>
                      <h2>{completedCounts.today}</h2>
                    </blockquote>
                  </div>
                  <div className="adnvulrw-action df-r">
                    <NavLink to={`/task/${user?.username}/${currentDay}`}
                      type="button"
                      className="btn"
                    >
                      <Global />
                      ពិនិត្យ
                    </NavLink>
                  </div>
                </div>
              </div>
              {/* list  */}
              <div className="adnvul-row">
                <div className="adnvulrw-bx">
                  <div className="adnvulrwbxh df-l">
                    <MainComponent />
                    <h2>
                      ភារកិច្ចសប្តាហ៍នេះ
                    </h2>
                  </div>
                  <div className="adnvulrw-con">
                    <blockquote>
                      <h2>{completedCounts.week}</h2>
                    </blockquote>
                  </div>
                  <div className="adnvulrw-action df-r">
                    <NavLink to={'/task/week/' + user?.id}
                      type="button"
                      className="btn"
                    >
                      <Global />
                      ពិនិត្យ
                    </NavLink>
                  </div>
                </div>
              </div>
              {/* this is list  */}
              <div className="adnvul-row">
                <div className="adnvulrw-bx">
                  <div className="adnvulrwbxh df-l">
                    <BrifecaseTimer />
                    <h2>
                      ភារកិច្ចខែនេះ
                    </h2>
                  </div>
                  <div className="adnvulrw-con">
                    <blockquote>
                      <h2>{completedCounts.month}</h2>
                    </blockquote>
                  </div>
                  <div className="adnvulrw-action df-r">
                    <NavLink to={'/task/month/' + user?.id}
                      type="button"
                      className="btn"
                    >
                      <Global />
                      ពិនិត្យ
                    </NavLink>
                  </div>
                </div>
              </div>
              {/* this is list  */}
              <div className="adnvul-row">
                <div className="adnvulrw-bx">
                  <div className="adnvulrwbxh df-l">
                    <Send2 />
                    <h2>
                      ភារកិច្ចឆ្នាំនេះ
                    </h2>
                  </div>
                  <div className="adnvulrw-con">
                    <blockquote>
                      <h2>{completedCounts.year}</h2>
                    </blockquote>
                  </div>
                  <div className="adnvulrw-action df-r">
                    <NavLink to={'/task/year/' + user?.id}
                      type="button"
                      className="btn"
                    >
                      <Global />
                      ពិនិត្យ
                    </NavLink>
                  </div>
                </div>
              </div>
              {/* end  */}
            </div>
          </div>
        </div>
        {/* =========================
          TASK SHARING 
        ========================= */}
        <div className="adnav">
          <div className="adnav-head">
            <div className="adnvh-box df-s">
              <h2 className="df-l">
                <Flash
                  className="icon icon-sm over-h"
                />
                ចំនួនបែងចែកភារកិច្ច
              </h2>
            </div>
          </div>
        </div>
        {loading ? (
          <WebLoader>
            រង់ចាំបន្ដិចយើងកំពុងទាញយកទិន្នន័យ
            ដើម្បីដំណើរការ
          </WebLoader>
        ) : 
          screenWidth <= 650 ? (
          <div className="ui65 db-c">
            {categorys.length === 0 ? (
              <div
              style={{
                textAlign: "center",
                padding: "30px",
                color: "#64748b",
              }}
              >មិនមានទិន្នន័យបែងចែកភារកិច្ចឡើយ។</div>
              ) : (
              categorys.map((d, index) => (
                <UIList
                  key={d.id || index}
                  title={String(d.title)}
                  description={`មានចំនួន ${filterCategoryCount(d.id, tasks)}`}
                  icon='/report.png'
                />
              ))
            )}
            </div>
          ) : (
          <section
            className="tb-section db-c task-action-section"
            id="main-tb"
          >
            <div className="tb-section-body db-c">
              <div className="box">
                <table>
                  <thead>
                    <tr>
                      <th>ចំណងជើង</th>
                      <th style={{textAlign: "right", }}>សកម្មភាព</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categorys.length === 0 ? (
                      <tr>
                        <td
                          colSpan={2}
                          style={{
                            textAlign: "center",
                            padding: "30px",
                            color: "#64748b",
                          }}
                        >
                          មិនមានទិន្នន័យបែងចែកភារកិច្ចឡើយ។
                        </td>
                      </tr>
                    ) : (
                      categorys.map((d, index) => (
                        <tr
                          key={d.id || index}
                        >
                          {/* TITLE */}
                          <td>
                            <div className="box df-l">
                              <div className="img" style={{ background: 'none'}}>
                                <img 
                                  src='/report.png'
                                  alt="share views"
                                />
                              </div>
                              <div className="text">
                                  <h2>{d.title}</h2>
                                  <div className="df-l">
                                    <p className='btn-categorycount'>មានចំនួន{filterCategoryCount(d.id, tasks)}</p>
                                  </div>
                              </div>
                            </div>
                          </td>
                          {/* EDIT */}
                          <td>
                            <div className="td-action df-r">
                              <NavLink to={'/task/user/' + d.user_id + '/category/' + d.id}
                                type="button"
                                className="df-c btn-edit-action btn"
                              >
                                <span>
                                  ពិនិត្យ
                                </span>
                                <Eye size="16" />
                              </NavLink>
                              <button
                                type="button"
                                className="df-c btn-edit-action btn"
                                onClick={() => {
                                  setShareUrl(WEB_URL + '/task/category/' + d.id);
                                  setShowShare(true);
                                }}
                              >
                                <span>
                                  ចែករំលែក
                                </span>
                                <Link1 size="16" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {/* footer  */}
              <div className="tb-foot">
                <div className="box df-c">
                  ©LikaWorkNote
                </div>
              </div>
            </div>
          </section>
          )}
        {/* =========================
          banner support
        ========================= */}
        <div className="sp02">
          <div className="sp2-box">
            <img className='img-c' src={SupportImage} alt="Support Image" />
          </div>
        </div>
        {/* end  */}
      </div>
    </div>
  );
}

export default Dashboard;