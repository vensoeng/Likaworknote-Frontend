import { useState, useEffect, useMemo } from "react";
import {
  Flash,
  BrifecaseTimer,
  Magicpen,
  Add,
  More,
  Edit,
  ArrowLeft2,
  ArrowRight2,
} from "iconsax-reactjs";
import { formatDate } from "../../config/formatData";
import WebLoader from "../../components/WebLoader";
import UIList from "../../components/task_list_UI_650px";
import CategoryService from "../../services/categoryService";
import type { Category } from "../../types/category";
import CategoryModel from "../../components/form/CategoryModel";

import "../../assets/css/table.css";
import "../../assets/css/type.css";

function CategoryWebpage() {

  const [loading, setLoading] = useState<boolean>(true);

  const [categories, setCategories] =
    useState<Category[]>([]);


  const [isFormOpen, setIsFormOpen] =
    useState(false);

  const [formMode, setFormMode] =
    useState<"create" | "edit">("create");

  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);

  //fetch for get category task
  const fetchCategories = async () => {
    try {
      setLoading(true);

      const data =
        await CategoryService.getCategories();

      setCategories(
        Array.isArray(data) ? data : []
      );

    } catch (error) {
      console.error(
        "Failed to fetch categories:",
        error
      );

      setCategories([]);

    } finally {
      setLoading(false);
    }
  };


  const handleOpenCreate = () => {
    setFormMode("create");
    setSelectedCategory(null);
    setIsFormOpen(true);
  };


  const handleOpenEdit = (
    category: Category
  ) => {
    setFormMode("edit");
    setSelectedCategory(category);
    setIsFormOpen(true);
  };


  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedCategory(null);
  };


  const handleCategorySuccess = (
    category: Category
  ) => {
    if (formMode === "create") {

      // Add new category to table
      setCategories((prev) => [
        category,
        ...prev,
      ]);

    } else {

      // Update existing category
      setCategories((prev) =>
        prev.map((item) =>
          item.id === category.id
            ? category
            : item
        )
      );
    }
  };
  //delete action 
  const [textMsdelete,setTextMsdelete] = useState<string>('');
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const handleDeleteCategory = async (id: number) => {
    const confirmed = window.confirm(
      "តើអ្នកពិតជាចង់លុប Task category នេះមែនទេ?"
    );

    if (!confirmed) {
      return;
    }
    
    try {
      setIsDelete(true)
      setTextMsdelete('សូមរងចាំយើងកំពុងព្យាយាមលុបទិន្នន័យដែលអ្នកបានស្មើរ!')
      await CategoryService.deleteCategory(id);

      setCategories((prev) =>
        prev.filter((category) => category.id !== id)
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
    fetchCategories();
  }, []);

  
  // =========================
  // PAGINATION
  // =========================
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const totalPages = Math.ceil(
      categories.length / itemsPerPage
  );

  const currentCategories = useMemo(() => {
      const startIndex = (currentPage - 1) * itemsPerPage;

      return categories.slice(
          startIndex,
          startIndex + itemsPerPage
      );
  }, [categories, currentPage, itemsPerPage]);

  const handlePreviousPage = () => {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
      setCurrentPage((prev) =>
          Math.min(prev + 1, totalPages)
      );
  };

  const handlePageChange = (page: number) => {
      setCurrentPage(page);
  };

  const getPageNumbers = (): (number | string)[] => {
      if (totalPages <= 5) {
          return Array.from(
              { length: totalPages },
              (_, index) => index + 1
          );
      }

      if (currentPage <= 3) {
          return [1, 2, 3, 4, "...", totalPages];
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

  // Keep the current page valid after deleting records.
  useEffect(() => {
      const maxPage = Math.max(1, totalPages);

      if (currentPage > maxPage) {
          setCurrentPage(maxPage);
      }
  }, [currentPage, totalPages]);

  // =========================
  // FOR RESPONSIVE
  // =========================
  const screenWidth = window.innerWidth;

  return (
    <div className="admin-creators p-r">
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
        <CategoryModel
          onClose={handleCloseForm}
          onSuccess={handleCategorySuccess}
          mode={formMode}
          category={selectedCategory}
        />
      )}

      {/* =========================
          ADMIN CONTENT
      ========================= */}

      <div className="admin-content admin-typewp">
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
                បន្ថែមការងារ
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
                    <BrifecaseTimer />
                    <h2>
                      បែងចែកការងារ
                    </h2>
                  </div>
                  <div className="adnvulrw-con">
                    <blockquote>
                      <h2>
                        មានចំនួន {categories.length}
                      </h2>
                      <p>
                        បែងចែកការងារគឺជាមុខងារមួយដែល ផ្ដល់សិទ្ធឱ្យអ្នកអាចបែងចែកការងារផ្សេងគ្នា នៅក្នុងគណនីតែមួយ។
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
                      បន្ថែមការងារ
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
                        មានចំនួន {categories.length}
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
                    {currentCategories.length === 0 ? (
                        <div
                            style={{
                                textAlign: "center",
                                padding: "30px",
                                color: "#64748b",
                            }}
                        >
                          មិនមានទិន្នន័យបែងចែកការងារឡើយ។
                        </div>
                    ) : (
                        currentCategories.map((d, index) => (
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
                              onDelete={() => handleDeleteCategory(d.id)}
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
                      <th style={{textAlign: "center", }}>លុបទិន្នន័យ</th>
                      <th style={{textAlign: "center",}}>ម៉ឺនុយ</th>
                      <th>ពេលវេលា</th>
                      <th>សកម្មភាព</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          style={{
                            textAlign: "center",
                            padding: "30px",
                            color: "#64748b",
                          }}
                        >
                          មិនមានទិន្នន័យបែងចែកការងារឡើយ។
                        </td>
                      </tr>

                    ) : (

                      currentCategories.map((d, index) => (
                          <tr
                            key={d.id || index}
                          >
                            {/* TITLE */}
                            <td>
                              <div className="box df-l">
                                <div className="text">
                                  <h2>
                                    {d.title}
                                  </h2>
                                  <blockquote>
                                    <p>
                                      {d.des}
                                    </p>
                                  </blockquote>
                                </div>
                              </div>
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
                                  onClick={() => handleDeleteCategory(d.id)}
                                >
                                  <span>
                                    លុបទិន្នន័យ
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
              {/* =========================
                  PAGINATION
              ========================= */}
                  <div className="tb-foot">
                      <div className="box df-c">

                          {/* PREVIOUS */}
                          <button
                              type="button"
                              className="icon icon-ra icon-ra-sm over-h right-05"
                              onClick={handlePreviousPage}
                              disabled={currentPage <= 1}
                              aria-label="Previous page"
                          >
                              <ArrowLeft2 />
                          </button>

                          {/* PAGE NUMBERS */}
                          <ul className="df-c">
                              {getPageNumbers().map((page, index) => {
                                  if (page === "...") {
                                      return (
                                          <li
                                              key={`dots-${index}`}
                                              className="more"
                                          >
                                              ...
                                          </li>
                                      );
                                  }

                                  return (
                                      <li
                                          key={page}
                                          className={`btn icon-ra-sm ${
                                              currentPage === page
                                                  ? "active"
                                                  : ""
                                          }`}
                                          onClick={() =>
                                              handlePageChange(Number(page))
                                          }
                                          style={{ cursor: "pointer" }}
                                      >
                                          <span>
                                              {String(page).padStart(2, "0")}
                                          </span>
                                      </li>
                                  );
                              })}
                          </ul>

                          {/* NEXT */}
                          <button
                              type="button"
                              className="icon icon-ra icon-ra-sm over-h left-05"
                              onClick={handleNextPage}
                              disabled={
                                  totalPages === 0 ||
                                  currentPage >= totalPages
                              }
                              aria-label="Next page"
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

export default CategoryWebpage;