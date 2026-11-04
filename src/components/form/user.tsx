import { useState } from "react";

import FormLayout from "../form_layout";
import updateMeService from "../../services/updateMeService";
import WebLoader from "../WebLoader";

import type { UpdateMe, UserProfile } from "../../types/updateMe";

interface FormModalProps {
  onClose: () => void;

  onSuccess: (
    updateMe: UserProfile
  ) => void;

  updateMe: UserProfile | null;
}

export default function UserModel({
  onClose,
  onSuccess,
  updateMe,
}: FormModalProps) {

  // =========================
  // FORM STATE
  // =========================

  const [firstName, setFristName] = useState(
    updateMe?.firstName ?? ""
  );

  const [lastName, setLastName] = useState(
    updateMe?.lastName ?? ""
  );

  const [username, setUserName] = useState(
    updateMe?.username ?? ""
  );

  const [password, setPassword] = useState('');

  const [telegram_id, setTelegramId] = useState(
    updateMe?.telegram_id ?? ''
  );

  const email = updateMe?.email ?? "";

  const [submitting, setSubmitting] =
    useState(false);

  const [textSMS, setTextSMS] = useState<string>('');
  
  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!updateMe) return;

    try {
      setSubmitting(true);
      setTextSMS("យើងកំពុងកែប្រែតាមសំណើរបស់អ្នក");

      const payload: UpdateMe = {
        username,
        firstName,
        lastName,
        ...(password.trim() !== "" && { password }),
        telegram_id: telegram_id.trim() || null,
      };

      const savedUpdateMe =
        await updateMeService.updateMe(payload);

      onSuccess(savedUpdateMe);
      onClose();
      
    } catch (error) {
      console.error("Failed to updateMe:", error);
      alert("ការកែប្រែគណនីមិនបានជោគជ័យទេ!");

    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // UI
  // =========================

  return (

    <FormLayout
      title='កែប្រែគណនីរបស់អ្នក'
      onClose={onClose}
      formId="updateMe-form"
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
        id="updateMe-form"
        onSubmit={handleSubmit}
      >

        <div className="wbfmcn-bx">

          {/* TITLE */}
          <div className="txt-in">
            <div className="txtin-bx">
              <label htmlFor="txt-firstName">
                គោតនាម
              </label>
              <div className="txtin-bx">
                <input
                  type="text"
                  className="txt-title"
                  id="txt-firstName"
                  placeholder="សូមបញ្ចូលបញ្ចូលគោតនាម"
                  required
                  value={firstName}
                  onChange={(e) =>
                    setFristName(e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* TITLE */}
          <div className="txt-in">
            <div className="txtin-bx">
              <label htmlFor="txt-lastName">
                នាមខ្លួន
              </label>
              <div className="txtin-bx">
                <input
                  type="text"
                  className="txt-title"
                  id="txt-lastName"
                  placeholder="សូមបញ្ចូលនាមខ្លួន"
                  required
                  value={lastName}
                  onChange={(e) =>
                    setLastName(e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* TITLE */}
          <div className="txt-in">
            <div className="txtin-bx">
              <label htmlFor="txt-username">
                ឈ្មោះសម្គាល់គណនី
              </label>
              <div className="txtin-bx">
                <input
                  type="text"
                  className="txt-title"
                  id="txt-username"
                  placeholder="សូមបញ្ចូលឈ្មោះសម្គាល់គណនី"
                  required
                  value={username}
                  onChange={(e) =>
                    setUserName(e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          
          {/* TITLE */}
          <div className="txt-in">
            <div className="txtin-bx">
              <label htmlFor="txt-telegram">
                គណនី Telegram
              </label>
              <div className="txtin-bx">
                <input
                  type="text"
                  className="txt-title"
                  id="txt-telegram"
                  placeholder="បញ្ចូលគណនី Telegram ID"
                  value={telegram_id}
                  onChange={(e) =>
                    setTelegramId(e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* TITLE */}
          <div className="txt-in">
            <div className="txtin-bx">
              <label htmlFor="txt-email">
                ឈ្មោះសម្គាល់គណនី
              </label>
              <div className="txtin-bx">
                <input
                  type="email"
                  disabled
                  className="txt-title"
                  id="txt-email"
                  placeholder="សូមបញ្ចូលឈ្មោះសម្គាល់គណនី"
                  required
                  value={email}
                />
              </div>
            </div>
          </div>

          {/* TITLE */}
          <div className="txt-in">
            <div className="txtin-bx">
              <label htmlFor="txt-email">
                ពាក្យសម្ងាត់
              </label>
              <div className="txtin-bx">
                <input
                  type="password"
                  className="txt-title"
                  id="txt-email"
                  placeholder="បញ្ចូលពាក្យសម្ងាត់ថ្មី (ប្រសិនបើចង់ប្ដូរ)"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          
          {/* END */}
        </div>

      </form>

    </FormLayout>
  );
}