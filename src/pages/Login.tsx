import { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import logo from '/favicon_uw.png';
import {ArrowRight, Eye, EyeSlash} from 'iconsax-reactjs';

import '../assets/css/login.css';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordCheck, setPasswordCheck] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        try {
        setLoading(true);

        const loggedInUser = await login({
          email: form.email,
          password: form.password,
        });


        setSuccess("Login successful.");

       setTimeout(() => {
        if (loggedInUser.role === 1) {
          navigate("/admin/dashboard");
        } else if (loggedInUser.role === 2) {
          navigate("/user/dashboard");
        } else {
          navigate("/login");
        }
      }, 1000);

        } catch (error: any) {
        console.error("Login ERROR:", error);

        const message =
            error?.response?.data?.message ||
            "Login failed.";

        setError(message);

        } finally {
        setLoading(false);
        }
  }

  const passwordChecker = () =>{
    passwordCheck == false ? setPasswordCheck(true) : setPasswordCheck(false);
  }
  return (
      <div className="main-login">
        <form className="main df-s" onSubmit={handleSubmit}>
          {/* this Is row text to user  */}
          <div className="row row-blog-text">
            <div className="box">
              <h2>*</h2>
              <h1><strong>Lika<span>worknote</span></strong><br />គ្រប់គ្រងភារកិច្ចអ្នក យ៉ាងមានប្រសិទ្ធភាព!</h1>
              <blockquote>
                <p>រីករាយក្នុងការជួបអ្នកម្តងទៀត! សូមបញ្ចូលអ៊ីមែល និងពាក្យសម្ងាត់របស់អ្នកដើម្បីចូលប្រើប្រាសគណនី។</p>
              </blockquote>
            </div>
          </div>
          {/* this is form  */}
          <div className="row row-form">
            <div className="box">
              <div className="main-pr">
                <div className="pr">
                  <div className="img over-h icon">
                    <img 
                      className="img-co" 
                      alt="About"
                      width="200"
                      src={logo}
                     />
                  </div>
                </div>
                <div className="pr-sub">
                  <blockquote>
                    <h2>ចូលគណនី</h2>
                    <p>សូមបំពេញព័ត៌មានការចូលប្រើប្រាសរបស់អ្នកដើម្បីបន្តរ</p>
                  </blockquote>
                </div>
              </div>
              <div className="maim-form">
                <div className="fbox">
                  <div className="txt-main">
                    <div className="lb">
                      <label>គណនីអ៊ីមែល</label>
                    </div>
                    <div className="txt-box df-s">
                      <div className="txt-ni">
                        <input 
                          id="email"
                          placeholder="Example@gmail.com"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                         />
                      </div>
                    </div>
                  </div>
                  <div className="txt-main">
                    <div className="lb">
                      <label>ពាក្យសម្ងាត់</label>
                    </div>
                    <div className="txt-box df-s">
                      <div className="txt">
                        <input 
                          id="password"
                          placeholder="Enter your password"
                          type={passwordCheck == false ? 'password' : 'text'}
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                         />
                      </div>
                      <div className="txt-i curs-p" aria-label="Show password" role="button"
                        onClick={passwordChecker}
                      >
                        {passwordCheck == false ? <EyeSlash /> : <Eye/>}
                      </div>
                    </div>
                  </div>
                  <div className="txt-action">
                    <a href="https://t.me/vensoeng">ភ្លេចពាក្យសម្ងាត់?</a>
                  </div>
                </div>
              </div>
              <div className="form-foot">
                <div className="ff-box">
                  <div className="ff-action">
                    <button type="submit" disabled={loading}>
                      {loading ? "ចូលគណនី..." : "ចូលគណនី"}
                    </button>
                  </div>
                  {error && (
                    <p className="error-active">
                      {error}
                    </p>
                  )}
                  {success && (
                    <p className="success-active">
                      {success}
                    </p>
                  )}
                  <div className="ff-info">
                    <blockquote>
                      មិនទាន់មានគណនី?<a href="https://t.me/vensoeng" className="df-s">
                        បង្កើតគណនី <ArrowRight />
                      </a>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
  );
}

export default Login;