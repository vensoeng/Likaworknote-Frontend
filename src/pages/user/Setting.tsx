import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import type { UserProfile } from "../../types/updateMe";

import UserModel from "../../components/form/user";

import TelegramService from "../../services/telgramService";
import type { Telegram } from "../../types/Telegram";
import TelegramModel from "../../components/form/TelegramModel";

import { formatDate } from "../../config/formatData";
import WebLoader from "../../components/WebLoader";
import UIList from "../../components/task_list_UI_650px";

import { UserEdit, More, Edit, Magicpen, Flash, Send2, Add, LoginCurve } from "iconsax-reactjs";
import '../../assets/css/setting.css';
import '../../assets/css/from.css';

function Setting() {
  const { user, getProfileImage, updateUser, logout } = useAuth();

  const [loading, setLoading] = useState<boolean>(true);
  const [telegrams, setTelegram] = useState<Telegram[]>([]);
  //fetch for get category task
  const fetchTelegram = async () => {
     try {
      setLoading(true);

      const data =
        await TelegramService.getTelegram();

      setTelegram(
        Array.isArray(data) ? data : []
      );

    } catch (error) {
      console.error(
        "Failed to fetch Telegram:",
        error
      );

      setTelegram([]);

    } finally {
      setLoading(false);
    }
  };
  //this is for fetch user 
  const [updateMeData, setUpdateMeData] = useState<UserProfile | null>(null);
  const fetchUser = () => {
    const userData: UserProfile  = {
      username: user?.username ?? "",
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
    };

    setUpdateMeData(userData);
  };


  useEffect(() => {
    fetchTelegram();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormUserModel, setIsFormUserModel] = useState(false);

  const [formMode, setFormMode] =
    useState<"create" | "edit">("create");
  
  const [selectedTelegram, setSelectedTelegram] = useState<Telegram| null>(null);

  const handleOpenCreate = () => {
    setFormMode("create");
    setSelectedTelegram(null);
    setIsFormOpen(true);
  };
  
  const handleOpenEdit = (
    Telegram: Telegram
  ) => {
    setFormMode("edit");
    setSelectedTelegram(Telegram);
    setIsFormOpen(true);
  };
  
  
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedTelegram(null);
  };

  const handleCategorySuccess = (
      telegram: Telegram
    ) => {
      if (formMode === "create") {
        setTelegram((prev) => [
          telegram,
          ...prev,
        ]);
  
      } else {
        setTelegram((prev) =>
          prev.map((item) =>
            item.id === telegram.id
              ? telegram
              : item
          )
        );
      }
  };

   //delete action 
  const [textMsdelete,setTextMsdelete] = useState<string>('');
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const handleDeleteTelegram = async (id: number) => {
    const confirmed = window.confirm(
      "🔴 តើអ្នកពិតជាចង់លុប គណនី នេះមែនទេ? ភារកិច្ចណាដែលអ្នកបានជ្រើសរើសភ្ជាប់ជាមួយគណនីនេះ នឹងមិនអាចដំណើរការបានទេ!"
    );

    if (!confirmed) {
      return;
    }
    
    try {
      setIsDelete(true)
      setTextMsdelete('សូមរងចាំយើងកំពុងព្យាយាមលុបទិន្នន័យដែលអ្នកបានស្មើរ!')
      await TelegramService.deleteTelegram(id);

      setTelegram((prev) =>
        prev.filter((telegram) => telegram.id !== id)
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
  // user update me form 
  const handleUpdateMeSuccess = (updatedUser: UserProfile) => {
    setUpdateMeData((prev) => ({
      ...prev,
      ...updatedUser,
    }));
    updateUser(updatedUser);
    setIsFormUserModel(false);
  };

  const handleOpenUpdateMeForm = () => {
    fetchUser();
    setIsFormUserModel(true);
  };

  const handleCloseUpdateMeForm = () => {
    setIsFormUserModel(false);
  };

  const handleLogout = () =>{
    const confirmed = window.confirm(
      "តើអ្នកពិតជាចង់ចាកចេញពីគណនីមែនទេ?"
    );

    if (!confirmed) {
      return;
    }

    logout();
  }

  // =========================
  // FOR RESPONSIVE
  // =========================
  const screenWidth = window.innerWidth;

  return (
    <div className="admin-content admin-settingwp">
      {/* =========================
          MS for DELETE
      ========================= */}
      {isDelete && (
          <WebLoader>
           {textMsdelete}
          </WebLoader>
      )}
      {/* =========================
          USER MODEL
      ========================= */}
      {isFormUserModel && (
        <UserModel
          onClose={handleCloseUpdateMeForm}
          onSuccess={handleUpdateMeSuccess}
          updateMe={updateMeData}
        />
      )}
      {/* =========================
          FOR OPEN FORM
      ========================= */}
      {isFormOpen && (
        <TelegramModel
          onClose={handleCloseForm}
          onSuccess={handleCategorySuccess}
          mode={formMode}
          telegram={selectedTelegram}
        />
      )}
      {/* this is setting wabpage */}
      <div className="wpsn">
        <div className="wpsn-bx">
          {/* this is user information  */}
          <div className="user">
            <div className="user-h">
              <div className="uh-bx">
                  <h2>គណនីរបស់អ្នក</h2>
              </div>
            </div>
            <div className="upr df-s">
              {/* this is profile user  */}
              <div className="upr-bx df-l">
                <div className="pr icon-ra icon-sm">
                  <img className="img-c" src={getProfileImage(user?.pr_img)} alt="user profile" />
                </div>
                <div className="txt">
                  <h2>{user?.firstName}{user?.lastName}</h2>
                  <a href="#"><p>@{user?.username}</p></a>
                </div>
              </div>
              {/* this is edit */}
              <div 
                className="btn"
                onClick={handleOpenUpdateMeForm}
              >
                <span>កែប្រែគណនី</span>
                <UserEdit/>
              </div>
            </div>
            {/* this is button logout  */}
            <div className="ulogout">
              <button 
                className="btn"
                onClick={handleLogout}
              >
                <p>ចាកចេញពីគណនី</p>
                <div className="icon icon-sm">
                  <LoginCurve/>
                </div>
              </button>
            </div>
          </div>
          {/* =========================
          THIS IS NAV
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
                  បង្កើតគណនី
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
                      <Send2 />
                      <h2>
                        គណនី Telegram
                      </h2>
                    </div>
                    <div className="adnvulrw-con">
                      <blockquote>
                        <h2>
                          មានចំនួន {telegrams.length}
                        </h2>
                        <p>
                          សូមធ្វើការបង្កើត គណនី Telegram ដើម្បីអាចឱ្យ Bot របស់យើងអាចផ្ញើរសារទៅកាន់អ្នកបាន។
                        </p>
                      </blockquote>
                    </div>
                    <div className="adnvulrw-action df-r" style={{gap: '0.8rem'}}>
                      <a
                        href="https://t.me/likaworknote_bot"
                        className="btn"
                      >
                        <Send2 />
                        ទៅកាន់Bot
                      </a>
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
                          មានចំនួន
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
          
          {/* this is user set telegram account  */}
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
                <div className="ui65 db-c" style={{marginTop: '1rem'}}>
                    {telegrams.length === 0 ? (
                        <div
                            style={{
                                textAlign: "center",
                                padding: "30px",
                                color: "#64748b",
                            }}
                        >
                          មិនមានទិន្នន័យគណនី Telegramឡើយ។
                        </div>
                    ) : (
                        telegrams.map((d, index) => (
                            <UIList
                              key={d.id || index}
                              title={String(d.title)}
                              description={String(d.telegram_id)}
                              icon=""
                              tableData={
                                  <>
                                      <tr>
                                          <td>ឈ្មោះគណនី</td>
                                          <td>{d.title}</td>
                                      </tr>
                                      <tr>
                                          <td>ការពិពណ៌នា</td>
                                          <td>{d.des}</td>
                                      </tr>
                                      <tr>
                                          <td>IDគណនី</td>
                                          <td>{d.telegram_id}</td>
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
                              onDelete={() => handleDeleteTelegram(d.id)}
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
                      <th>ឈ្មោះគណនី</th>
                      <th>លេខសម្គាល់</th>
                      <th style={{ textAlign: "center", }}>លុបទិន្នន័យ</th>
                      <th style={{ textAlign: "center", }}>ម៉ឺនុយ</th>
                      <th>ពេលវេលា</th>
                      <th>សកម្មភាព</th>
                    </tr>
                  </thead>
                  <tbody>
                    {telegrams.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          style={{
                            textAlign: "center",
                            padding: "30px",
                            color: "#64748b",
                          }}
                        >
                          មិនមានទិន្នន័យគណនី Telegramឡើយ។
                        </td>
                      </tr>

                    ) : (

                      telegrams.map((d, index) => (
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
                          {/* telegram Id  */}
                          <td className="data-telegram-id">
                            <div className="btn">
                              <p>{d.telegram_id}</p>
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
                              onClick={() => handleDeleteTelegram(d.id)}
                            >
                              <div className="btn btn-ra btn-delete"
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
              {/* footer  */}
              <div className="tb-foot">
                <div className="box df-c">
                  ©LikaWorkNote
                </div>
              </div>
            </div>
          </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default Setting;


