import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import type { UserProfile } from "../../types/updateMe";

import UserModel from "../../components/form/user";

import { formatDate } from "../../config/formatData";
import WebLoader from "../../components/WebLoader";
import UIList from "../../components/task_list_UI_650px";

import { UserEdit, More, Edit, Magicpen, Send2, Add, LoginCurve } from "iconsax-reactjs";
import '../../assets/css/setting.css';
import '../../assets/css/from.css';

function Setting() {
  const {loading, user, getProfileImage, updateUser, logout } = useAuth();
  //this is for fetch user 
  const [updateMeData, setUpdateMeData] = useState<UserProfile | null>(null);
  const fetchUser = () => {
    const userData: UserProfile  = {
      username: user?.username ?? "",
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      telegram_id: user?.telegram_id ?? null,
    };

    setUpdateMeData(userData);
  };

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user]);

  const [isFormUserModel, setIsFormUserModel] = useState(false);

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
          USER MODEL
      ========================= */}
      {isFormUserModel && (
        <UserModel
          onClose={handleCloseUpdateMeForm}
          onSuccess={handleUpdateMeSuccess}
          updateMe={updateMeData}
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
                          ការណែនាំ
                        </h2>
                        <p>
                          សូមធ្វើការចូលទៅកាន់Bot ហើយវាយសារ /start ដើម្បីឱ្យBotរបស់យើងអាចទាក់ទងទៅកាន់អ្នកបាន។
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
                    <UIList
                      title={user?.username}
                      description={user?.telegram_id === null ? 'មិនបានបញ្ចូល' : String(user?.telegram_id)}
                      icon=""
                      tableData={
                          <>
                          <tr>
                              <td>ឈ្មោះគណនី</td>
                              <td>@{user?.username}</td>
                          </tr>
                          <tr>
                            <td>IDគណនី</td>
                            <td>{user?.telegram_id === null ? 'មិនបានបញ្ចូល' : String(user?.telegram_id)}</td>
                          </tr>
                          </>
                      }
                      onEdit={() => handleOpenUpdateMeForm()}
                    />
                </div>
              ) : (
              <div className="box">
                <table>
                  <thead>
                    <tr>
                      <th>ឈ្មោះគណនី</th>
                      <th>លេខសម្គាល់</th>
                      <th style={{ textAlign: "center", }}>ម៉ឺនុយ</th>
                      <th>ពេលវេលា</th>
                      <th>សកម្មភាព</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {/* TITLE */}
                      <td>
                        <div className="box df-l">
                          <div className="text">
                            <h2>
                              {user?.firstName + '' + user?.lastName}
                            </h2>
                            <blockquote>
                              <p>
                                @{user?.username}
                              </p>
                            </blockquote>
                          </div>
                        </div>
                      </td>
                      {/* telegram Id  */}
                      <td className="data-telegram-id">
                        <div className="btn">
                          <p>{user?.telegram_id === null ? 'មិនបានបញ្ចូល' : String(user?.telegram_id)}</p>
                        </div>
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
                            handleOpenUpdateMeForm()
                          }
                        >
                          <span>
                            <More />
                          </span>
                        </button>
                      </td>
                      {/* DATE */}
                      <td>
                        {formatDate(String(user?.created_at))}
                      </td>
                      {/* EDIT */}
                      <td>
                        <button
                          type="button"
                          className="df-c btn-edit-action"
                          onClick={() =>
                            handleOpenUpdateMeForm()
                          }
                        >
                          <span>
                            កែប្រែ
                          </span>
                          <Edit size="16" />
                        </button>
                      </td>
                    </tr>
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


