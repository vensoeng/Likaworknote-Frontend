import { useState } from "react";

import {
  FilterSearch,
  Add,
  Refresh,
  TickCircle,
} from "iconsax-reactjs";

import type { TaskFilter } from "../../types/TaskFilter";

import type { TypeTask } from "../../types/TypeTask";
import type { Category } from "../../types/category";
import type { Status } from "../../types/Status";

interface TaskFilterModelProps {
  filter: TaskFilter;

  onClose: () => void;

  onApply: (filter: TaskFilter) => void;

  statuses: Status[];
  categories: Category[];
  types: TypeTask[];
}

function TaskFilterModel({
  filter,
  onClose,
  onApply,
  statuses,
  categories,
  types,
}: TaskFilterModelProps) {

  // =========================================
  // DRAFT FILTER
  // =========================================

  const [draftFilter, setDraftFilter] =
    useState<TaskFilter>(filter);

  // =========================================
  // UPDATE HELPER
  // =========================================

  const updateFilter = <K extends keyof TaskFilter>(
    key: K,
    value: TaskFilter[K]
  ) => {
    setDraftFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  
  // =========================================
  // MULTIPLE SELECT HELPER
  // =========================================

  const toggleId = (
    key:
      | "statusIds"
      | "categoryIds"
      | "typeIds",
    id: number
  ) => {
    setDraftFilter((prev) => {
      const currentIds = prev[key];

      const exists = currentIds.includes(id);

      return {
        ...prev,
        [key]: exists
          ? currentIds.filter((item) => item !== id)
          : [...currentIds, id],
      };
    });
  };

  // =========================================
  // RESET
  // =========================================

  const handleReset = () => {
    setDraftFilter({
      search: "",
      statusIds: [],
      categoryIds: [],
      typeIds: [],

      createdFrom: "",
      createdTo: "",

      updatedFrom: "",
      updatedTo: "",

      scheduleFrom: "",
      scheduleTo: "",

      rateFrom: "",
      rateTo: "",
    });
  };

  // =========================================
  // APPLY
  // =========================================

  const handleApply = () => {
    onApply(draftFilter);
  };

  return (
    <div className="task-filter-overlay">

      <div className="task-filter-modal">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="task-filter-head df-s">

          <div className="df-l">
            <FilterSearch
              size="22"
              variant="Linear"
            />

            <h2>
              ច្រោះទិន្នន័យ
            </h2>
          </div>

          <button
            type="button"
            className="bg-n"
            onClick={onClose}
          >
            <Add
              size="24"
              variant="Linear"
            />
          </button>

        </div>


        {/* =====================================
            BODY
        ===================================== */}

        <div className="task-filter-body">


          {/* =====================================
              SEARCH
          ===================================== */}

          <div className="task-filter-group">

            <label>
              ស្វែងរកភារកិច្ច
            </label>

            <input
              type="text"
              value={draftFilter.search}
              onChange={(e) =>
                updateFilter(
                  "search",
                  e.target.value
                )
              }
              placeholder="ស្វែងរកតាមចំណងជើង ឬការពិពណ៌នា..."
            />

          </div>


          {/* =====================================
              STATUS
          ===================================== */}

          <div className="task-filter-group">

            <div className="task-filter-label df-s">

              <label>
                ស្ថានភាព
              </label>

              {draftFilter.statusIds.length > 0 && (
                <span>
                  បានជ្រើស {draftFilter.statusIds.length}
                </span>
              )}

            </div>


            <div className="task-filter-options">

              {statuses.map((status) => {

                const id = Number(status.id);

                const checked =
                  draftFilter.statusIds.includes(id);

                return (
                  <label
                    key={status.id}
                    className={`task-filter-option ${
                      checked ? "active" : ""
                    }`}
                  >

                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        toggleId(
                          "statusIds",
                          id
                        )
                      }
                    />

                    <span>
                      {status.des}
                    </span>

                  </label>
                );
              })}

            </div>

          </div>


          {/* =====================================
              CATEGORY
          ===================================== */}

          <div className="task-filter-group">

            <div className="task-filter-label df-s">

              <label>
                ការបែងចែកការងារ
              </label>

              {draftFilter.categoryIds.length > 0 && (
                <span>
                  បានជ្រើស {draftFilter.categoryIds.length}
                </span>
              )}

            </div>


            <div className="task-filter-options">

              {categories.map((category) => {

                const id = Number(category.id);

                const checked =
                  draftFilter.categoryIds.includes(id);

                return (
                  <label
                    key={category.id}
                    className={`task-filter-option ${
                      checked ? "active" : ""
                    }`}
                  >

                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        toggleId(
                          "categoryIds",
                          id
                        )
                      }
                    />

                    <span>
                      {category.title}
                    </span>

                  </label>
                );
              })}

            </div>

          </div>


          {/* =====================================
              TYPE
          ===================================== */}

          <div className="task-filter-group">

            <div className="task-filter-label df-s">

              <label>
                ប្រភេទភារកិច្ច
              </label>

              {draftFilter.typeIds.length > 0 && (
                <span>
                  បានជ្រើស {draftFilter.typeIds.length}
                </span>
              )}

            </div>


            <div className="task-filter-options">

              {types.map((type) => {

                const id = Number(type.id);

                const checked =
                  draftFilter.typeIds.includes(id);

                return (
                  <label
                    key={type.id}
                    className={`task-filter-option ${
                      checked ? "active" : ""
                    }`}
                  >

                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        toggleId(
                          "typeIds",
                          id
                        )
                      }
                    />

                    <span>
                      {type.title}
                    </span>

                  </label>
                );
              })}

            </div>

          </div>

          {/* =====================================
            SCHEDULE DATE 
          ===================================== */}

          <div className="task-filter-group">
            <label>ថ្ងៃផុតកំណត់ការងារ</label>

            <div className="task-filter-date-grid">
              <div>
                <small>ចាប់ពី</small>

                <input
                  type="date"
                  value={draftFilter.scheduleFrom}
                  onChange={(e) =>
                    updateFilter("scheduleFrom", e.target.value)
                  }
                />
              </div>

              <div>
                <small>ដល់</small>

                <input
                  type="date"
                  value={draftFilter.scheduleTo}
                  onChange={(e) =>
                    updateFilter("scheduleTo", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          {/* =====================================
              CREATED DATE
          ===================================== */}

          <div className="task-filter-group">

            <label>
              ថ្ងៃបង្កើតភារកិច្ច
            </label>

            <div className="task-filter-date-grid">

              <div>

                <small>
                  ចាប់ពី
                </small>

                <input
                  type="date"
                  value={draftFilter.createdFrom}
                  onChange={(e) =>
                    updateFilter(
                      "createdFrom",
                      e.target.value
                    )
                  }
                />

              </div>


              <div>

                <small>
                  ដល់
                </small>

                <input
                  type="date"
                  value={draftFilter.createdTo}
                  onChange={(e) =>
                    updateFilter(
                      "createdTo",
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

          </div>


          {/* =====================================
              UPDATED DATE
          ===================================== */}

          <div className="task-filter-group">

            <label>
              ថ្ងៃកែប្រែភារកិច្ច
            </label>

            <div className="task-filter-date-grid">

              <div>

                <small>
                  ចាប់ពី
                </small>

                <input
                  type="date"
                  value={draftFilter.updatedFrom}
                  onChange={(e) =>
                    updateFilter(
                      "updatedFrom",
                      e.target.value
                    )
                  }
                />

              </div>


              <div>

                <small>
                  ដល់
                </small>

                <input
                  type="date"
                  value={draftFilter.updatedTo}
                  onChange={(e) =>
                    updateFilter(
                      "updatedTo",
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

          </div>


          {/* =====================================
              RATE
          ===================================== */}

          <div className="task-filter-group">

            <label>
              ភាគរយការងារ
            </label>

            <div className="task-filter-date-grid">

              <div>

                <small>
                  ចាប់ពី %
                </small>

                <input
                  type="number"
                  min="0"
                  max="100"
                  value={draftFilter.rateFrom}
                  onChange={(e) => {

                    const value =
                      e.target.value === ""
                        ? ""
                        : Number(e.target.value);

                    updateFilter(
                      "rateFrom",
                      value
                    );
                  }}
                  placeholder="0"
                />

              </div>


              <div>

                <small>
                  ដល់ %
                </small>

                <input
                  type="number"
                  min="0"
                  max="100"
                  value={draftFilter.rateTo}
                  onChange={(e) => {

                    const value =
                      e.target.value === ""
                        ? ""
                        : Number(e.target.value);

                    updateFilter(
                      "rateTo",
                      value
                    );
                  }}
                  placeholder="100"
                />

              </div>

            </div>

          </div>

        </div>


        {/* =====================================
            FOOTER
        ===================================== */}

        <div className="task-filter-footer df-s">

          <button
            type="button"
            className="btn"
            onClick={handleReset}
          >
            <Refresh size="18" />
            កំណត់ឡើងវិញ
          </button>


          <button
            type="button"
            className="btn"
            onClick={handleApply}
          >
            <TickCircle size="18" />
            អនុវត្ត
          </button>

        </div>

      </div>

    </div>
  );
}

export default TaskFilterModel;