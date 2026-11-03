import { useState, useEffect, useMemo} from "react";
import {
  Flash,
  MainComponent,
  Magicpen,
  Add,
  More,
  Edit,
  ArrowLeft2,
  ArrowRight2
} from "iconsax-reactjs";
import { formatDate } from "../../config/formatData";
import WebLoader from "../../components/WebLoader";
import UIList from "../../components/task_list_UI_650px";
import TypeTaskService from "../../services/typeTaskService";
import type { TypeTask } from "../../types/TypeTask";
import TypeTaskModel from "../../components/form/typeTaskModel";

import "../../assets/css/table.css";
import "../../assets/css/type.css";

function TypeTaskWebpage() {

  const [loading, setLoading] = useState<boolean>(true);

  const [taskTypes, setTypeTask] =
    useState<TypeTask[]>([]);
  // =========================
  // PAGINATION
  // =========================
  const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsPerPage] = useState(10);

  const [isFormOpen, setIsFormOpen] =
    useState(false);

  const [formMode, setFormMode] =
    useState<"create" | "edit">("create");

  const [selectedTypeTask, setSelectedTypeTask] =
    useState<TypeTask| null>(null);

  //fetch for get category task
  const fetchtaskTypes = async () => {
    try {
      setLoading(true);

      const data =
        await TypeTaskService.getTypeTask();

      setTypeTask(
        Array.isArray(data) ? data : []
      );

    } catch (error) {
      console.error(
        "Failed to fetch taskTypes:",
        error
      );

      setTypeTask([]);

    } finally {
      setLoading(false);
    }
  };
  // =========================
  // ALL ACTION FOR PAGINATION
  // =========================
  const totalPages = Math.ceil(
    taskTypes.length / itemsPerPage
  );
  const currentTypeTasks = useMemo(() => {
    const startIndex =
      (currentPage - 1) * itemsPerPage;

    const endIndex =
      startIndex + itemsPerPage;

    return taskTypes.slice(
      startIndex,
      endIndex
    );
  }, [
    taskTypes,
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
  // FOR ACTION CREATE AND EDTE MODEL
  // =========================
  const handleOpenCreate = () => {
    setFormMode("create");
    setSelectedTypeTask(null);
    setIsFormOpen(true);
  };
  const handleOpenEdit = (
    typetask: TypeTask
  ) => {
    setFormMode("edit");
    setSelectedTypeTask(typetask);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedTypeTask(null);
  };


  const handleCategorySuccess = (
    typetask: TypeTask
  ) => {
    if (formMode === "create") {

      // Add new category to table
      setTypeTask((prev) => [
        typetask,
        ...prev,
      ]);

    } else {

      // Update existing category
      setTypeTask((prev) =>
        prev.map((item) =>
          item.id === typetask.id
            ? typetask
            : item
        )
      );
    }
  };
  //delete action 
  const [textMsdelete,setTextMsdelete] = useState<string>('');
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const handleDeleteTypetask = async (id: number) => {
    const confirmed = window.confirm(
      "តើអ្នកពិតជាចង់លុប Task type នេះមែនទេ?"
    );

    if (!confirmed) {
      return;
    }
    
    try {
      setIsDelete(true)
      setTextMsdelete('សូមរងចាំយើងកំពុងព្យាយាមលុបទិន្នន័យដែលអ្នកបានស្មើរ!')
      await TypeTaskService.deleteTypeTask(id);

      setTypeTask((prev) =>
        prev.filter((typeTask) => typeTask.id !== id)
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
    fetchtaskTypes();
  }, []);

  useEffect(() => {
      const maxPage = Math.max(
          1,
          Math.ceil(taskTypes.length / itemsPerPage)
      );

      if (currentPage > maxPage) {
          setCurrentPage(maxPage);
      }
  }, [taskTypes.length, itemsPerPage, currentPage]);

  // =========================
  // FOR RESPONSIVE
  // =========================
  const screenWidth = window.innerWidth;

  return (
    <div className="admin-creators p-r admin-typewp">
      {/* =========================
          MS for DELETE
      ========================= */}
      {isDelete && (
          <WebLoader>
           {textMsdelete}
          </WebLoader>
      )}
      {/* =========================
          FORM MODAL
      ========================= */}
      {isFormOpen && (
        <TypeTaskModel
          onClose={handleCloseForm}
          onSuccess={handleCategorySuccess}
          mode={formMode}
          typeTask={selectedTypeTask}
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

                បន្ថែមប្រភេទ

              </button>

            </div>

          </div>
          {/* =========================
              STAT / ACTION BOX
          ========================= */}
          <div className="adnv-box">

            <div className="adnvul scroll-x">

              <div className="adnvul-row">

                <div className="adnvulrw-bx">

                  <div className="adnvulrwbxh df-l">

                    <MainComponent />

                    <h2>
                      ប្រភេទភារកិច្ច
                    </h2>

                  </div>

                  <div className="adnvulrw-con">

                    <blockquote>

                      <h2>
                        មានចំនួន {taskTypes.length}
                      </h2>

                      <p>
                        សូមធ្វើការបង្កើតប្រភេទភារកិច្ច ព្រោះវាអាចជួយអ្នកឱ្យបែងចែកការងាររបស់អ្នកទៅតាមប្រភេទផ្សេងៗបាន។
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

                      បន្ថែមប្រភេទ

                    </button>

                  </div>

                </div>

              </div>

              <div className="adnvul-row adnav-unactive">

                <div className="adnvulrw-bx">

                  <div className="adnvulrwbxh df-l">

                    <Magicpen />

                    <h2>
                      អត្ថបទមាន
                    </h2>

                  </div>

                  <div className="adnvulrw-con">

                    <blockquote>

                      <h2>
                        មានចំនួន {taskTypes.length}
                      </h2>

                      <p>
                        សរសេរអត្ថបទបង្ហោះរាល់ថ្ងៃ
                        ដើម្បីទទួលបានការចាប់អារម្មណ៍
                        និងការទាក់ទងបង្កើត។
                      </p>

                    </blockquote>

                  </div>

                  <div className="adnvulrw-action df-r">

                    <button
                      type="button"
                      className="btn"
                      onClick={handleOpenCreate}
                    >

                      <Add
                        size="20"
                        variant="Linear"
                      />

                      បន្ថែមថ្មី

                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
        {/* =========================
            TABLE
        ========================= */}
       {loading ? (
        <WebLoader>
            រង់ចាំបន្ដិចយើងកំពុងទាញយកទិន្នន័យ
            ដើម្បីដំណើរការ
        </WebLoader>
        ) : (
            <section
              className={screenWidth <= 650 ? "rui65" : "tb-section db-c"}
              id={screenWidth <= 650 ? "rui65-tb" : "main-tb"}
            >
                <div className="tb-section-body db-c">
                  {screenWidth <= 650 ? (
                      /* MOBILE LAYOUT */
                      <div className="ui65 db-c">
                          {currentTypeTasks.length === 0 ? (
                              <div
                                  style={{
                                      textAlign: "center",
                                      padding: "30px",
                                      color: "#64748b",
                                  }}
                              >
                                  មិនមានទិន្នន័យប្រភេទភារកិច្ច
                              </div>
                          ) : (
                              currentTypeTasks.map((d, index) => (
                                  <UIList
                                    key={d.id || index}
                                    title={String(d.title)}
                                    description={String(d.des)}
                                    icon=""
                                    tableData={
                                        <>
                                            <tr>
                                                <td>ចំណងជើង</td>
                                                <td>{d.title}</td>
                                            </tr>
                                            <tr>
                                                <td>ការពិពណ៌នា</td>
                                                <td>{d.des}</td>
                                            </tr>
                                            <tr>
                                                <td>ពេលបង្កើត</td>
                                                <td>
                                                    {formatDate(String(d.created_at))}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>ពេលកែប្រែ</td>
                                                <td>
                                                    {formatDate(String(d.updated_at))}
                                                </td>
                                            </tr>
                                        </>
                                    }
                                    onDelete={() => handleDeleteTypetask(d.id)}
                                    onEdit={() => handleOpenEdit(d)}
                                  />
                              ))
                          )}
                      </div>
                    ) : (
                        /* DESKTOP LAYOUT */
                        <div className="box">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ចំណងជើង</th>
                                        <th style={{ textAlign: "center" }}>លុបទិន្នន័យ</th>
                                        <th style={{ textAlign: "center" }}>ម៉ឺនុយ</th>
                                        <th>ពេលវេលា</th>
                                        <th>សកម្មភាព</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentTypeTasks.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} style={{ textAlign: "center", padding: "30px", color: "#64748b" }}>
                                                មិនមានទិន្នន័យប្រភេទភារកិច្ច
                                            </td>
                                        </tr>
                                    ) : (
                                        currentTypeTasks.map((d, index) => (
                                            <tr key={d.id || index}>
                                                <td>
                                                    <div className="box df-l">
                                                        <div className="text">
                                                            <h2>{d.title}</h2>
                                                            <blockquote>
                                                                <p>{d.des}</p>
                                                            </blockquote>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{ textAlign: "center" }}>
                                                    <button
                                                        type="button"
                                                        className="btn btn-ra btn-delete"
                                                        onClick={() => handleDeleteTypetask(d.id)}
                                                    >
                                                        លុបទិន្នន័យ
                                                    </button>
                                                </td>
                                                <td style={{ textAlign: "center" }}>
                                                    <button
                                                        type="button"
                                                        className="btn btn-ra icon-ra-sm btn-status"
                                                        onClick={() => handleOpenEdit(d)}
                                                    >
                                                        <More />
                                                    </button>
                                                </td>
                                                <td>
                                                    {new Date(d.created_at).toLocaleDateString("kh-KH", {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="df-c btn-edit-action"
                                                        onClick={() => handleOpenEdit(d)}
                                                    >
                                                        <span>កែប្រែ</span>
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

                    {/* SHARED PAGINATION */}
                    <div className="tb-foot">
                        <div className="box df-c">

                            <button
                                type="button"
                                className="icon icon-ra icon-ra-sm over-h right-05"
                                onClick={handlePreviousPage}
                                disabled={currentPage <= 1}
                            >
                                <ArrowLeft2 />
                            </button>

                            <ul className="df-c">
                                {getPageNumbers().map((page, index) => {
                                    if (page === "...") {
                                        return (
                                            <li key={`dots-${index}`} className="more">
                                                ...
                                            </li>
                                        );
                                    }

                                    return (
                                        <li
                                            key={page}
                                            className={`btn icon-ra-sm ${
                                                currentPage === page ? "active" : ""
                                            }`}
                                            onClick={() => handlePageChange(Number(page))}
                                        >
                                            <span>{String(page).padStart(2, "0")}</span>
                                        </li>
                                    );
                                })}
                            </ul>

                            <button
                                type="button"
                                className="icon icon-ra icon-ra-sm over-h left-05"
                                onClick={handleNextPage}
                                disabled={totalPages === 0 || currentPage >= totalPages}
                            >
                                <ArrowRight2 />
                            </button>

                        </div>
                    </div>

                </div>
            </section>
        )}

      </div>

    </div>
  );
}

export default TypeTaskWebpage;