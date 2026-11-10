import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import type { UserProfile } from "../../types/updateMe";

import UserModel from "../../components/form/user";


import { UserEdit, Magicpen, Send2, Add, LoginCurve } from "iconsax-reactjs";
import '../../assets/css/setting.css';
import '../../assets/css/from.css';

function Setting() {
  const {user, getProfileImage, updateUser, logout } = useAuth();
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
        </div>
      </div>
    </div>
  );
}

export default Setting;


