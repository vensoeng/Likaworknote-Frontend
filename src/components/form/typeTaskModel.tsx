import { useState } from "react";

import FormLayout from "../form_layout";
import TypeTaskService from "../../services/typeTaskService";
import WebLoader from "../WebLoader";

import type { TypeTask } from "../../types/TypeTask";

interface FormModalProps {
  onClose: () => void;

  onSuccess: (
    TypeTask: TypeTask
  ) => void;

  mode: "create" | "edit";

  typeTask: TypeTask | null;
}

export default function CategoryModel({
  onClose,
  onSuccess,
  mode,
  typeTask,
}: FormModalProps) {

  // =========================
  // FORM STATE
  // =========================

  const [title, setTitle] = useState(
    typeTask?.title ?? ""
  );

  const [des, setDes] = useState(
    typeTask?.des ?? ""
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

      let savedTypeTask: TypeTask;

      // =========================
      // CREATE
      // =========================

      if (mode === "create") {
        setTextSMS('យើងកំពុងបង្កើតសំណើររបស់អ្នក')
        savedTypeTask =
          await TypeTaskService.createTypeTask({
            title,
            des,
          });

      }

      // =========================
      // EDIT
      // =========================

      else {
        setTextSMS('យើងកំពុងកែប្រែតាមសំណើររបស់អ្នក')
        if (!typeTask) {
          throw new Error(
            "typeTask is required for edit"
          );
        }

        savedTypeTask =
          await TypeTaskService.updateTypeTask(
            typeTask.id,
            {
              title,
              des,
            }
          );

      }

      // Tell Admin page
      // save was successful

      onSuccess(savedTypeTask);

      // Close modal

      onClose();

    } catch (error: any) {
    
      console.error("========== CREATE TASK ERROR ==========");
      console.error(
          "STATUS:",
          error.response?.status
      );
      console.error(
          "RESPONSE DATA:",
          JSON.stringify(
              error.response?.data,
              null,
              2
          )
      );
      console.error(
          "ERRORS:",
          JSON.stringify(
              error.response?.data?.errors,
              null,
              2
          )
      );
      console.error(
          "REQUEST DATA:",
          error.config?.data
      );
      console.error(
          "REQUEST HEADERS:",
          error.config?.headers
      );
      console.error("======================================");
      alert(
          error.response?.data?.message ||
          "មានបញ្ហាក្នុងការបញ្ជូនទិន្នន័យ"
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
          ? "បង្កើតប្រភេទការងារ"
          : "កែប្រែប្រភេទការងារ"
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