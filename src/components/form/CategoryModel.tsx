import { useState } from "react";

import FormLayout from "../form_layout";
import CategoryService from "../../services/categoryService";
import WebLoader from "../WebLoader";

import type { Category } from "../../types/category";

interface FormModalProps {
  onClose: () => void;

  onSuccess: (
    category: Category
  ) => void;

  mode: "create" | "edit";

  category: Category | null;
}

export default function CategoryModel({
  onClose,
  onSuccess,
  mode,
  category,
}: FormModalProps) {

  // =========================
  // FORM STATE
  // =========================

  const [title, setTitle] = useState(
    category?.title ?? ""
  );

  const [des, setDes] = useState(
    category?.des ?? ""
  );

  const [submitting, setSubmitting] =
    useState(false);

  const [textSMS, setTextSMS] = useState<string>('');

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {
      setSubmitting(true);

      let savedCategory: Category;

      // =========================
      // CREATE
      // =========================

      if (mode === "create") {
        setTextSMS('យើងកំពុងបង្កើតសំណើររបស់អ្នក')
        savedCategory =
          await CategoryService.createCategory({
            title,
            des,
          });

      }

      // =========================
      // EDIT
      // =========================

      else {
        setTextSMS('យើងកំពុងកែប្រែតាមសំណើររបស់អ្នក')
        if (!category) {
          throw new Error(
            "Category is required for edit"
          );
        }

        savedCategory =
          await CategoryService.updateCategory(
            category.id,
            {
              title,
              des,
            }
          );

      }

      // Tell Admin page
      // save was successful

      onSuccess(savedCategory);

      // Close modal

      onClose();

    } catch (error) {
    
      console.error(
        `Failed to ${mode} category:`,
        error
      );

    } finally {

      setSubmitting(false);

    }
  };

  // =========================
  // UI
  // =========================

  return (

    <FormLayout
      title={
        mode === "create"
          ? "បែងចែកការងារ"
          : "កែប្រែបែងចែកការងារ"
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

          <select
            name="status"
            id="form-status-select"
            disabled
          >

            <option value="true">
              សាធារណៈ
            </option>

            <option value="false">
              ឯកជនភាព
            </option>

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

        </div>

      </form>

    </FormLayout>
  );
}