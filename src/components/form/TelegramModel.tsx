import { useState } from "react";

import FormLayout from "../form_layout";
import TelegramService from "../../services/telgramService";
import WebLoader from "../WebLoader";

import type { Telegram } from "../../types/Telegram";

interface FormModalProps {
  onClose: () => void;

  onSuccess: (
    telegram: Telegram
  ) => void;

  mode: "create" | "edit";

  telegram: Telegram | null;
}

export default function TelegramModel({
  onClose,
  onSuccess,
  mode,
  telegram,
}: FormModalProps) {

  // =========================
  // FORM STATE
  // =========================

  const [title, setTitle] = useState(
    telegram?.title ?? ""
  );

  const [des, setDes] = useState(
    telegram?.des ?? ""
  );

  const [telegram_id, setTelegramId] = useState(
    telegram?.telegram_id ?? ""
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

      let savedtelegram: Telegram;

      // =========================
      // CREATE
      // =========================

      if (mode === "create") {
        setTextSMS('យើងកំពុងបង្កើតសំណើររបស់អ្នក')
        savedtelegram =
          await TelegramService.createTelegram({
            title,
            des,
            telegram_id
          });

      }

      // =========================
      // EDIT
      // =========================

      else {
        setTextSMS('យើងកំពុងកែប្រែតាមសំណើររបស់អ្នក')
        if (!telegram) {
          throw new Error(
            "telegram is required for edit"
          );
        }

        savedtelegram =
          await TelegramService.updateTelegram(
            telegram.id,
            {
              title,
              des,
              telegram_id
            }
          );

      }

      // Tell Admin page
      // save was successful

      onSuccess(savedtelegram);

      // Close modal

      onClose();

    } catch (error) {
    
      console.error(
        `Failed to ${mode} telegram:`,
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
          ? "បង្កើតគណនីតេលេក្រាម"
          : "កែប្រែគណនីតេលេក្រាម"
      }
      onClose={onClose}
      formId="telegram-form"
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
        id="telegram-form"
        onSubmit={handleSubmit}
      >

        <div className="wbfmcn-bx">

          {/* TITLE */}
          <div className="txt-in">
            <div className="txtin-bx">
              <label htmlFor="txt-title">
                បញ្ចូលឈ្មោះគណនី
              </label>
              <div className="txtin-bx">
                <input
                  type="text"
                  className="txt-title"
                  id="txt-title"
                  placeholder="សូមបញ្ចូលបញ្ចូលឈ្មោះគណនី"
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
          {/* TELEGRAM ID */}
          <div className="txt-in">
            <div className="txtin-bx">
              <label htmlFor="txt-title">
                លេខ ID តេលេក្រាម
              </label>
              <div className="txtin-bx">
                <input
                  type="text"
                  className="txt-title"
                  id="txt-title"
                  placeholder="សូមបញ្ចូលលេខ ID តេលេក្រាម"
                  required
                  value={telegram_id}
                  onChange={(e) =>
                    setTelegramId(e.target.value)
                  }
                />
              </div>
            </div>
          </div>

        </div>

      </form>

    </FormLayout>
  );
}